import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@index({ user: 1 })
export class Project {
  _id!: Types.ObjectId;

  @prop({ required: true })
  user!: Types.ObjectId;

  @prop({ required: true })
  name!: string;

  //-- store the project conventions
  @prop({})
  memory?: string[];
}

export const ProjectModel = getModelForClass(Project);
