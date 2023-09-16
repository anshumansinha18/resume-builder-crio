import { useEffect, useState } from 'react';
import { useMiniProjectsStore } from 'src/stores/miniProjects';
import AddMiniProject from './components/AddMiniProject';
import MiniProject from './components/MiniProject';

import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';

const MiniProjectLayout = () => {
  const allMiniProjects = useMiniProjectsStore((state) => state.miniProjects);
  const removeProject = useMiniProjectsStore.getState().remove;
  const onMoveUp = useMiniProjectsStore.getState().onmoveup;
  const onMoveDown = useMiniProjectsStore.getState().onmovedown;

  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    setExpanded(allMiniProjects[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {allMiniProjects.map((projectInfo, index) => (
        <MoveEditSection
          key={projectInfo.id}
          title={projectInfo.name || 'Mini Project'}
          expanded={expanded === projectInfo.id}
          length={allMiniProjects.length}
          index={index}
          clickHandler={() => handleChange(projectInfo.id, expanded !== projectInfo.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeProject}
        >
          <MiniProject projectInfo={projectInfo} currentIndex={index} />
        </MoveEditSection>
      ))}
      <AddMiniProject handleChange={handleChange} isEmpty={allMiniProjects.length === 0} />
    </div>
  );
};

export default MiniProjectLayout;
