import { Product } from "../entities/Product";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

export class ProductService {
  private productRepository: Repository<Product>;

  constructor(repo?: Repository<Product>) {
    this.productRepository = repo || AppDataSource.getRepository(Product);
  }

  async create(data: Omit<Product, "id">): Promise<Product> {
    const product = this.productRepository.create(data);
    return await this.productRepository.save(product);  
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }
}