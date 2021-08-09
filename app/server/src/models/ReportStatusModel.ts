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

/**
 * {@link ReportStatus} Mongoose Schema
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */

import { Document, model, Schema } from 'mongoose';
import { ReportStatus, Status, StatusType, Trend } from '@interfaces/report.interface';

export const ReportStatusSchema: Schema<ReportStatus> = new Schema(
  {
    status: {
      type: Number,
      default: Status.Green,
      enum: Object.values(Status),
    },
    trend: {
      type: Number,
      default: Trend.Steady,
      enum: Object.values(Trend),
    },
    comments: {
      type: String,
    },
    type: {
      type: Number,
      enum: Object.values(StatusType),
      immutable: true,
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

export default model<ReportStatus & Document>('ReportStatus', ReportStatusSchema);
