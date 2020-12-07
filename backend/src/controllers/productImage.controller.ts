import express, { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import { Product } from '../models/product.model';
import { ProductImage } from '../models/productImage.model';


/**
 * The responsibility of this class is to add and delete product pictures.
 * It also returns the pictures associated to a particular product.
 */
const imageController = express.Router();

// Defining the storage location for the images and renaming the file with unique name.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, getDateTime() + file.originalname);
    }
});

// Checks for the type of the file uploaded. If non jpeg or png files are uploaded it throws an error.
const fileFilter = (req: any, file: any, cb: (arg0: any, arg1: boolean) => void) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Choose a valid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    // Limits the size of the images to 5MB.
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Returns a string with current date and time without special characters.
function getDateTime() {
    const date = new Date().toISOString();
    return date.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Adds a new image to the uploads folder and creates a record in ProductImage table.
 */
imageController.post(
    '/add/', upload.single('productImage'), async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.protocol + '://' + req.get('host'));
        req.body.filePath = req.protocol + '://' + req.get('host') + (req.file.destination).substring(1) + req.file.filename;
        if (await Product.findOne({ where: { productId: req.body.productId, userId: req.body.userId } })) {
            ProductImage.create(req.body).then(image_added => res.send(image_added)).catch(err => res.status(500).send(err));
        } else {
            res.status(404).send('No such product or user found.');
        }
    });

/**
 * Adds a new image to the uploads folder and creates a record in ProductImage table.Returns all the image URL's for the given product.
 */
imageController.get(
    '/get/:productId', async (req: Request, res: Response) => {
        ProductImage.findAll({ where: { productId: req.params.productId }, attributes: ['filePath'] })
            .then(found => res.send(found))
            .catch(err => res.status(500).send(err));
    });

/**
* Deletes an image from the ProductImage table and the uploads folder.
*/

imageController.delete(
    '/delete/:id', async (req: Request, res: Response) => {
        ProductImage.findByPk(req.params.id)
            .then(found => {
                if (found != null) {
                    found.destroy().then(() => {
                        const fileName = found.filePath.substring(found.filePath.lastIndexOf('/') + 1);
                        try {
                            fs.unlinkSync('./uploads/' + fileName);
                        } catch {
                            res.status(500).send('Image does not exist in the directory');
                        }
                        res.status(200).send('Image deleted');
                    });
                } else {
                    res.status(404).send('Image not found');
                }
            })
            .catch(err => res.status(500).send(err));
    });

export const ImageController: Router = imageController;
