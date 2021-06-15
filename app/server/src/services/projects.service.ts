import ProjectModel from '@models/projects.model';
import { Project } from '@interfaces/project.interface';

export default {
  async findAllProjects(): Promise<Project[]> {
    const projects: Project[] = await ProjectModel.find();
    return projects;
  },
};
