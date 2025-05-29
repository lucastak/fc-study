import {app, sequelize} from "../express";
import request from "supertest";


describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });
    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    zip: "12345",
                    number: 12
                }
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: expect.any(String),
            name: "John Doe",
            address: {
                street: "123 Main St",
                city: "Anytown",
                zip: "12345",
                number: 12
            }
        });
    });

    it("should not create a customer with invalid data", async () => { 
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
            });
        expect(response.status).toBe(500);
    })

    it("should list all customers", async () => {
        const response = await request(app)
        .post("/customer")
        .send({
            name: "John Doe",
            address: {
                street: "123 Main St",
                city: "Anytown",
                zip: "12345",
                number: 12
            }
        });
        expect(response.status).toBe(200);

        const response2 = await request(app)
        .post("/customer")
        .send({
            name: "John Doe 2",
            address: {
                street: "123 Main St",
                city: "Anytown",
                zip: "12345",
                number: 12
            }
        });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        expect(listResponse.body.customers[0]).toEqual({
            id: expect.any(String),
            name: "John Doe",
            address: {
                street: "123 Main St",
                city: "Anytown",
                zip: "12345",
                number: 12
            }
        });

        expect(listResponse.body.customers[1]).toEqual({
            id: expect.any(String),
            name: "John Doe 2",
            address: {
                street: "123 Main St",
                city: "Anytown",
                zip: "12345",
                number: 12
            }
        });
    })
});