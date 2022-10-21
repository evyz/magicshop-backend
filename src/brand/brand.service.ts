import {Injectable, HttpException} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { BrandModel } from './brand.model'

@Injectable()
export class BrandService{
    constructor(
        @InjectModel(BrandModel)
        private brandRepository: typeof BrandModel
    ){}

    async getBrands(){
        return await this.brandRepository.findAndCountAll()
    }

    async createBrand(dto){
        const {name, country, website, email} = dto

        if(!name || !country ||  !website || !email){
            throw new HttpException("Не указано одно из требуемых полей", 500)
        }

        const newBrand = await this.brandRepository.create({name, country, website})

        return newBrand
    }

    async setBrandToRepair(dto){
        const {id,repaired} = dto

        const brand = await this.brandRepository.findByPk(id)
        if(!brand){
            throw new HttpException("Неверный ID компании", 500)
        }

        await brand.$set('repaired', repaired)
        await brand.save()

        return brand
    }
}