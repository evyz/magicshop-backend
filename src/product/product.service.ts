import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProductModel } from "./product.model";


@Injectable()
export class ProductService{
    constructor(@InjectModel(ProductModel) private productRepository: typeof ProductModel){}


    async getProducts(query){
        
    }
}