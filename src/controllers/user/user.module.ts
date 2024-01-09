import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Models/user.modal';
import { Role, RoleSchema } from 'src/Models/role.modal';
import { MailService } from './Mail/mail.service';
import { Category, CategorySchema } from 'src/Models/category.modal';
import { Inventory, InventorySchema } from 'src/Models/inventory.modal';
import { Product, ProductSchema } from 'src/Models/product.modal';
import { Order, OrderSchema } from 'src/Models/order.modal';
import { TokenService } from 'src/helper/token.service';
import { ValidateDataMiddleware } from 'src/middlewares/validator.middleware';
import { StripeService } from '../stripe/stripe.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Role.name, schema: RoleSchema },
            { name: Category.name, schema: CategorySchema },
            { name: Product.name, schema: ProductSchema },
            { name: Inventory.name, schema: InventorySchema },
            { name: Order.name, schema: OrderSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, MailService, TokenService,StripeService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(ValidateDataMiddleware).forRoutes('*');
    }
}