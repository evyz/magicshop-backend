
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';


@Controller()
export class UserController{
    constructor(private userService: UserService){}

    @Get('user/me')
    me(): object{
        return {id: 1 ,name: "Billy"}
    }

    @Get('user/auth')
    identificateUser(): string{
        return this.userService.getToken();
    }
}
