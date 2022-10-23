import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/user/roles-auth";
import { Roles } from "src/user/roles-auth.decorator";
import { ProductDto } from "./dto/product-fiters-dto";
import { ProductService } from "./product.service";


@Controller('product')
export class ProductController{

    constructor(private productService: ProductService){}

    @Get()
    getProducts(@Query() query: ProductDto){
        return this.productService.getProducts(query)
    }

    @Get('id')
    getProduct(@Param('id') query){
        return this.productService.getProduct(query)
    }

    @Post()
    @Roles('lzid-role-tech-admin')
    @UseGuards(RolesGuard)
    createProduct(@Body() body){
        return this.productService.createProduct(body)
    }

}