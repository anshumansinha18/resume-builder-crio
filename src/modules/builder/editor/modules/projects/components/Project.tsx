import React, { ChangeEvent, Fragment, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useProjects } from 'src/stores/projects';
import { IProjectItem } from 'src/stores/projects.interface';
import { RichtextEditor } from 'src/helpers/common/components/richtext';
import { DATE_PICKER_FORMAT } from 'src/helpers/constants';

interface IProjectComp {
  projectInfo: IProjectItem;
  currentIndex: number;
}

const ProjectComp: React.FC<IProjectComp> = ({ projectInfo, currentIndex }) => {
  const onChangeHandler = useCallback(
    (name: string, value: any) => {
      const currentProjectInfo = { ...projectInfo };
      const updateProject = useProjects.getState().updateProject;
      switch (name) {
        case 'title':
          currentProjectInfo.name = value;
          break;
        case 'languages':
          currentProjectInfo.languages = value;
          break;
        case 'demoLink':
          currentProjectInfo.demoLink = value;
          break;
        case 'intro':
          currentProjectInfo.intro = value;
          break;
        case 'description':
          currentProjectInfo.description = value;
          break;
        case 'timeline':
          currentProjectInfo.timeline = value;
          break;
        default:
          break;
      }
      updateProject(currentIndex, currentProjectInfo);
    },
    [currentIndex, projectInfo]
  );

  const onDescriptionChange = useCallback(
    (htmlOutput: string) => {
      onChangeHandler('description', htmlOutput);
    },
    [onChangeHandler]
  );

  return (
    <Fragment>
      <TextField
        label="Project name"
        variant="filled"
        value={projectInfo.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('title', value);
        }}
        autoComplete="off"
        fullWidth
        required
        autoFocus={true}
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Languages/Skills"
        variant="filled"
        value={projectInfo.languages}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('languages', value);
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Demo Link"
        variant="filled"
        value={projectInfo.demoLink}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('demoLink', value);
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Project Intro"
        variant="filled"
        value={projectInfo.intro}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('intro', value);
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <DatePicker
        label="Date"
        value={projectInfo.timeline}
        onChange={(newDate) => {
          onChangeHandler('timeline', newDate);
        }}
        inputFormat={DATE_PICKER_FORMAT}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            autoComplete="off"
            fullWidth
            required
            sx={{ marginBottom: '26px' }}
          />
        )}
      />
      <RichtextEditor
        label="About the Project"
        value={projectInfo.description}
        onChange={onDescriptionChange}
        name="summary"
      />
    </Fragment>
  );
};

export default ProjectComp;
