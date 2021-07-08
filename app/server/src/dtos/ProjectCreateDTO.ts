import ProjectDTO from '@dtos/ProjectDTO';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import MilestoneDTO from '@dtos/MilestoneDTO';
import ObjectiveDTO from '@dtos/ObjectiveDTO';

class ProjectCreateDTO extends ProjectDTO {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MilestoneDTO)
  milestones: [MilestoneDTO];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ObjectiveDTO)
  objectives: ObjectiveDTO[];
}

export default ProjectCreateDTO;