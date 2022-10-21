import {IsEmail, IsString, Length} from 'class-validator'

export class RegisterUserDto{
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: "Неккоректный email"})
    readonly email: string;

    @IsString({message: "Должно быть строкой"})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
}