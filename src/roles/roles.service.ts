import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './roles.models';
import {HttpException} from '@nestjs/common'
import { UserRoleModel } from './user-roles.models';
import { Op } from 'sequelize';

@Injectable()
export class RolesService {

  constructor(
    @InjectModel(RoleModel)
    private roleRepository: typeof RoleModel,
    @InjectModel(UserRoleModel)
    private userRolesRepository: typeof UserRoleModel
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  async getRole(query){
    return await this.roleRepository.findByPk(query)
  }

  async getRoles(){ 
    return await this.roleRepository.findAndCountAll({
      order: [
        ['id', 'ASC']
      ]
    })
  }

  async createRole(dto){
    const {name, code} = dto

    if(!name || !code){
      throw new HttpException("Не указано одно из требуемых полей", 500)
    }
    
    const checkRole = await this.roleRepository.findOne({where: {code}})
    if(checkRole){
      throw new HttpException("Данная роль уже существует", 500)
    }
    
    const newRole = await this.roleRepository.create({...dto})

    return newRole;
  }

  async getRoleFromCode(code: string){
    if(!code){
      return null;
    }

    const checkRole = await this.roleRepository.findOne({where: {code}})
    if(!checkRole){
      return null;
    }

    return checkRole;
  }

  async getRoleFromUserId(id: number){
    if(!id){
      return null;
    }

    let userRoles = await this.userRolesRepository.findAll({where: {userId: id}})
    let ids = userRoles.map(id => {return id.roleId})

    const roles = await this.roleRepository.findAll({where: {id: {
      [Op.in]: ids
    }}})

    return roles
  }

  async editRoleFromId(dto, query){
    console.log(query)
    if(!query){
      throw new HttpException("Не указан ID", 500)
    }

    let updObj: {[k: string]: any} = {}

    let checkObj = await this.roleRepository.findByPk(query)
    if(!checkObj){
      throw new HttpException("Неверный ID", 500)
    }

    if(dto.name){
      updObj.name = dto.name;
    }
    if(dto.code){
      updObj.code = dto.code;
    }

    let upd
    
    try{
      upd =  await this.roleRepository.update(updObj, {where: {id: query}})
    }catch(e){
      throw new HttpException(e.original.detail, 303)
    }

    return upd
  }
}
