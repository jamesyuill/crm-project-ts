import connectDB from '@/mongo/connection';
import ProjectType from '@/mongo/models/ProjectsModel';

import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  const { plainID } = await req.json();

  await connectDB();
  const res = await ProjectType.findByIdAndDelete({
    _id: plainID,
  });

  return Response.json(res);
}
