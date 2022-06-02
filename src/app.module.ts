import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CartModule,
    ProductModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/enafood'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
