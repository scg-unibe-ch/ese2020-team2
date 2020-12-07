import express, { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';

/*
export class ProductImageService {

    // Defining the storage location for the images and renaming the file with unique name.
    public async productImageService(req: Request, res: Response) {

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

        // Returns a string with current date and time without special characters.
        function getDateTime() {
            const date = new Date().toISOString();
            console.log(date);
            return date.replace(/[^a-zA-Z0-9]/g, '');
        }
    }
}
*/