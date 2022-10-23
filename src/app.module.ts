import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModel } from './roles/roles.models';
import { RolesModule } from './roles/roles.module';
import { UserRoleModel } from './roles/user-roles.models';
import { UserModel } from './user/user.models';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { BrandModel } from './brand/brand.model';
import { ProductModel } from './product/product.model';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    // DB ------
    SequelizeModule.forRoot({
      dialect:'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'shop-backend',
      models: [UserModel, RoleModel, UserRoleModel, BrandModel, ProductModel],
      autoLoadModels: true
    }),

    UserModule, 
    RolesModule,
    BrandModule,
    ProductModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
