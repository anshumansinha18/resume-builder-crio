import { useMemo } from 'react';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { useMiniProjectsStore } from 'src/stores/miniProjects';
import { IminiProjectsItem } from 'src/stores/miniProjects.interface';

const NEW_MINI_PROJECT: IminiProjectsItem = {
  name: '',
  isBuildingNow: false,
  timeline: null,
  summary: '',
  id: '',
  url: '',
};

const AddMiniProject = ({
  handleChange,
  isEmpty,
}: {
  handleChange: (name: string, isExpanded: boolean) => void;
  isEmpty: boolean;
}) => {
  const addNewMiniProject = useMiniProjectsStore((state) => state.add);

  const onCreateMiniProject = () => {
    const uniqueExpandedId = `${Math.random()}`;
    NEW_MINI_PROJECT.id = uniqueExpandedId;
    addNewMiniProject(NEW_MINI_PROJECT);
    handleChange(uniqueExpandedId, true);
  };

  const buttonCaption = useMemo(() => {
    if (isEmpty) {
      return '+ Add a Mini Project';
    } else {
      return '+ Add more';
    }
  }, [isEmpty]);

  return (
    <div className="flex gap-2 mt-3">
      <OutlinedButton onClick={onCreateMiniProject} disabled={false}>
        {buttonCaption}
      </OutlinedButton>
    </div>
  );
};

export default AddMiniProject;
