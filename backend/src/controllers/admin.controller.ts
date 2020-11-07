import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';

const adminController: Router = express.Router();

adminController.get('/getPending/',
    (req: Request, res: Response) => {
        Product.findAll({where: {adminApproval: 'pending'}})
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });
adminController.put('/editApprovalStatus/:id', (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(() => {
                    res.status(200).send('Product status updated.');
                });
            } else {
                res.status(404).send('Product not found.');
            }
        })
        .catch(err => res.status(500).send(err));
});

export const AdminController: Router = adminController;
