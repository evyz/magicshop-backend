import { Body, Controller, Get, Post } from "@nestjs/common";
import { RoleDto } from "./dto/role-dto";
import { RolesService } from "./roles.service";


@Controller('roles')
export class RolesController{
    constructor(private readonly roleService: RolesService) {}

    @Get()
    getRoles(){
        return this.roleService.getRoles()
    }

    @Post()
    createRole(@Body() dto: RoleDto){
        return this.roleService.createRole(dto)
    }

}