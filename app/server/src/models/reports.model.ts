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
import { Report } from '@interfaces/report.interface';

const ReportModel: Schema<Report> = new Schema(
  {
    reporter: {
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
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    state: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    estimatedEnd: {
      type: Date,
      required: true,
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

export default model<Report & Document>('Report', ReportModel);
