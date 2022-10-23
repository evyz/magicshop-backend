import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductController } from "./product.controller";
import { ProductModel } from "./product.model";
import { ProductService } from "./product.service";

@Module({
    imports: [
        SequelizeModule.forFeature([ProductModel])
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: []
})
export class ProductModule{}