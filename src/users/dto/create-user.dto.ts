// users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The roles of the user',
    example: ['admin'],
  })
  @IsNotEmpty({ message: 'Roles cannot be empty' })
  @IsArray()
  roles: string[];
}
