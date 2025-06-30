import { PartialType } from '@nestjs/mapped-types';
import { CreateICEContactDto } from './create-ice-contact.dto';

export class UpdateICEContactDto extends PartialType(CreateICEContactDto) {}
