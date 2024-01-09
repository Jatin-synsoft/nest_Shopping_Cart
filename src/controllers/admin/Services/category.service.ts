import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/Models/category.modal';
import { Product } from 'src/Models/product.modal';
import { Inventory } from 'src/Models/inventory.modal';


@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private Category: Model<Category>,
    @InjectModel(Product.name) private Product: Model<Product>,
    @InjectModel(Inventory.name) private Inventory: Model<Inventory>,) { }

  async createCategory(categoryName: string, user: any): Promise<any> {
    try {

      const exitingCategory = await this.Category.findOne({
        name: categoryName,
      });

      if (exitingCategory) {
        throw new ConflictException(
          `Category with name "${categoryName}" already exists`,
        );
      }

      const createdCategory = new this.Category({
        name: categoryName,
        createdBy: user.userId,
      });
      await createdCategory.save();
      return { succes: true, message: `Category ${categoryName} created succesfully with id ${createdCategory._id}. Now you can add products to this. Thank You !!` }
    } catch (error) {
      throw new ConflictException(`Error creating user: ${error.message}`);
    }
  }

  async removeCategory(categoryId: string): Promise<any> {
    try {

      const existingCategory = await this.Category.findOne({ _id: categoryId });

      if (!existingCategory) {
        throw new NotFoundException(`Category with id "${categoryId}" does not exist`);
      }

      const productsToDelete = await this.Product.find({ categoryId });

      for (const product of productsToDelete) {
        await this.Inventory.deleteOne({ productId: product._id });
      }

      await this.Product.deleteMany({ categoryId });
      await this.Category.deleteOne({ _id: categoryId });

      return { success: true, messsage: `Category ${existingCategory.name} ,with its associated products and inventory deleted succesfully` }
    } catch (error) {
      throw new ConflictException(`Error creating user: ${error.message}`);
    }
  }
}
