import { useEffect, useState } from 'react';
import { useProjects } from 'src/stores/projects';
import AddProject from './components/AddProject';
import ProjectComponent from './components/Project';
import ProjectOptions from './components/ProjectOptions';
import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';

const ProjectsLayout = () => {
  const allProjects = useProjects((state) => state.projects);
  const removeProject = useProjects.getState().remove;
  const onMoveUp = useProjects.getState().onmoveup;
  const onMoveDown = useProjects.getState().onmovedown;

  const [expanded, setExpanded] = useState<string | false>(false);

  // useEffect(() => {
  //   setExpanded(allProjects[0]?.id);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {allProjects.map((project, index) => (
        <MoveEditSection
          key={project.id}
          title={project.name || 'Project'}
          expanded={expanded === project.id}
          length={allProjects.length}
          index={index}
          clickHandler={() => handleChange(project.id, expanded !== project.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeProject}
        >
          <ProjectComponent projectInfo={project} currentIndex={index} />
        </MoveEditSection>
      ))}

      <ProjectOptions />
      <AddProject handleChange={handleChange} isEmpty={allProjects.length === 0} />
    </div>
  );
};

export default ProjectsLayout;
