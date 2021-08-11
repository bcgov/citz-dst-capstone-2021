import { IsBooleanString, IsEnum, IsMongoId, IsNumberString, IsOptional } from 'class-validator';
import ReportDTO from '@dtos/ReportDTO';

/**
 * Validate a report query object for {@link Report}
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @class
 */
class ReportQueryDTO extends ReportDTO {
  @IsOptional()
  @IsBooleanString()
  last: boolean;
}

export default ReportQueryDTO;
