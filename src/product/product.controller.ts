import { Controller, Get, Post, Query } from "@nestjs/common";
import { ProductDto } from "./dto/product-fiters-dto";
import { ProductService } from "./product.service";


@Controller('product')
export class ProductController{

    constructor(private productService: ProductService){}

    @Get()
    getProducts(@Query() query: ProductDto){
        return this.productService.getProducts(query)
    }

}