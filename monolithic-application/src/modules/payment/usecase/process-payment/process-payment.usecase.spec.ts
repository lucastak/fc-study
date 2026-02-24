import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved"
});

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
    }
};

const transactionDeclined = new Transaction({
    id: new Id("1"),
    amount: 50,
    orderId: "1",
    status: "declined"
});

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
    }
};

describe("Process payment unit tests", () => {

    it("should approve a transaction", async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 100
        }
    
        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(result.orderId).toBe(transaction.orderId);
        expect(result.amount).toBe(transaction.amount);
        expect(result.status).toBe("approved");
        expect(paymentRepository.save).toHaveBeenCalled();
    });
    
    it("should decline a transaction", async () => {
        const paymentRepository = MockRepositoryDeclined();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 50
        }
    
        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transactionDeclined.id.id);
        expect(result.orderId).toBe(transactionDeclined.orderId);
        expect(result.amount).toBe(transactionDeclined.amount);
        expect(result.status).toBe("declined");
        expect(paymentRepository.save).toHaveBeenCalled();
    });

})