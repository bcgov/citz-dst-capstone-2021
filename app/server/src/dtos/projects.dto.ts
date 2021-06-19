import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsNumber()
  _schema?: number;

  @IsString()
  @Length(11)
  cpsIdentifier: string;

  @IsOptional()
  @IsString()
  projectNumber: string;

  @IsString()
  description: string;

  @IsString()
  @MinLength(6)
  ministry: string;

  @IsString()
  @MinLength(5)
  program: string;

  @IsMongoId()
  sponsor: string;

  @IsMongoId()
  manager: string;

  @IsMongoId()
  financialContact: string;

  @IsDateString()
  start: string;

  @IsOptional()
  @IsDateString()
  end: string;

  @IsOptional()
  @IsDateString()
  estimatedEnd: string;

  @Min(0)
  @Max(100)
  progress: number;

  @IsOptional()
  @IsString()
  phase: string;
}

export default CreateProjectDTO;
