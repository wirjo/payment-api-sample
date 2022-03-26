import express from 'express';
import { PaymentRequestsRouter } from './routes/PaymentRequests.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/payment-requests", PaymentRequestsRouter);

app.listen(port, () => {
  console.log(`App listening on ${port}.`);
});