interface ProjectProps {
  _id: string;
  projectTypeName: string;
  projects?: {
    _id: string;
    projectTitle: string;
    projectDesc: string;
    projectimages?: string[];
  }[];
}

export default ProjectProps;
