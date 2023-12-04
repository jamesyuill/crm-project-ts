type ProjectProps = {
  _id: string;
  projectTypeName: string;
  projects: {
    projectTitle: string;
    projectDesc: string;
    projectimages?: string[];
  }[];
};

export default ProjectProps;
