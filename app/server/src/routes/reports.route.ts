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

import passport from 'passport';
import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import ReportController from '@controllers/reports.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import CreateReportDTO, { ReportQueryDTO } from '@dtos/reports.dto';

class ReportsRoute implements Route {
  resource = 'reports';

  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route('/')
      .get(
        passport.authenticate('jwt', { session: false }),
        validationMiddleware(ReportQueryDTO, 'query'),
        ReportController.getReports,
      )
      .post(
        passport.authenticate('jwt', { session: false }),
        validationMiddleware(CreateReportDTO, 'body'),
        ReportController.createReport,
      );

    this.router
      .route('/:id')
      .get(passport.authenticate('jwt', { session: false }), ReportController.getReport)
      .delete(passport.authenticate('jwt', { session: false }), ReportController.deleteReport)
      .patch(
        passport.authenticate('jwt', { session: false }),
        validationMiddleware(CreateReportDTO, 'body', true),
        ReportController.updateReport,
      );
  }
}

export default ReportsRoute;
