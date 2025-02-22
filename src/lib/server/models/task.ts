import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@index({ user: 1, project: 1 })
export class Task {
  _id!: Types.ObjectId;

  @prop({ required: true })
  user!: Types.ObjectId;

  @prop({ required: true })
  project!: Types.ObjectId;

  @prop()
  pr_urls!: string[];
}

export const TaskModel = getModelForClass(Task);
