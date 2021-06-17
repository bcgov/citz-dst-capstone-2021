import { errorWithCode } from '@bcgov/common-nodejs-utils';

import ProjectModel from '@models/projects.model';
import { Project } from '@interfaces/project.interface';
import { CreateProjectDTO } from '@dtos/projects.dto';

export default {
  async findAllProjects(): Promise<Project[]> {
    const projects: Project[] = await ProjectModel.find()
      .populate({ path: 'sponsor', select: ['firstName', 'lastName'] })
      .populate({ path: 'manager', select: ['firstName', 'lastName'] })
      .populate({ path: 'financialContact', select: ['firstName', 'lastName'] });

    return projects;
  },

  async findProjectByCPS(cpsIdentifier: string): Promise<Project> {
    const project = await ProjectModel.findOne({ cpsIdentifier });
    return project;
  },

  async createProject(input: CreateProjectDTO): Promise<Project> {
    const { cpsIdentifier } = input;
    let project: Project = await ProjectModel.findOne({ cpsIdentifier });
    if (project) {
      throw errorWithCode(`The project ${cpsIdentifier} already exits`, 409);
    }

    // TODO: (nick) need to resolve this warning.
    // TS2590: Expression produces a union type that is too complex to represent
    // @ts-ignore
    project = await ProjectModel.create(input);
    return project;
  },

  async deleteProject(id: string): Promise<Project> {
    const project = await ProjectModel.findByIdAndDelete(id);
    if (!project) {
      throw errorWithCode(`Unable to delete project: ${id}`, 500);
    }
    return project;
  },
  async updateProject(id: string, input: CreateProjectDTO): Promise<Project> {
    const project = await ProjectModel.findByIdAndUpdate(id, input, { new: true });
    if (!project) {
      throw errorWithCode(`Unable to update user`, 500);
    }
    return project;
  },
};
