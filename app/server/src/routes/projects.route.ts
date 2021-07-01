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

import { Router } from 'express';
import passport from 'passport';
import Route from '@interfaces/routes.interface';
import ProjectsController from '@controllers/projects.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import ProjectDTO from '@dtos/projects.dto';

class ProjectsRoute implements Route {
  resource = 'projects';

  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route('/')
      .get(passport.authenticate('jwt', { session: false }), ProjectsController.getProjects)
      .post(
        passport.authenticate('jwt', { session: false }),
        validationMiddleware(ProjectDTO, 'body'),
        ProjectsController.createProject,
      );

    this.router
      .route('/:id')
      .get(passport.authenticate('jwt', { session: false }), ProjectsController.getProjectDetail)
      .delete(passport.authenticate('jwt', { session: false }), ProjectsController.deleteProject)
      .patch(
        passport.authenticate('jwt', { session: false }),
        validationMiddleware(ProjectDTO, 'body', true),
        ProjectsController.updateProject,
      );
  }
}

export default ProjectsRoute;
