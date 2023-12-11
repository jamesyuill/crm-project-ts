import connectDB from '@/mongo/connection';
import ProjectType from '@/mongo/models/ProjectsModel';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  const { plainID, cardContents } = await req.json();
  const { _id } = cardContents;
  await connectDB();
  const res = await ProjectType.findByIdAndUpdate(
    { _id: plainID },
    {
      $pull: {
        projects: { _id: _id },
      },
    }
  );

  return Response.json(res);
}
