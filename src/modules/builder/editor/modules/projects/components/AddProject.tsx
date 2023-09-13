import { useMemo } from 'react';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { useProjects } from 'src/stores/projects';
import { IProjectItem } from 'src/stores/projects.interface';

const NEW_PROJECT: IProjectItem = {
  name: '',
  languages: '',
  demoLink: '',
  timeline: null,
  intro: '',
  description: '',
  id: '',
};

const AddProject = ({
  handleChange,
  isEmpty,
}: {
  handleChange: (name: string, isExpanded: boolean) => void;
  isEmpty: boolean;
}) => {
  const addProjectToStore = useProjects((state) => state.add);

  const onCreateProject = () => {
    const uniqueExpandedId = `${Math.random()}`;
    NEW_PROJECT.id = uniqueExpandedId;
    addProjectToStore(NEW_PROJECT);
    handleChange(uniqueExpandedId, true);
  };

  const buttonCaption = useMemo(() => {
    if (isEmpty) {
      return '+ Add a Project';
    } else {
      return '+ Add more';
    }
  }, [isEmpty]);

  return (
    <div className="flex gap-2 mt-3">
      <OutlinedButton onClick={onCreateProject} disabled={false}>
        {buttonCaption}
      </OutlinedButton>
    </div>
  );
};

export default AddProject;
