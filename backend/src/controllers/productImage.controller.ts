import express, { Request, Response, NextFunction, Router } from 'express';
import {create} from 'domain';
// import multer from 'multer';

const imageController = express.Router();
/*
import {verifyToken, IAuthRequest} from '../middlewares/checkAuth';
import {checkProductAuthorization} from '../middlewares/checkProductAuthorization';
import {photoService} from '../services/photo.service';
import path from 'path';
import {ProductImage} from "../models/productImage.model";


const config = Object.freeze({uploadImagePath: process.env.UPLOAD_PATH || './uploads'});
const uploadImages = multer({ dest: config.uploadImagePath });


public async create(file: any) {
    return ProductImage.create(file);
}

public async getFilename(imageId: string) {
    const image = await ProductImage.findOne({where: { fileId: imageId }});
    return productImage.fileName;
}
/*
productImageController.post('/uploadFile', uploadImage.single('uploadedImage'),
    (req, res, next) => {
        console.log(req.file);

        const product = new Product({
            _Id: new Product.userId(),
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
/*
productImageController.post('/image',
    uploadImage.single('productImage'),
    (req, res, next) => {
        console.log(req.file);
        //const product = new Product()
        Product.create(req.body)
            .then(product_added => res.send(product_added))
            .catch(err => res.status(500).send(err));
    });
*/
export const ImageController: Router = imageController;
