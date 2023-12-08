import connectDB from '@/mongo/connection';
import ProjectType from '@/mongo/models/ProjectsModel';
import Project from '@/types/Project';

import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {
  const { plainID, cardContents } = await req.json();

  await connectDB();
  const res = await ProjectType.findByIdAndUpdate(
    { _id: plainID },
    {
      $set: {
        'projects.$[elem].projectTitle': cardContents.projectTitle,
        'projects.$[elem].projectDesc': cardContents.projectDesc,
      },
    },
    { arrayFilters: [{ 'elem._id': cardContents._id }], new: true }
  );

  const updated = res.projects.filter(
    (project: Project) => project._id === cardContents._id
  );

  return Response.json(res);
}
