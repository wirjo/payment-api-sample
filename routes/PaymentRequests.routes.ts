import express from 'express';
import PaymentRequestController from '../controllers/PaymentRequests.controller';

export const PaymentRequestsRouter = express.Router();
const paymentRequestController = new PaymentRequestController();

PaymentRequestsRouter.post('/', paymentRequestController.create);
PaymentRequestsRouter.get('/', paymentRequestController.findAll);
PaymentRequestsRouter.get('/:id', paymentRequestController.find);
PaymentRequestsRouter.put('/:id', paymentRequestController.edit);