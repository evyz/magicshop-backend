import {Injectable} from '@nestjs/common'


@Injectable()
export class UserService{
    getToken(): string{
        return "User Token"
    }
}