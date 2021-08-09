import { Document, model, Schema } from 'mongoose';
import { Objective, Status } from '@interfaces/report.interface';

/**
 * {@link Objective} Mongoose Schema
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */

export const ObjectiveSchema: Schema<Objective> = new Schema(
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
      default: Status.Green,
      enum: Object.values(Status),
    },
    phase: {
      type: String,
    },
    asset: {
      type: String,
    },
    estimatedEnd: {
      type: Date,
      required: true,
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

export default model<Objective & Document>('Objective', ObjectiveSchema);
