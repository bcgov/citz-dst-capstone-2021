import { IsBooleanString, IsEnum, IsMongoId, IsNumberString, IsOptional } from 'class-validator';
import ReportDTO from '@dtos/ReportDTO';

class ReportQueryDTO extends ReportDTO {
  @IsOptional()
  @IsBooleanString()
  last: boolean;
}

export default ReportQueryDTO;
