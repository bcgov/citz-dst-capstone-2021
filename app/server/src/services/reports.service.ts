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
import { Milestone, Report, Quarter } from '@interfaces/report.interface';
import ReportModel from '@models/reports.model';
import ProjectModel from '@models/projects.model';
import ReportDTO from '@dtos/ReportDTO';
import { Project } from '@interfaces/project.interface';
import MilestoneDTO from '@dtos/MilestoneDTO';
import ObjectiveDTO from '@dtos/ObjectiveDTO';
import ReportStatusDTO from '@dtos/ReportStatusDTO';

const ReportService = {
  async findAllReports(projectId: string, year: number, quarter: Quarter): Promise<Report[]> {
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

  async createReport(input: ReportDTO): Promise<Report> {
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

  async updateReport(id: string, input: ReportDTO): Promise<Report> {
    const report = await ReportModel.findByIdAndUpdate(id, input, { new: true });
    if (!report) {
      throw errorWithCode(`Unable to update report`, 500);
    }
    return report;
  },

  async getMilestones(id: string): Promise<Milestone[]> {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Unable to find data`, 404);
    }
    return report.milestones;
  },

  async createMilestone(id, input: MilestoneDTO): Promise<Report> {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    report.milestones.push(input);
    return report.save();
  },

  async deleteMilestone(id: string, mid: string): Promise<Report> {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    const index = report.milestones.findIndex(m => m.id === mid);
    if (index < 0) {
      throw errorWithCode(`Not found`, 404);
    }
    report.milestones.splice(index, 1);
    return report.save();
  },

  async updateMilestone(id: string, mid: string, milestone: MilestoneDTO): Promise<Report> {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    const data = report.milestones.find(m => m.id === mid);
    if (!data) {
      throw errorWithCode(`Not found`, 404);
    }
    // report.milestones.id(mid).set(milestone); TODO: (nick) don't know why sub-document api is not available
    Object.assign(data, milestone);
    return report.save();
  },

  async getObjectives(id: string) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Unable to find data`, 404);
    }
    return report.objectives;
  },

  async createObjective(id: string, input: ObjectiveDTO) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    report.objectives.push(input);
    return report.save();
  },

  async deleteObjective(id: string, oid: string) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    const index = report.objectives.findIndex(o => o.id === oid);
    if (index < 0) {
      throw errorWithCode(`Not found`, 404);
    }
    report.objectives.splice(index, 1);
    return report.save();
  },

  async updateObjective(id: string, oid: string, objective: ObjectiveDTO) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    const data = report.objectives.find(o => o.id === oid);
    if (!data) {
      throw errorWithCode(`Not found`, 404);
    }
    Object.assign(data, objective);
    return report.save();
  },

  async getStatuses(id: string) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Unable to find data`, 404);
    }
    return report.statuses;
  },

  async createStatus(id: string, input: ReportStatusDTO) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    const reportStatus = report.statuses.find(s => s.type === input.type);
    if (reportStatus) {
      throw errorWithCode(`Status already exists`, 400);
    }
    report.statuses.push(input);
    return report.save();
  },

  async deleteStatus(id: string, sid: string) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    const index = report.statuses.findIndex(s => s.id === sid);
    if (index < 0) {
      throw errorWithCode(`Not found`, 404);
    }
    report.statuses.splice(index, 1);
    return report.save();
  },

  async updateStatus(id: string, sid: string, input: ReportStatusDTO) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    const data = report.statuses.find(s => s.id === sid);
    if (!data) {
      throw errorWithCode(`Not found`, 404);
    }
    if (input.type !== undefined && data.type !== input.type) {
      throw errorWithCode(`Status type is immutable`, 400);
    }
    Object.assign(data, input);
    return report.save();
  },
};

export default ReportService;
