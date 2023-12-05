import connectDB from '@/mongo/connection';
import ProjectType from '@/mongo/models/ProjectsModel';
import Project from '@/types/Project';

const addProject = async (params: Project) => {
  try {
    await connectDB();
    await ProjectType.create(params);
  } catch (error) {
    console.log('there was a problem in addProject');
  }
};

export default addProject;
