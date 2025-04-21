import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

const seedProducts = async () => {
  await AppDataSource.initialize();

  const productRepo = AppDataSource.getRepository(Product);

  const products = [
    {
      name: "Gaming Mouse",
      price: 59.99,
      description: "High precision RGB gaming mouse",
      stock: 30,
    },
    {
      name: "Mechanical Keyboard",
      price: 89.99,
      description: "RGB mechanical keyboard with blue switches",
      stock: 20,
    },
    {
      name: "4K Monitor",
      price: 299.99,
      description: "27-inch 4K UHD monitor",
      stock: 10,
    },
  ];

  for (const productData of products) {
    const product = productRepo.create(productData);
    await productRepo.save(product);
  }

  console.log("✅ Products seeded!");
  process.exit();
};

seedProducts().catch((err) => {
  console.error("❌ Failed to seed products:", err);
  process.exit(1);
});
