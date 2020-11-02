//Needs to be configured in server.ts, otw it can't communicate with postman: may it be better to insert this
//in product controller?

import {Router} from "express";

const express = require("express");
const productImageController = express.Router();
const multer = require('multer');
const uploadImage = multer({dest: 'uploads/'});

const Product = require("../models/product.model");

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
export const imageController: Router = productImageController;