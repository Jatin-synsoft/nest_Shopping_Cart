import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/Models/category.modal';
import { Product } from 'src/Models/product.modal';
import { productdto } from 'src/dto/product.dto';
import { Inventory } from 'src/Models/inventory.modal';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Category.name) private Category: Model<Category>,
        @InjectModel(Product.name) private Product: Model<Product>,
        @InjectModel(Inventory.name) private Inventory: Model<Inventory>,
    ) { }

    async createProduct(productdto: productdto, user: any): Promise<any> {
        try {
            const exitingCategory = await this.Category.findOne({_id: productdto.categoryId,});

            if (!exitingCategory) {
                throw new ConflictException(`Category with id "${productdto.categoryId}" not exists`,);
            }

            const exitingProduct = await this.Product.findOne({name: productdto.name,});

            if (exitingProduct) {
                throw new ConflictException(`Product with name "${productdto.name}" already exists`,);
            }

            const createdProduct = new this.Product({
                ...productdto,
                createdBy: user.userId,
            });

            let savedProduct = await createdProduct.save()
            
            new this.Inventory({
                quantity: productdto.quantity,
                productId: savedProduct._id,
            }).save();

            return {succes :true ,message :` Products added succesfully and your product details as :`,savedProduct}
        } catch (error) {
            throw new ConflictException(`Error creating user: ${error.message}`);
        }
    }

    async removeProduct(productId: string): Promise<any> {
        try {
            const existingProduct = await this.Product.findOne({ _id: productId });

            if (!existingProduct) {
                throw new NotFoundException(`Product with id "${productId}" does not exist`);
            }

            const productsToDelete = await this.Product.find({ _id: productId });

            for (const product of productsToDelete) {
                await this.Inventory.deleteOne({ productId: product._id });
            }

            await this.Product.deleteMany({ _id: productId });

            return { succes : true , message: `Product ${existingProduct.name} with its associated inventory deleted succesfully` }
        } catch (error) {
            throw new ConflictException(`Error creating user: ${error.message}`);
        }
    }
}
