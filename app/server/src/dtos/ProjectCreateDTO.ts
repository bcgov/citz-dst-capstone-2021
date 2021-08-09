import ProjectDTO from '@dtos/ProjectDTO';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import MilestoneDTO from '@dtos/MilestoneDTO';
import ObjectiveDTO from '@dtos/ObjectiveDTO';
import KpiDTO from '@dtos/KpiDTO';
import { Kpi } from '@interfaces/report.interface';

/**
 * Validate a new project object for {@link Project}
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @class
 */
class ProjectCreateDTO extends ProjectDTO {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MilestoneDTO)
  milestones: [MilestoneDTO];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ObjectiveDTO)
  objectives: ObjectiveDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KpiDTO)
  kpis: Kpi[];
}

export default ProjectCreateDTO;
