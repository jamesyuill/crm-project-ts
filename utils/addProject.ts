import connectDB from '@/mongo/connection';
import ProjectType from '@/mongo/models/ProjectsModel';

const addProject = async () => {
  let newDoc = {
    projectTypeName: 'House',
    projects: [
      {
        projectTitle: 'clean',
        projectDesc: 'clean up house',
        projectImages: ['someimage', 'someimage2'],
      },
    ],
  };

  try {
    await connectDB();
    await ProjectType.create(newDoc);
  } catch (error) {
    console.log('there was a problem in addProject');
  }
};

addProject();
export default addProject;
