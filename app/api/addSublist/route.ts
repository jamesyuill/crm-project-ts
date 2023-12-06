import connectDB from '@/mongo/connection';
import ProjectType from '@/mongo/models/ProjectsModel';

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { newProjectType } = await req.json();

  await connectDB();
  const res = await ProjectType.create({
    projectTypeName: newProjectType,
  });

  return Response.json(res);
}
