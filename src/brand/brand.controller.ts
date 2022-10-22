import {Controller, Get, Post, Body, UseGuards, Param} from "@nestjs/common"
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

    @Get('admin')
    @Roles("lzid-role-tech-admin")
    @UseGuards(RolesGuard)
    getAllBrands(){
        return this.brandService.getAllBrands()
    }
    

    @Post('repair/:id')
    @Roles("lzid-role-tech-admin")
    @UseGuards(RolesGuard)
    repairBrand(@Body() dto, @Param('id') query){
        return this.brandService.setBrandToRepair(dto, query)
    }

    @Post('ban/:id')
    @Roles('lzid-role-tech-admin')
    @UseGuards(RolesGuard)
    banBrand(@Body() dto, @Param('id') query){
        return this.brandService.setBrandToBan(dto, query)
    }

    @Post()
    @Roles("lzid-role-tech-admin")
    @UseGuards(RolesGuard)
    //realize guards from roles and def to createBrand
    createBrands(@Body() dto: object){
        return this.brandService.createBrand(dto)
    }
}