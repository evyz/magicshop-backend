import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "src/user/user.models";
import { RolesController } from "./roles.controller";
import { RoleModel } from "./roles.models";
import { RolesService } from "./roles.service";
import { UserRoleModel } from "./user-roles.models";

@Module({
    imports: [SequelizeModule.forFeature([RoleModel, UserRoleModel, UserModel])],
    controllers: [RolesController],
    providers: [RolesService]
})

export class RolesModule {}