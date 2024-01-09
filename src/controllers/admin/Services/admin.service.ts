import {ConflictException, HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/Models/role.modal';
import { User } from 'src/Models/user.modal';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private User: Model<User>,
    @InjectModel(Role.name) private Role: Model<Role>,
  ) {}

  async changeRole(role: string, userEmail: string): Promise<any> {
    try {

      const roleId = await this.Role.findOne({ name: role });
  
      const existingUser = await this.User.findOne({ email: userEmail,})

      if (!existingUser) {
        throw new HttpException('user Not found', HttpStatus.NOT_FOUND);
      }

      existingUser.roleId = roleId._id;

      await existingUser.save();

      return {success: true,message : ` Now ${existingUser.name} is ${role}` };
    } catch (error) {
      throw new ConflictException(`Error creating user: ${error.message}`);
    }
  }

  async deleteUser(userEmail: string): Promise<any> {
    try {
      const existingUser = await this.User.findOneAndDelete({email: userEmail});
  
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
  
      return { success: true, message: 'User deleted successfully' };
    } catch (error) {
      throw new ConflictException(`Error deleting user: ${error.message}`);
    }
  }

  
}
