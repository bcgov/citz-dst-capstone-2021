import { Document, model, Schema } from 'mongoose';
import { Kpi } from '@interfaces/report.interface';

/**
 * {@link KPI} Mongoose Schema
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */

export const KpiSchema: Schema<Kpi> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      default: '',
    },
    baseline: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    target: {
      type: Number,
      default: 100,
    },
    end: {
      type: Date,
      required: true,
    },
    outcome: {
      type: Boolean,
      default: false,
    },
    output: {
      type: Boolean,
      default: false,
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

export default model<Kpi & Document>('Kpi', KpiSchema);
