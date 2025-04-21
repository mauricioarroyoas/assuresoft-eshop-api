import request from "supertest";
import { app } from "../../app";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/Product";

describe("GET /products", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should return a list  of products with status 200", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /products - Integration", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(Product).clear();
  });

  it("should return an empty arrat when no products exits", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return products when they exist", async () => {
    const repo = AppDataSource.getRepository(Product);

    //act
    const sample = repo.create({
      name: "test product",
      price: 99.99,
      description: "this is a test",
    });
    await repo.save(sample);
    const response = await request(app).get("/products");

    //assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("test product");
    expect(response.body[0].price).toBe("99.99");
    expect(response.body[0].description).toBe("this is a test");
  });
});
