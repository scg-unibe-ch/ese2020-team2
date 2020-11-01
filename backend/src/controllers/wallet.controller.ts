import express from 'express';
import { Router, Request, Response } from 'express';
import { Wallet } from '../models/wallet.model';

const walletController: Router = express.Router();

walletController.put('/edit/walletAmount', (req: Request, res: Response) => {
    Wallet.findByPk(req.params.userId)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(() => {
                    res.status(200).send('Wallet updated successfully.');
                });
            } else {
                res.status(404).send('Wallet not found.');
            }
        })
        .catch(err => res.status(500).send(err));
});

walletController.get('/wallet/getAmount',
    (req: Request, res: Response) => {
        Wallet.findByPk(req.params.userId)
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

export const moneyInWalletController: Router = walletController;
