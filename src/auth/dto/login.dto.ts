// import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

// export class LoginDto {

//   @IsNotEmpty({ message: 'Email cannot be empty' })
//   @IsEmail({}, { message: 'Invalid email format' })
//   email: string;

//   @IsNotEmpty({ message: 'Password cannot be empty' })
//   password: string;
// }



import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDto {

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
  password: string;
}
