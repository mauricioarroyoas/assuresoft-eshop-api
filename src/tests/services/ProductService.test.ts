import { ProductService } from "../../services/ProductService";
import { Product } from "../../entities/Product";
import { Repository } from "typeorm";

const mockRepository = (): Partial<Repository<Product>> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
});
  
describe("ProductService - Unit", () => {
  let service: ProductService;
  let productRepoMock: ReturnType<typeof mockRepository>;

  beforeEach(() => {
    productRepoMock = mockRepository();
    service = new ProductService(productRepoMock as Repository<Product>); 
  });

  it("should create a product", async () => {
    //arrange
    const input = {
      name: "Unit Test Product",
      price: 99.99,
      description: "Test description",
    };
    const fakeProduct = { id: 1, ...input };
    (productRepoMock.create as jest.Mock).mockReturnValue(fakeProduct);
    (productRepoMock.save as jest.Mock).mockResolvedValue(fakeProduct);

    //act
    const result = await service.create(input); 

    //assert
    expect(productRepoMock.create).toHaveBeenCalledWith(input);
    expect(productRepoMock.save).toHaveBeenCalledWith(fakeProduct);
    expect(result).toEqual(fakeProduct);  
  });

  it('should return all products', async () => {
    //arrange
    const products: Product[] = [
      {id: 1, name: 'product a', price: 10, description: 'description a' },
      {id: 1, name: 'product b', price: 20, description: 'description b' },
    ];
    (productRepoMock.find as jest.Mock).mockReturnValue(products);

    //act
    const result = await service.getAll();
    
    //assert
    expect(result).toEqual(products);
    expect(productRepoMock.find).toHaveBeenCalled();
  });
});

describe('ProductService - delete', () => {
  let mockRepo: Partial<Repository<Product>>;
  let productService: ProductService;

  beforeEach(() => {
    mockRepo = {
      delete: jest.fn(),
    }
    productService = new ProductService(mockRepo as Repository<Product>);
  });

  it('should delete a product by ID', async () => {
    //arrange
    const id = 1;
    (mockRepo.delete as jest.Mock).mockResolvedValue({ affected: 1 })

    //act
    const result = await productService.delete(id);
  
    //assert
    expect(mockRepo.delete).toHaveBeenCalledWith(id);
    expect(result).toEqual({ success: true });
  });

  it('should return error if prodct is not found', async () => { 
    //arrange
    const id = 999;
    (mockRepo.delete as jest.Mock).mockResolvedValue({ affected: 0 })

    //act //assert
    await expect(productService.delete(id)).rejects.toThrow('product not found');
  });

});
