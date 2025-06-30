import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

// Create an interface for the JWT payload structure
interface JwtPayload {
  userId: string;
  [key: string]: any;
}

// Extend Express Request type to include user property with JwtPayload
interface RequestWithUser extends Request {
  user: JwtPayload;
}

@ApiTags('Authentication') // Optional: Group routes under the "Authentication" section in Swagger
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto }) // Request body for registration
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User registered successfully' },
        user: {
          type: 'object',
          properties: {
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', example: 'user@example.com' },
            _id: { type: 'string', example: '67f50a6436bb38b94b97cd0e' },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-04-08T11:37:08.045Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-04-08T11:37:08.045Z',
            },
            roles: { type: 'array', example: ['admin'] },
          },
        },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login with credentials' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    schema: {
      example: {
        message: 'User logged in successfully',
        token: 'your-jwt-token',
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user information' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User retrieved successfully' },
        user: {
          type: 'object',
          properties: {
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', example: 'user@example.com' },
            _id: { type: 'string', example: '67f50a6436bb38b94b97cd0e' },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-04-08T11:37:08.045Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-04-08T11:37:08.045Z',
            },
            roles: { type: 'array', example: ['admin'] },
          },
        },
      },
    },
  })
  async getMe(@Request() req: RequestWithUser) {
    return await this.authService.getMe(req.user.userId);
  }
}
