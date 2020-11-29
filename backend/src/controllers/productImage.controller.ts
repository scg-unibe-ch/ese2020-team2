import express, { Request, Response, NextFunction, Router } from 'express';
import {create} from 'domain';
import multer from 'multer';
import { User } from '../models/user.model';

import { verifyToken } from '../middlewares/checkAuth';
import { imageService } from '../services/productImage.service';
import path from 'path';
import { ProductImage } from '../models/productImage.model';
import { Product } from '../models/product.model';



const config = Object.freeze({uploadImagePath: process.env.UPLOAD_PATH || './uploads'});

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

/**
 * Here are filtered the image we want to accept as upload for product images
 * @param req
 * @param file will be set as any and defined directly in the constructor
 * @param cb will throw a boolean and error message if the picture format is wrong
 */
const imageFilter = (req: any, file: any, cb: (arg0: any, arg1: boolean) => void) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Wrong file format, please choose .png or .jpeg files'), false);
    }

}
const uploadImages = multer({
    storage: imageStorage,
    limits: {
    fileSize: 1024 * 1024 * 5 // limit to 5 MB picture
    },
    fileFilter: imageFilter
});

const imageController = express.Router();

imageController.post(
    '/:productId',
  //  verifyToken,
    uploadImages.array('images', 5),
    // uploadImages.array('images[]', 5),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const files = req.files as any[];

            const uploadPromises = files.map( file => {
                const image = {
                    fileId: file.fileId,
                    productId: req.params.productId,
                    userId: req.body.userId,
                    fileName: file.fileName
                };
                return imageService.create(image);
            });
            await Promise.all(uploadPromises);
            res.send({ success: true });
        } catch (err) {
            return next(err);
        }
    }
);

imageController.get(
    '/:fileName',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fileName = req.params.fileName;
            res.sendFile(path.join(process.cwd(), config.uploadImagePath + `/${fileName}`));
        } catch (err) {
            next(err);
        }
    }
);







/*
imageController.post('/addFile', uploadImages.single('uploadedImage'),
    (req, res, next) => {
        console.log(req.file);

        const product = new Product({
            id: Product.userId(),
            name: req.body.name,
            price: req.body.price,}
        )
        if (!file) {
            const error = new Error('Please upload a file')
            err.httpStatusCode = 400
            return next(error)
        }
        res.status(200).send({
            statusCode: 200,
            status: 'success',
            uploadedFile: file
        })

    }, (error, req, res, next) => {
        res.status(400).send({
            error: error.statusMessage // To be checked
        })
    });
 */
/*
imageController.post('/image',
    uploadImages.single('productImage'),
    (req, res, next) => {
        console.log(req.file);
        //const product = new Product()
        Product.create(req.body)
            .then(product_added => res.send(product_added))
            .catch(err => res.status(500).send(err));
    });
*/
export const ImageController: Router = imageController;
