import { PaymentFacadeInterface } from "../facade/facade.interface";
import PaymentFacade from "../facade/payment.facade";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import TransactionRepository from "../repository/transaction.repository";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const repository = new TransactionRepository();
        const processPaymentUseCase = new ProcessPaymentUseCase(repository);
        return new PaymentFacade(processPaymentUseCase);
    }
}