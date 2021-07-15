// @flow
import * as React from "react";
import { Project } from "../../types";
import ProjectProgressCard from "./ProjectProgressCard";
import ProjectIDCard from "./ProjectIDCard";
import ProjectContactCard from "./ProjectContactCard";

type Props = {
  project: Project;
};
const ProjectDetailsInfoStep = (props: Props) => {
  const { project } = props;
  return (
    <>
      <ProjectProgressCard {...project} />
      <ProjectIDCard {...project} />
      <ProjectContactCard {...project} />
    </>
  );
};

export default ProjectDetailsInfoStep;