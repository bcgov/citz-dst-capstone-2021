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

import { Document, model, Schema } from 'mongoose';
import { Quarter, Report, ReportState } from '@interfaces/report.interface';
import { KpiSchema } from '@models/KpiModel';
import { MilestoneSchema } from '@models/MilestoneModel';
import { ObjectiveSchema } from '@models/ObjectiveModel';
import { ReportStatusSchema } from '@models/ReportStatusModel';

const Finance = {
  budget: {
    type: Number,
    default: 0,
  },
  estimatedTotalCost: {
    type: Number,
    default: 0,
  },
  fyApproved: {
    type: Number,
    default: 0,
  },
  fyForecast: {
    type: Number,
    default: 0,
  },
  fySitting: {
    type: Number,
    default: 0,
  },
  jvToOcio: {
    type: Number,
    default: 0,
  },
  remaining: {
    type: Number,
    default: 0,
  },
  spendToEndOfPreFy: {
    type: Number,
    default: 0,
  },
};

const ReportModel: Schema<Report> = new Schema(
  {
    submitter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    _schema: {
      type: Number,
    },
    submittedAt: {
      type: Date,
    },
    year: {
      type: Number,
      required: true,
    },
    quarter: {
      type: String,
      required: true,
      enum: Object.values(Quarter),
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    state: {
      type: Number,
      default: ReportState.Draft,
      enum: Object.values(ReportState),
    },
    progress: {
      type: Number,
      default: 0,
    },
    estimatedEnd: {
      type: Date,
    },
    finance: {
      type: Finance,
    },
    financialAnalyst: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    financialNotes: {
      type: String,
    },
    approvedAt: {
      type: Date,
    },
    milestones: [MilestoneSchema],
    objectives: [ObjectiveSchema],
    statuses: [ReportStatusSchema],
    kpis: [KpiSchema],
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (doc, ret) => {
        /* eslint-disable no-underscore-dangle */
        /* eslint-disable no-param-reassign */
        delete ret._id;
      },
    },
    toObject: { virtuals: true },
  },
);

ReportModel.virtual('project', {
  ref: 'Project',
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
});

export default model<Report & Document>('Report', ReportModel);
