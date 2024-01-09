import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/Models/category.modal';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { User, UserSchema } from 'src/Models/user.modal';
import { Product, ProductSchema } from 'src/Models/product.modal';
import { CategoryService } from './Services/category.service';
import { ProductService } from './Services/product.service';
import { Inventory, InventorySchema } from 'src/Models/inventory.modal';
import { AdminService } from './Services/admin.service';
import { Role, RoleSchema } from 'src/Models/role.modal';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: Inventory.name, schema: InventorySchema },
      { name: Role.name, schema: RoleSchema },
    ])
  ],
  providers: [AuthGuard, CategoryService, ProductService, AdminService],
  controllers: [AdminController],
})
export class AdminModule { }
