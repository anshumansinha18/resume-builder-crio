import React, { ChangeEvent, Fragment, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useMiniProjectsStore } from 'src/stores/miniProjects';
import { IminiProjectsItem } from 'src/stores/miniProjects.interface';
import { SwitchWidget } from 'src/helpers/common/atoms/Switch';
import { RichtextEditor } from 'src/helpers/common/components/richtext';
import { DATE_PICKER_FORMAT } from 'src/helpers/constants';

interface IMiniProjectsProps {
  projectInfo: IminiProjectsItem;
  currentIndex: number;
}

const MiniProjects: React.FC<IMiniProjectsProps> = ({ projectInfo, currentIndex }) => {
  const onChangeHandler = useCallback(
    (name: string, value: any) => {
      const currentExpInfo = { ...projectInfo };
      const updatedMiniProject = useMiniProjectsStore.getState().updatedMiniProject;
      switch (name) {
        case 'name':
          currentExpInfo.name = value;
          break;
        case 'isBuildingNow':
          currentExpInfo.isBuildingNow = value;
          break;
        case 'timeline':
          if (value?.isValid()) {
            currentExpInfo.timeline = value;
          }
          break;
        case 'summary':
          currentExpInfo.summary = value;
          break;
        default:
          break;
      }
      updatedMiniProject(currentIndex, currentExpInfo);
    },
    [currentIndex, projectInfo]
  );

  const onSummaryChange = useCallback(
    (htmlOutput: string) => {
      console.log(htmlOutput);
      onChangeHandler('summary', htmlOutput);
    },
    [onChangeHandler]
  );

  return (
    <Fragment>
      <TextField
        label="Name"
        variant="filled"
        value={projectInfo.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('name', value);
        }}
        autoComplete="off"
        fullWidth
        required
        autoFocus={true}
        sx={{ marginBottom: '26px' }}
      />
      {/* <TextField
        label="Role"
        variant="filled"
        value={projectInfo.position}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('role', value);
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      /> */}
      {/* <DatePicker
        label="Start date"
        value={projectInfo.startDate}
        onChange={(newDate) => {
          onChangeHandler('startDate', newDate);
        }}
        inputFormat={DATE_PICKER_FORMAT}
        renderInput={(params) => (
          <TextField {...params} variant="filled" autoComplete="off" fullWidth required />
        )}
      /> */}
      <SwitchWidget
        label={'I am currently Building it'}
        value={projectInfo.isBuildingNow ?? false}
        onChange={(newValue: boolean) => {
          onChangeHandler('isBuildingNow', newValue);
        }}
      />
      <DatePicker
        label="Timeline"
        value={projectInfo.isBuildingNow ? null : projectInfo.timeline}
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
        disabled={projectInfo.isBuildingNow}
      />
      <RichtextEditor
        label="Add Mini Project Summary"
        value={projectInfo.summary}
        onChange={onSummaryChange}
        name="summary"
      />
    </Fragment>
  );
};

export default MiniProjects;
