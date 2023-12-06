import mongoose, { Schema, SchemaTypes, models } from 'mongoose';

const schema = new Schema({
  projectTypeName: { type: String, required: true },
  projects: [
    {
      projectTitle: { type: String },
      projectDesc: { type: String },
      projectImages: { type: Array, default: [] },
    },
  ],
});

const ProjectType =
  mongoose.models.ProjectType || mongoose.model('ProjectType', schema);

export default ProjectType;
