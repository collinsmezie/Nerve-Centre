import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventGroupType, ActionStatus } from 'lib/constants';

export class CreateEventDto {
  @ApiProperty({
    description: 'The ID of the company associated with the event.',
    example: '60d0fe4f5311236168a109ca',
  })
  @IsMongoId()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({
    description: 'The ID of the driver associated with the event.',
    example: '60d0fe4f5311236168a109cb',
  })
  @IsMongoId()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({
    description: 'The ID of the asset associated with the event.',
    example: '60d0fe4f5311236168a109cc',
  })
  @IsMongoId()
  @IsNotEmpty()
  assetId: string;

  @ApiProperty({
    description: 'The timestamp when the event occurred.',
    example: '2025-05-07T08:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  dateTime: Date;

  @ApiProperty({
    description: 'The group type of event that occurred.',
    enum: EventGroupType,
    example: EventGroupType.FATIGUE,
  })
  @IsEnum(EventGroupType)
  @IsNotEmpty()
  eventGroupType: EventGroupType;

  @ApiProperty({
    description: 'Additional details about the event.',
    example: 'Driver reported fatigue after 8 hours.',
    required: false,
  })
  @IsString()
  @IsOptional()
  eventDetails?: string;

  @ApiProperty({
    description: 'The action associated with the event.',
    enum: ActionStatus,
    example: ActionStatus.ACKNOWLEDGED,
  })
  @IsEnum(ActionStatus)
  @IsNotEmpty()
  action: ActionStatus;
}
