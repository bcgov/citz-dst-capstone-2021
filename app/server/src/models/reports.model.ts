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
import { Milestone, MilestoneStatus, Report, ReportState, Status } from '@interfaces/report.interface';

const MilestoneModel: Schema<Milestone> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Number,
      default: MilestoneStatus.Green,
    },
    start: {
      type: Date,
      required: true,
    },
    estimatedEnd: {
      type: Date,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    comments: {
      type: String,
    },
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

const ReportModel: Schema<Report> = new Schema(
  {
    submitter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    state: {
      type: Number,
      default: ReportState.Draft,
    },
    progress: {
      type: Number,
      default: 0,
    },
    estimatedEnd: {
      type: Date,
      required: true,
    },
    milestones: [MilestoneModel],
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

export default model<Report & Document>('Report', ReportModel);
