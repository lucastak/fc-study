import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("shoud create a client", async () => {
    const cliente = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    });

    const repository = new ClientRepository();
    await repository.add(cliente);

    const clientDb = await ClientModel.findOne({ where: { id: "1" } });

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(cliente.id.id);
    expect(clientDb.name).toBe(cliente.name);
    expect(clientDb.email).toBe(cliente.email);
    expect(clientDb.address).toBe(cliente.address);
    expect(clientDb.createdAt).toStrictEqual(cliente.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(cliente.updatedAt);
  })

  it("should find a client", async () => {
      const client = await ClientModel.create({
          id: "1",
          name: "Client 1",
          email: "x@x.com",
          address: "Address 1",
          createdAt: new Date(),
          updatedAt: new Date(),
      });

      const repository = new ClientRepository();
      const result = await repository.find(client.id);

      expect (result.id.id).toEqual(client.id);
      expect (result.name).toEqual(client.name);
      expect (result.email).toEqual(client.email);
      expect (result.address).toEqual(client.address);
      expect (result.createdAt).toEqual(client.createdAt);
      expect (result.updatedAt).toEqual(client.updatedAt);
  });
});
