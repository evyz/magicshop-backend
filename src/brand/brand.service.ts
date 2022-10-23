import {Injectable, HttpException} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { type } from 'os'
import { BrandModel } from './brand.model'

@Injectable()
export class BrandService{
    constructor(
        @InjectModel(BrandModel)
        private brandRepository: typeof BrandModel
    ){}

    async getBrands(){
        return await this.brandRepository.findAndCountAll({where: {banned: false, repaired: false}})
    }

    async getBrand(query){
        return await this.brandRepository.findByPk(query)
    }

    async createBrand(dto){
        const {name, country, website} = dto

        if(!name || !country ||  !website){
            throw new HttpException("Не указано одно из требуемых полей", 500)
        }

        const newBrand = await this.brandRepository.create({name, country, website})

        return newBrand
    }

    async setBrandToRepair(dto, query){
        const id = query
        const {repaired} = dto

        const brand = await this.brandRepository.findByPk(id)
        if(!brand){
            throw new HttpException("Неверный ID компании", 500)
        }

        let upd 
        
        try{
            upd= await this.brandRepository.update({repaired}, {where: {id}})
        }catch(e){
            console.log(e)
        }

        return upd
    }

    async setBrandToBan(dto, query){
        const id = query
        let {banned} = dto

        banned = typeof banned === 'boolean' ? banned : false

        const brand = await this.brandRepository.findByPk(id)
        if(!brand){
            throw new HttpException("Неверный ID компании", 500)
        }

        let upd 
        
        try{
            upd= await this.brandRepository.update({banned}, {where: {id}})
        }catch(e){
            console.log(e)
        }

        return upd
    }

    async getAllBrands(){
        return await this.brandRepository.findAndCountAll()
    }
}