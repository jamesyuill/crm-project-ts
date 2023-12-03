import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  projectTypeName: { type: String, required: true },
  projects: {
    projectTitle: { type: String, required: true },
    projectDesc: { type: String, required: true },
    projectImages: [],
  },
});

const ProjectType =
  mongoose.models.ProjectType || mongoose.model('ProjectType', schema);

export default ProjectType;
