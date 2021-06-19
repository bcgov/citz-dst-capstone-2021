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
import { Project } from '@interfaces/project.interface';

const projectSchema: Schema<Project> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // version to handle changes in the schema structure
    _schema: {
      type: Number,
    },
    cpsIdentifier: {
      type: String,
      required: true,
    },
    projectNumber: {
      type: String,
    },
    ministry: {
      type: String,
      required: true,
    },
    sponsor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    financialContact: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
    },
    estimatedEnd: {
      type: Date,
    },
    progress: {
      type: Number,
      required: true,
    },
    phase: {
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

export default model<Project & Document>('Project', projectSchema);
