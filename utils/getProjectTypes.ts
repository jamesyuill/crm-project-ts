import connectDB from '@/mongo/connection';
import ProjectType from '@/mongo/models/ProjectsModel';

const getProjectTypes = async () => {
  try {
    await connectDB();
    const res = await ProjectType.find({});

    return res;
  } catch (error) {}
};

export default getProjectTypes;
