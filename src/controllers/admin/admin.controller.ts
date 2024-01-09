import { Body, Controller, Post, Headers, UseGuards, Delete, Res, Req, } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { productdto } from 'src/dto/product.dto';
import { ProductService } from './Services/product.service';
import { CategoryService } from './Services/category.service';
import { AdminService } from './Services/admin.service';

@Controller()
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly adminservice: AdminService
  ) { }

  @Post('category/create')
  createCataegory(@Body('categoryName') categoryName: string, @Req() req: any) {
    const user = req.user
    return this.categoryService.createCategory(categoryName, user);
  }

  @Post('category/remove')
  removeCataegory(@Body('categoryId') categoryId: string,) {
    return this.categoryService.removeCategory(categoryId);
  }

  @Post('product/create')
  createProduct(@Body() productdto: productdto, @Req() req: any) {
    const user = req.user
    return this.productService.createProduct(productdto, user);
  }

  @Post('product/remove')
  removeProduct(@Body('productId') productId: string,) {
    return this.productService.removeProduct(productId);
  }

  @Post('changeRole')
  role(@Body('role') role: string, @Body('userEmail') userEmail: string) {
    return this.adminservice.changeRole(role, userEmail);
  }

  @Delete('deleteUser')
  delete(@Body('userEmail') userEmail: string) {
    return this.adminservice.deleteUser(userEmail);
  }
}
