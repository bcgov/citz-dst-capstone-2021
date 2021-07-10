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
