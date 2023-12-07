import connectDB from '@/mongo/connection';
import ProjectType from '@/mongo/models/ProjectsModel';
import mongoose from 'mongoose';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { plainID, newObj } = await req.json();
  const projectWithId = {
    ...newObj,
    _id: new mongoose.mongo.ObjectId(),
  };

  await connectDB();
  const res = await ProjectType.findByIdAndUpdate(
    { _id: plainID },
    {
      $push: {
        projects: projectWithId,
      },
    },
    { new: true }
  );
  const newProject = res.projects[res.projects.length - 1];

  return Response.json(newProject);
}
