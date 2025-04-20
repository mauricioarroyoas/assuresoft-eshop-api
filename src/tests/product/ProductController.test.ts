import { Request, Response } from "express";
import { createProduct } from "../../controllers/productController";
import { ProductService } from "../../services/ProductService";

// Mock ProductService
jest.mock("../../services/ProductService");

describe("ProductController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup response mocks
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };

    // Setup request mock
    mockRequest = {
      body: {
        name: "Test Product",
        price: 99.99,
        description: "Test Description",
      },
    };
  });

  // Succesfull creation
  describe("createProduct", () => {
    it("should successfully create a product and return 201 status", async () => {
      const expectedProduct = {
        id: 1,
        ...mockRequest.body,
      };

      (ProductService.prototype.create as jest.Mock).mockResolvedValueOnce(
        expectedProduct
      );

      await createProduct(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(expectedProduct);
    });

    // Product creation failure
    it("should return 500 status when product creation fails", async () => {
      const error = new Error("Database error");
      (ProductService.prototype.create as jest.Mock).mockRejectedValueOnce(
        error
      );

      await createProduct(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Error creating product",
        error: "Database error",
      });
    });

    // Invalid input data
    it("should handle invalid input data", async () => {
      mockRequest.body = {}; // Empty body

      await createProduct(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Invalid product data",
        error: "Name, price and description are required",
      });
    });
  });
});
