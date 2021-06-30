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
import { Report, ReportQuarter } from '@interfaces/report.interface';
import ReportModel from '@models/reports.model';
import ProjectModel from '@models/projects.model';
import CreateReportDTO from '@dtos/reports.dto';
import { Project } from '@interfaces/project.interface';

const ReportService = {
  async findAllReports(projectId: string, year: number, quarter: ReportQuarter): Promise<Report[]> {
    const params = { projectId };
    if (year) Object.assign(params, { year });
    if (quarter) Object.assign(params, { quarter });
    const reports: Report[] = await ReportModel.find(params).populate({ path: 'submitter' });
    return reports;
  },

  async findReport(id: string): Promise<Report> {
    const report: Report = await ReportModel.findById(id).populate({ path: 'submitter' });
    return report;
  },

  async createReport(input: CreateReportDTO): Promise<Report> {
    const { projectId } = input;
    const project: Project = await ProjectModel.findOne({ _id: projectId });
    if (!project) {
      throw errorWithCode(`The project not found`, 404);
    }
    const { year, quarter } = input;
    const report: Report = await ReportModel.findOne({ projectId, year, quarter });
    if (report) {
      throw errorWithCode(`The report exits`, 409);
    }

    return ReportModel.create(input);
  },

  async deleteReport(id: string): Promise<Report> {
    const report = await ReportModel.findByIdAndDelete(id);
    if (!report) {
      throw errorWithCode(`Unable to delete report`, 500);
    }
    return report;
  },

  async updateReport(id: string, input: CreateReportDTO): Promise<Report> {
    const report = await ReportModel.findByIdAndUpdate(id, input, { new: true });
    if (!report) {
      throw errorWithCode(`Unable to update report`, 500);
    }
    return report;
  },
};

export default ReportService;
