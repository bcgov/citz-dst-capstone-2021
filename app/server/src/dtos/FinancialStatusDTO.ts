import { FinancialStatus } from '@interfaces/report.interface';
import { IsNumber } from 'class-validator';

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
