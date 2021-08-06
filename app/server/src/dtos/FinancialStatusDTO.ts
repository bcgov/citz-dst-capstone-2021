import { FinancialStatus } from '@interfaces/report.interface';
import { IsNumber } from 'class-validator';

/**
 * Validate the financial information for {@link Report.finance}
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @class
 */
class FinancialStatusDTO implements FinancialStatus {
  @IsNumber()
  budget: number;

  @IsNumber()
  estimatedTotalCost: number;

  @IsNumber()
  fyApproved: number;

  @IsNumber()
  fyForecast: number;

  @IsNumber()
  fySitting: number;

  @IsNumber()
  jvToOcio: number;

  @IsNumber()
  remaining: number;

  @IsNumber()
  spendToEndOfPreFy: number;
}

export default FinancialStatusDTO;
