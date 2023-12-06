import connectDB from '@/mongo/connection';
import ProjectType from '@/mongo/models/ProjectsModel';

export async function GET() {
  await connectDB();
  const res = await ProjectType.find({});

  return Response.json(res);
}
