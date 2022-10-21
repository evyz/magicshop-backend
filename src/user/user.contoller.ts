
import { Body, Controller, Get, Post,Request,UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user-dto';
import { TokenUserDto } from './dto/token-user-dto';
import { JwtAuthGuard } from './jwt-auth';
import { UserService } from './user.service';


@Controller('user')
export class UserController{
    constructor(private userService: UserService){}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    me(@Request() dto: TokenUserDto){
        return this.userService.me(dto)
    }

    @Get('auth')
    identificateUser(): string{
        return this.userService.getToken();
    }

    @Post('register')
    registerUser(@Body() dto: RegisterUserDto){
        return this.userService.registerUser(dto)
    } 

    @Post('login')
    loginUser(@Body() dto: RegisterUserDto){
        return this.userService.loginUser(dto)
    }
}
