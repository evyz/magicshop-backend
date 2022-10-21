import {Controller, Get, Post, Body} from "@nestjs/common"
import { BrandService } from "./brand.service";


@Controller('brand')
export class BrandController{
    constructor(private readonly brandService: BrandService){}

    @Get()
    getBrands(){
        return this.brandService.getBrands()
    }

    @Post()
    //realize guards from roles and def to createBrand
    createBrands(@Body() dto: object){
        return this.brandService.createBrand(dto)
    }
}