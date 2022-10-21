import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BrandController } from './brand.controller';
import { BrandModel } from './brand.model';
import { BrandService } from './brand.service';

@Module({
    imports: [SequelizeModule.forFeature([BrandModel])],
    controllers :[BrandController],
    providers: [BrandService],
})
export class BrandModule {}
