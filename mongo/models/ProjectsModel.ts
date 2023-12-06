import mongoose, { Schema, SchemaTypes, models } from 'mongoose';

const schema = new Schema({
  projectTypeName: { type: String, required: true },
  projects: {
    _id: { type: Schema.Types.ObjectId, required: true },
    projectTitle: { type: String, required: true },
    projectDesc: { type: String, required: true },
    projectImages: [],
  },
});

const ProjectType =
  mongoose.models.ProjectType || mongoose.model('ProjectType', schema);

export default ProjectType;
