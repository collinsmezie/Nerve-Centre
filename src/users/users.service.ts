import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Check if the user exists in the database
    const user = await this.userModel.findOne({
      email: createUserDto.email.toLowerCase(),
    });

    if (user) {
      // If user is found, throw a BadRequestException
      throw new NotFoundException(
        `User with this email already exists - Provide a unique email`,
      );
    }

    // Proceed with user creation

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({ isActive: true }).lean();
  }

  // findOne handler for login use
  async findOne(email: string): Promise<User> {
    // Check if the user exists in the database
    const user = await this.userModel.findOne({ email }).lean();

    if (!user) {
      // If no user is found, throw a NotFoundException
      throw new NotFoundException(
        `User not found - Provide a valid or registered email`,
      );
    }
    return user;
  }

  // findOne handler for user retrieval
  async findOneBy(id: string): Promise<User> {
    // Check if the user exists in the database
    const user = await this.userModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean();

    if (!user) {
      // If no user is found, throw a NotFoundException
      throw new NotFoundException(`User not found - Provide a valid id`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if the user exists in the database
    const user = await this.userModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean();

    if (!user) {
      // If no user is found, throw a NotFoundException
      throw new NotFoundException(`User not found - Provide a valid id`);
    }

    // Proceed with update
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .lean();

    if (!updatedUser) {
      throw new NotFoundException(`User not found - Provide a valid id`);
    }

    // Return the updated user
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    // Check if the user exists in the database
    const user = await this.userModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean();

    if (!user) {
      // If no user is found, throw a NotFoundException
      throw new NotFoundException(`User not found - Provide a valid id`);
    }

    // // Proceed with deletion
    // await this.userModel.findByIdAndDelete(id);

    await this.userModel.findByIdAndUpdate(id, { isActive: false }).exec();

    return;
  }
}
