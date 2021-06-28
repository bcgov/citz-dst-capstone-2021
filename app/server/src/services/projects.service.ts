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
    const project = await ProjectModel.findOne({ cpsIdentifier })
      .populate({ path: 'sponsor', select: ['firstName', 'lastName'] })
      .populate({ path: 'manager', select: ['firstName', 'lastName'] })
      .populate({ path: 'financialContact', select: ['firstName', 'lastName'] });
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

  async getProjectDetail(cpsIdentifier: string) {
    // TODO: (nick) change so that result includes other info...
    return this.findProjectByCPS(cpsIdentifier);
  },
};
