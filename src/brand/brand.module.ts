import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';
import { BrandController } from './brand.controller';
import { BrandModel } from './brand.model';
import { BrandService } from './brand.service';

@Module({
    imports: [SequelizeModule.forFeature([BrandModel]),forwardRef(() => UserModule)],
    controllers :[BrandController],
    providers: [BrandService],
})
export class BrandModule {}
