import { Module } from "@nestjs/common";
import { UserController } from "./user.contoller";
import { UserService } from "./user.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule{}