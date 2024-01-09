import { Body, Controller, Get, Post, Headers, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { newUserDto } from 'src/dto/user.dto';
import { User } from 'src/Models/user.modal';
import { updatepassword } from 'src/dto/updatePassword.dto';
import { orderdto } from 'src/dto/order.dto';
import { updateDto } from 'src/dto/updateUser.dto';
import { StripeService } from '../stripe/stripe.service';

@Controller()
export class UserController {
  constructor(private readonly userservice: UserService,private readonly stripeservice : StripeService) { }

  @Post('/sign-up')
  @UsePipes(new ValidationPipe())
  createUser(@Body() newUserDto: newUserDto): Promise<User> {
    return this.userservice.signUp(newUserDto);
  }

  @Post('/login')
  loginUser(@Body() newUserDto: newUserDto): Promise<User> {
    return this.userservice.login(newUserDto);
  }

  @Post('/forgot-password')
  passwordForgot(@Body() newUserDto: newUserDto): Promise<User> {
    return this.userservice.forgotPassword(newUserDto);
  }

  @Put('/reset-password')
  passwordReset(@Headers('authorization') authorizationHeader: string, @Body() updatepassword: updatepassword): Promise<User> {
    const [, token] = authorizationHeader.split(' ');
    return this.userservice.resetPassword(updatepassword, token);
  }


  @Put('/update-profile')
  @UsePipes(new ValidationPipe())
  updateUser(@Headers('authorization') authorizationHeader: string, @Body() updateDto: updateDto): Promise<User> {
    const [, token] = authorizationHeader.split(' ');
    return this.userservice.updateProfile(updateDto, token);
  }

  @Get('/allProducts')
  showAllProducts(@Query('name') name: string, @Query('price') price: number): Promise<User> {
    return this.userservice.showallProdcuts(name, price);
  }

  @Post('/categoryproducts')
  categoryProducts(@Body('categoryId') categoryId: string): Promise<User> {
    return this.userservice.showcategoryProdcuts1(categoryId);
  }

  @Post('/order')
  orderProducts(@Headers('authorization') authorizationHeader: string, @Body() orderdto: orderdto): Promise<any> {
    const [, token] = authorizationHeader.split(' ');
    return this.userservice.order(orderdto, token);
  }

  @Post('/stripe')
  stripe( @Body() userdata :{currency : string,amount : number ,customerId : string,paymentMethodId : string} ): Promise<any> {

    return this.stripeservice.createPaymentIntent(userdata.amount,userdata.currency,userdata.customerId,userdata.paymentMethodId);
  }
}
