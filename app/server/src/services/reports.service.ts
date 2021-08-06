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
import { Milestone, Report } from '@interfaces/report.interface';
import ReportModel from '@models/ReportModel';
import ProjectModel from '@models/ProjectModel';
import ReportDTO from '@dtos/ReportDTO';
import { Project } from '@interfaces/project.interface';
import MilestoneDTO from '@dtos/MilestoneDTO';
import ObjectiveDTO from '@dtos/ObjectiveDTO';
import ReportStatusDTO from '@dtos/ReportStatusDTO';
import KpiDTO from '@dtos/KpiDTO';

const ReportService = {
  async findAllReports(last: boolean, params?: Record<string, any>): Promise<Report[]> {
    let query = ReportModel.find(params).populate({ path: 'submitter' }).populate('project');
    if (last) {
      query = query.sort({ createdAt: -1 }).limit(1);
    }
    const reports: Report[] = await query.exec();
    return reports;
  },

  async findReport(id: string): Promise<Report> {
    const report: Report = await ReportModel.findById(id)
      .populate({ path: 'submitter' })
      .populate({ path: 'financialAnalyst' })
      .populate('project');
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
      throw errorWithCode(`The report exists`, 409);
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
    const report = await ReportModel.findByIdAndUpdate(id, input, { new: true })
      .populate('project')
      .lean();
    if (!report) {
      throw errorWithCode(`Unable to update report`, 500);
    }
    // mongoose Document.lean() doesn't transform _id to id
    // eslint-disable-next-line no-underscore-dangle
    (report as Report).id = (report as any)._id;
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
    Object.assign(data, input);
    return report.save();
  },

  async getKpis(id: string) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Unable to find data`, 404);
    }
    return report.kpis;
  },

  async createKpi(id: string, input: KpiDTO) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    const reportStatus = report.kpis.find(kpi => kpi.name === input.name);
    if (reportStatus) {
      throw errorWithCode(`Status already exists`, 400);
    }
    report.kpis.push(input);
    return report.save();
  },

  async deleteKpi(id: string, kid: string) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    const index = report.kpis.findIndex(kpi => kpi.id === kid);
    if (index < 0) {
      throw errorWithCode(`Not found`, 404);
    }
    report.kpis.splice(index, 1);
    return report.save();
  },

  async updateKpi(id: string, kid: string, input: KpiDTO) {
    const report = await ReportModel.findById(id);
    if (!report) {
      throw errorWithCode(`Bad request`, 400);
    }
    const data = report.kpis.find(kpi => kpi.id === kid);
    if (!data) {
      throw errorWithCode(`Not found`, 404);
    }
    Object.assign(data, input);
    return report.save();
  },
};

export default ReportService;
