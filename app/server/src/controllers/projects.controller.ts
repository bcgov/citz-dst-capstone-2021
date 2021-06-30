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

import { Project } from '@interfaces/project.interface';
import { NextFunction, Request, Response } from 'express';
import ProjectService from '@services/projects.service';
import { CreateProjectDTO } from '@dtos/projects.dto';

const ProjectController = {
  async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const data: Project[] = await ProjectService.findAllProjects();
      res.status(200).json({ data, message: 'projects' });
    } catch (e) {
      next(e);
    }
  },

  async getProjectDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: Project = await ProjectService.findProjectByCPS(id);
      res.status(200).json({ data, message: 'project' });
    } catch (e) {
      next(e);
    }
  },

  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const input: CreateProjectDTO = req.body;
      const data: Project = await ProjectService.createProject(input);
      res.status(201).json({ data, message: 'created' });
    } catch (e) {
      next(e);
    }
  },
  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: Project = await ProjectService.deleteProject(id);
      res.status(200).json({ data, message: 'deleted' });
      next();
    } catch (e) {
      next(e);
    }
  },
  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input: CreateProjectDTO = req.body;
      const data: Project = await ProjectService.updateProject(id, input);
      res.status(200).json({ data, message: 'updated' });
      next();
    } catch (e) {
      next(e);
    }
  },
};

export default ProjectController;
