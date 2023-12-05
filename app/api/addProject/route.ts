import connectDB from '@/mongo/connection';
import ProjectType from '@/mongo/models/ProjectsModel';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { plainID, newObj } = await req.json();

  await connectDB();
  const res = await ProjectType.findByIdAndUpdate(
    { _id: plainID },
    {
      $push: {
        projects: newObj,
      },
    }
  );

  //   console.log(res);
  return Response.json(res);
}
