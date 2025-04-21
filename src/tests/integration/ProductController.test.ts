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

describe("POST /products - integration", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(Product).clear();
  });

  it("should create a product with valid data", async () => {
    //arrange
    const productData = {
      name: "new product",
      price: 49.99,
      description: "this is a new product",
    };

    //act
    const response = await request(app).post("/products").send(productData);

    //assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(productData.name);
    expect(response.body.price).toBe(productData.price);
    expect(response.body.description).toBe(productData.description);
  });

  it("should return a 400 if product data is invalid", async () => {
    //arrange
    const productData = {
      name: "",
      price: 0,
      description: "",
    };

    //act
    const response = await request(app).post("/products").send(productData);

    //assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});

// Get product by id
describe("GET /products/:id - integration", () => {
  beforeAll( async() => {
    await AppDataSource.initialize();
  })

  afterAll( async() => {
    await AppDataSource.destroy();
  })

  beforeEach( async() => {
    await AppDataSource.getRepository(Product).clear();
  })

  it("should return a product by id", async () => {
    const repo = AppDataSource.getRepository(Product);
    const product = repo.create({
      name: "Product by id",
      price: 12.50,
      description: "Testing GET product by id"
    })

    await repo.save(product);
    const response = await request(app).get(`/products/${product.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(product.name)
    expect(parseFloat(response.body.price)).toBe(product.price)
    expect(response.body.description).toBe(product.description)
  })

  it("should return 400 if id is not a number", async() => {
    const response = await request(app).get("/products/hello");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "id must be a number")
  })

  it("should return a 404 if product not found - doesn't exist", async() => {
    const response = await request(app).get("/products/892");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "product doesn't exist");
  })
})
