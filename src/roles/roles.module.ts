import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "src/user/user.models";
import { UserModule } from "src/user/user.module";
import { RolesController } from "./roles.controller";
import { RoleModel } from "./roles.models";
import { RolesService } from "./roles.service";
import { UserRoleModel } from "./user-roles.models";

@Module({
    imports: [SequelizeModule.forFeature([RoleModel, UserRoleModel, UserModel]), forwardRef(() => UserModule)],
    controllers: [RolesController],
    providers: [RolesService]
})

export class RolesModule {}