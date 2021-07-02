/**
 * Copyright © 2021 Province of British Columbia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { errorWithCode } from '@bcgov/common-nodejs-utils';

import ProjectModel from '@models/projects.model';
import { Project } from '@interfaces/project.interface';
import { ProjectDTO } from '@dtos/project.dto';

const ProjectService = {
  async findAllProjects(): Promise<Project[]> {
    const projects: Project[] = await ProjectModel.find()
      .populate({ path: 'sponsor' })
      .populate({ path: 'manager' })
      .populate({ path: 'financialContact' });

    return projects;
  },

  async findProjectByCPS(cpsIdentifier: string): Promise<Project> {
    const project = await ProjectModel.findOne({ cpsIdentifier })
      .populate({ path: 'sponsor' })
      .populate({ path: 'manager' })
      .populate({ path: 'financialContact' });
    return project;
  },

  async createProject(input: ProjectDTO): Promise<Project> {
    const { cpsIdentifier } = input;
    const project = await ProjectModel.findOne({ cpsIdentifier });
    if (project) {
      throw errorWithCode(`The project ${cpsIdentifier} already exits`, 409);
    }

    return ProjectModel.create(input);
  },

  async deleteProject(id: string): Promise<Project> {
    const project = await ProjectModel.findByIdAndDelete(id);
    if (!project) {
      throw errorWithCode(`Unable to delete project: ${id}`, 500);
    }
    return project;
  },

  async updateProject(id: string, input: ProjectDTO): Promise<Project> {
    const project = await ProjectModel.findByIdAndUpdate(id, input, { new: true });
    if (!project) {
      throw errorWithCode(`Unable to update project`, 500);
    }
    return project;
  },

  async getProjectDetail(cpsIdentifier: string) {
    // TODO: (nick) change so that result includes other info...
    return this.findProjectByCPS(cpsIdentifier);
  },
};

export default ProjectService;
