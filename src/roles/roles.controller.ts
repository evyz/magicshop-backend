import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/user/roles-auth";
import { Roles } from "src/user/roles-auth.decorator";
import { RoleDto } from "./dto/role-dto";
import { RolesService } from "./roles.service";


@Controller('roles')
export class RolesController{
    constructor(private readonly roleService: RolesService) {}

    @Get()
    @Roles('lzid-role-tech-admin')
    @UseGuards(RolesGuard)
    getRoles(){
        return this.roleService.getRoles()
    }

    @Get(':id')
    @Roles('lzid-role-tech-admin')
    @UseGuards(RolesGuard)
    getRole(@Param('id') query){
        return this.roleService.getRole(query)
    }

    @Post()
    @Roles('lzid-role-tech-admin')
    @UseGuards(RolesGuard)
    createRole(@Body() dto: RoleDto){
        return this.roleService.createRole(dto)
    }

    @Put(':id')
    @Roles('lzid-role-tech-admin')
    @UseGuards(RolesGuard)
    editRole(@Body() dto: RoleDto, @Param('id') query){
        return this.roleService.editRoleFromId(dto, query)
    }

}