import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from './user.models'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { RolesService } from 'src/roles/roles.service'
import { UserRoleModel } from 'src/roles/user-roles.models'

@Injectable()
export class UserService{

    constructor(@InjectModel(
        UserModel) private userRepository: typeof UserModel,
        private jwtService: JwtService,
        private roleService: RolesService
    ){}

    getToken(): string{
        return "User Token"
    }
// 

    async registerUser(dto){
        const {name,email, password} = dto
        if(!name){            
            throw new HttpException("Не указан name", 500);
        }
        if(!email){            
            throw new HttpException("Не указан email", 500)
        }
        if(!password){            
            throw new HttpException("Не указан пароль", 500)
        }
        
        let checkUser = await this.userRepository.findOne({where: {email: email}})
        if(checkUser){
            throw new HttpException("Пользователь с данной почтой уже существует", 500)
        }

        const hashPassword = bcrypt.hashSync(password, 5)

        const newUser = await this.userRepository.create({name,email, password: hashPassword})
        const userRole = await this.roleService.getRoleFromCode('lzid-role-user')
        await newUser.$set('roles', [userRole.id])
        newUser.roles = [userRole]

        const token = this.generateToken(newUser)

        return token
    }

    async loginUser(dto){
        const {email, password} = dto

        if(!email){            
            throw new HttpException("Не указан email", 500)
        }
        if(!password){            
            throw new HttpException("Не указан пароль", 500)
        }

        let checkUser = await this.userRepository.findOne({where: {email: email}})
        if(!checkUser){
            throw new HttpException("Пользователь с данной почтой не существует", 500)
        }

        const isComparing = bcrypt.compareSync(password,checkUser.password)
        if(!isComparing){
            throw new HttpException("Неверный пароль", 500)
        }

        let roles = await this.roleService.getRoleFromUserId(checkUser.id)
        if(!roles.length){
            throw new HttpException('У пользователя нет ролей. Пожалуйста, обратитесь в тех.поддержку для выяснения этого недочёта', 500)
        }

        checkUser.roles = roles
        
        const token = this.generateToken(checkUser)

        return token
    }

    private async generateToken(user: UserModel){
        const payload = {id: user.id, email: user.email, roles: user.roles};

        return {
            token: this.jwtService.sign(payload)
        }
    }

    async me(dto){
        let {user} = dto,
            {id, email, roles} = user

        const obj = await UserModel.findByPk(id, {attributes: ['id', 'name', 'email', 'createdAt']})

        let finalObj = {
            user: obj,
            roles: {
                names: roles.length > 1 ?  roles.map(role => {return role.name}) : roles[0].name,
                ids: roles.length > 1 ? roles.map(role => {return role.id}) : roles[0].id
            }
        }

        return finalObj
    }
}