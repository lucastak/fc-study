import express, {Request, Response} from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());

    try{
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                zip: req.body.address.zip,
                number: req.body.address.number,
            }
        }

        const output = await usecase.execute(customerDto);
        res.send(output);
    }catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());

    try {
        const customers = await usecase.execute({});
        res.send(customers);
    } catch (err) {
        res.status(500).send(err);
    }
})