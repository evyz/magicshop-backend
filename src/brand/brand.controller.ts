import {Controller, Get, Post, Body, UseGuards} from "@nestjs/common"
import { RolesGuard } from "src/user/roles-auth";
import { Roles } from "src/user/roles-auth.decorator";
import { BrandService } from "./brand.service";


@Controller('brand')
export class BrandController{
    constructor(private readonly brandService: BrandService){}

    @Get()
    getBrands(){
        return this.brandService.getBrands()
    }

    
    @Post()
    @Roles("lzid-role-admin")
    @UseGuards(RolesGuard)
    //realize guards from roles and def to createBrand
    createBrands(@Body() dto: object){
        return this.brandService.createBrand(dto)
    }
}