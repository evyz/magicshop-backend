import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoleModel } from "src/roles/roles.models";
import { UserRoleModel } from "src/roles/user-roles.models";
import { UserController } from "./user.contoller";
import { UserModel } from "./user.models";
import { UserService } from "./user.service";
import { RolesService } from "src/roles/roles.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        SequelizeModule.forFeature([UserModel, UserRoleModel, RoleModel]),
        JwtModule.register({
            secret: "SECRET_KEY_123",
            signOptions: {
                expiresIn: '24h'
            }
        }),
    ],
    controllers: [UserController],
    providers: [UserService, RolesService],
    exports: [JwtModule]

})
export class UserModule{}