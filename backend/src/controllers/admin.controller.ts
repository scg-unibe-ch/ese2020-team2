import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';

/**
 *The responsibility of this class is to allow the admin to get all the pending approvals
 and chage the approval status.
 */

const adminController: Router = express.Router();

/**
 *Returns all the requests which are pending for the admin approval.
 */
adminController.get('/getPending/',
    (req: Request, res: Response) => {
        Product.findAll({ where: { adminApproval: 'pending' } })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

/**
 *Allows to edit arroval status by the admin.
 */
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
