import React, { useState, useEffect } from 'react';
import { projectOptions, trackOptions } from 'src/helpers/constants/project-data';
import { useProjects } from 'src/stores/projects';
import styled from '@emotion/styled';
import { IProjectItem } from 'src/stores/projects.interface';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import useTrackStore from 'src/stores/track';

const SectionHolder = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  .track-btn {
    border: 1px solid blue;
    box-sizing: border-box;
    padding: 0px 15px;
    border-radius: 3px;
  }

  .selected {
    background-color: #0220a7;
    color: white;
  }
`;

const ProjectOptions: React.FC = () => {
  const addProjectToStore = useProjects((state) => state.add);
  const [visibleButtons, setVisibleButtons] = useState<number>(0);
  const [selectedTrack, setSelectedTrack] = useState<string>(useTrackStore.getState().track);
  const filteredProjects = projectOptions.filter((project) => project.track === selectedTrack);

  useEffect(() => {
    if (selectedTrack === '') return;

    const timer = setTimeout(() => {
      if (visibleButtons < filteredProjects.length) {
        setVisibleButtons((prev) => prev + 1);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [visibleButtons, selectedTrack, filteredProjects]);

  const handleTrackSelection = (e, selectedTrack: string) => {
    const ans = confirm(
      `You have selected ${useTrackStore
        .getState()
        .track.toUpperCase()} in the Skills Section. Are you sure you want to change the track?`
    );

    if (ans) setSelectedTrack((prevTrack) => (prevTrack === selectedTrack ? '' : selectedTrack));
  };

  const handleAddProjectOption = (project) => {
    const addedProjects = useProjects.getState().projects;
    const foundProject = addedProjects.find((proj) => proj.id === project.id);
    if (!foundProject) addProjectToStore(project);
    else enqueueSnackbar('Project Already Added!', { variant: 'warning' });
  };

  return (
    <div>
      <SnackbarProvider />
      <SectionHolder>
        <span className="text-md font-semibold">Tracks:</span>
        {trackOptions.map((track) => (
          <button
            key={track}
            className={`track-btn ${selectedTrack === track ? 'selected' : ''}`}
            onClick={(e) => handleTrackSelection(e, track)}
          >
            {track.toUpperCase()}
          </button>
        ))}
      </SectionHolder>
      {selectedTrack !== '' ? (
        <>
          <span className="mr-2 text-md font-semibold">Project Options:</span>
          {filteredProjects.map((project, index) => (
            <button
              key={project.id}
              style={{
                opacity: index < visibleButtons ? 1 : 0,
                transition: 'opacity 0.2s ease',
              }}
              className="bg-transparent hover:bg-gray-500 text-gray-900 font-normal text-sm hover:text-white py-0 px-2 mb-1 mr-2 border border-blue-400 hover:border-transparent rounded"
              onClick={() => handleAddProjectOption(project)}
            >
              {project.name}
            </button>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default ProjectOptions;
