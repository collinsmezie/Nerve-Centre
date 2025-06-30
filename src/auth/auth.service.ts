import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | { message: string }> {
    try {
      const user = await this.usersService.findOne(email);

      // Check if password is valid
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (!isPasswordValid) {
        return { message: 'Invalid password' };
      }

      // Return user data excluding password
      const { password, ...result } = user;
      return result;
    } catch {
      // Catch any errors from findOne or compare
      return { message: 'Invalid email or password' };
    }
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return { message: 'User registered successfully', user };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    // Check if validateUser returned a message (error response)
    if ('message' in user) {
      throw new BadRequestException(user.message);
    }

    const payload = { email: user.email, sub: user._id, roles: user.roles };
    return {
      message: 'User logged in successfully',
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async getMe(userId: string) {
    try {
      const user = await this.usersService.findOneBy(userId);
      // Remove sensitive information
      const { password, ...result } = user;
      return {
        message: 'User retrieved successfully',
        user: result,
      };
    } catch (error: any) {
      throw new BadRequestException(
        `Unable to retrieve user information: ${error}`,
      );
    }
  }
}
