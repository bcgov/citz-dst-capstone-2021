import { IsEnum, IsMongoId, IsNumberString, IsOptional } from 'class-validator';
import { Quarter } from '@interfaces/report.interface';

class ReportQueryDTO {
  @IsMongoId()
  projectId: string;

  @IsOptional()
  @IsNumberString()
  year: number;

  @IsOptional()
  @IsEnum(Quarter)
  quarter: Quarter;
}

export default ReportQueryDTO;