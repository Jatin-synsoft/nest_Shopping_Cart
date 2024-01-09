import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Models/user.modal';
import { newUserDto } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/Models/role.modal';
import { MailService } from './Mail/mail.service';
import { updatepassword } from 'src/dto/updatePassword.dto';
import { Inventory } from 'src/Models/inventory.modal';
import { orderdto } from 'src/dto/order.dto';
import { Order } from 'src/Models/order.modal';
import { TokenService } from 'src/helper/token.service';
import { updateDto } from 'src/dto/updateUser.dto';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private User: Model<User>,
    @InjectModel(Role.name) private Role: Model<Role>,
    @InjectModel(Inventory.name) private Inventory: Model<Inventory>,
    @InjectModel(Order.name) private Order: Model<Order>,
    private mailservice: MailService,
    private tokenservice: TokenService,
    private stripeservice: StripeService
  ) { }

  async signUp(newUserDto: newUserDto): Promise<any> {
    try {
      const exitingUser = await this.User.findOne({ email: newUserDto.email.toLowerCase(), });

      if (exitingUser) {
        throw new ConflictException(`User with email ${newUserDto.email} already exists`,);
      }

      const salt = 10;
      const hash = bcrypt.hashSync(newUserDto.password, salt);
      const roleName = newUserDto.role || 'user';
      const userRole = (await this.Role.findOne({ name: roleName })) || (await this.Role.create({ name: roleName }));
      const stripeCustomer = await this.stripeservice.createCustomer(newUserDto.name, newUserDto.email);
      const createdUser = new this.User({
        ...newUserDto,
        email: newUserDto.email.toLowerCase(),
        password: hash,
        roleId: userRole._id,
        stripeCustomerId: stripeCustomer.id
      });
      await createdUser.save();
      return { status: true, message: `User with gmail id ${newUserDto.email} is created succesfully and all detials are as follow .`, createdUser }
    } catch (error) {
      throw new ConflictException(`Error creating user: ${error.message}`);
    }
  }

  async login(newUserDto: newUserDto): Promise<any> {
    try {
      const user = await this.User.findOne({ email: newUserDto.email.toLowerCase(), });

      if (!user) {
        throw new HttpException('Email id not registered', HttpStatus.NOT_FOUND);
      }
      const checkPass = await bcrypt.compareSync(newUserDto.password, user.password);

      if (!checkPass) {
        throw new UnauthorizedException('invalid credentials', { cause: new Error(), });
      }

      const datatoSign = { email: user.email, userId: user._id }
      const newToken = this.tokenservice.generateToken(datatoSign)
      return { message: `Login Succesfull ,Welcome ${user.name} Logged User  :- ${user.email}`, token: newToken };
    } catch (error) {
      throw new ConflictException(`Error creating user: ${error.message}`);
    }
  }

  async forgotPassword(newUserDto: newUserDto): Promise<any> {
    try {
      const user = await this.User.findOne({ email: newUserDto.email.toLowerCase() });

      if (!user) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      } else {
        const datatoSign = { email: user.email, userId: user._id }
        const token = this.tokenservice.generateToken(datatoSign)
        this.mailservice.sendResetPasswordEmail(user.email, token);
        return { user: user, token: token };
      }
    } catch (error) {
      throw new ConflictException(`Error creating user: ${error.message}`);
    }
  }

  async resetPassword(updatepassword: updatepassword, token: any,): Promise<any> {
    try {
      if (!updatepassword.password) {
        throw new BadRequestException('New password is required');
      }

      const decodedToken: any = this.tokenservice.verifyToken(token)
      console.log(decodedToken)
      const user = await this.User.findById(decodedToken.userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const salt = 10;
      const hash = bcrypt.hashSync(updatepassword.password, salt);
      user.password = hash;

      return await user.save();
    } catch (error) {
      throw new BadRequestException(`Error resetting password: ${error.message}`,);
    }
  }

  async updateProfile(updateDto: updateDto, token: any,): Promise<any> {
    try {
      if (!updateDto) {
        throw new BadRequestException('Required Filed');
      }

      const decodedToken: any = this.tokenservice.verifyToken(token)
      console.log(decodedToken)
      const user = await this.User.findById(decodedToken.userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      Object.assign(user, updateDto);
      return await user.save();
    } catch (error) {
      throw new BadRequestException(`Error resetting password: ${error.message}`,);
    }
  }


  async showallProdcuts(name: string, price: number): Promise<any> {
    try {
      const products = await this.Inventory.find().populate('productId');

      if (name && price) {
        return products.filter(product => product.productId['name'] && product.productId['price'] <= price);
      } else if (price) {
        return products.filter(product => product.productId['price'] <= price);
      } else if (name) {
        return products.filter(product => product.productId['name'].toLowerCase().match(name.toLowerCase()));
      } else {
        return products;
      }
    } catch (error) {
      throw new ConflictException(`Error creating user: ${error.message}`);
    }
  }

  async showcategoryProdcuts(categoryId: string): Promise<any> {
    try {
      const products = await this.Inventory.find().populate('productId');

      return products.filter(product =>
        product.productId['categoryId'] == categoryId
      )
    } catch (error) {
      throw new ConflictException(`Error creating user: ${error.message}`);
    }

  }


  async showcategoryProdcuts1(categoryId: string): Promise<any> {
    try {
      const products = await this.Inventory.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },

        },{
          $unwind: '$product',
        },
    
      ]);

      const filteredProducts = products.filter(product =>
        product.product['categoryId'] == categoryId
      )
     
      if (filteredProducts.length <= 0) {
        return { message: "No products found in the specified category" }
      }else{  return filteredProducts;}
    } catch (error) {
      throw new ConflictException(`Error creating user: ${error.message}`);
    }

  }

  async order(orderdto: orderdto, token: any): Promise<any> {
    try {
      const decodedToken: any = this.tokenservice.verifyToken(token)

      const inventory = await this.Inventory.findOne({ productId: orderdto.productId });

      if (inventory.quantity <= 0) {
        return { messeage: `out of stock ....restocking  soon` };
      }

      const existingOrder = await this.Order.findOne({ productId: orderdto.productId, userId: decodedToken.userId });

      if (existingOrder) {

        existingOrder.quantity += orderdto.quantity;
        await existingOrder.save();

        inventory.quantity -= orderdto.quantity;
        await inventory.save();

        return existingOrder
      }
      const orderedProduct = new this.Order({ ...orderdto, orderBy: decodedToken.userId });
      orderedProduct.quantity = orderdto.quantity;
      await orderedProduct.save();

      inventory.quantity -= orderdto.quantity;
      await inventory.save();
      return { orderedProduct };

    } catch (error) {
      console.error('Error processing order:', error);
      throw new Error('Error processing order');
    }
  }

}
