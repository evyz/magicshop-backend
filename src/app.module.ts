import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModel } from './user/user.models';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, 
    SequelizeModule.forRoot({
      dialect:'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'shop-backend',
      models: [UserModel],
      autoLoadModels: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
