import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "mydblocal",
  synchronize: false, 
  logging: false,
  entities: [Product],
  migrations:['src/migrations/**/*.ts'],
  subscribers: []
});
