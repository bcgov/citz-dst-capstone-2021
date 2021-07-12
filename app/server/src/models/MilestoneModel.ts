import { Document, model, Schema } from 'mongoose';
import { Milestone, MilestoneStatus } from '@interfaces/report.interface';

export const MilestoneSchema: Schema<Milestone> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: MilestoneStatus.Green,
      enum: Object.values(MilestoneStatus),
    },
    start: {
      type: Date,
      required: true,
    },
    estimatedEnd: {
      type: Date,
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

export default model<Milestone & Document>('Milestone', MilestoneSchema);
