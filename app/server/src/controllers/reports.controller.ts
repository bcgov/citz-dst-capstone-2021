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

import { NextFunction, Request, Response } from 'express';
import ReportService from '@services/reports.service';
import { Report, ReportQuarter } from '@interfaces/report.interface';
import CreateReportDTO from '@dtos/reports.dto';

const ReportController = {
  async getReports(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId, year, quarter } = req.query;
      if (!projectId) {
        res.status(400).send('Bad request');
      } else {
        const data: Report[] = await ReportService.findAllReports(projectId as string, +year, quarter as ReportQuarter);
        res.status(200).json({ data, message: 'reports' });
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  async getReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).send('Bad request');
      } else {
        const data: Report = await ReportService.findReport(id);
        res.status(200).json({ data, message: 'reports' });
      }
    } catch (e) {
      next(e);
    }
  },

  async createReport(req: Request, res: Response, next: NextFunction) {
    try {
      const input: CreateReportDTO = req.body;
      const data = await ReportService.createReport(input);
      res.status(201).json({ data, message: 'created' });
    } catch (e) {
      next(e);
    }
  },

  async updateReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input: CreateReportDTO = req.body;
      const data = await ReportService.updateReport(id, input);
      res.status(200).json({ data, message: 'updated' });
    } catch (e) {
      next(e);
    }
  },

  async deleteReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await ReportService.deleteReport(id);
      res.status(200).json({ data, message: 'deleted' });
    } catch (e) {
      next(e);
    }
  },
};

export default ReportController;
