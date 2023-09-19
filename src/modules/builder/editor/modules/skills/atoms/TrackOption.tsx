import React from 'react';
import styled from '@emotion/styled';
import { blue } from '@mui/material/colors';
import { resetResumeSkill } from 'src/stores/useResumeStore';
import useTrackStore from 'src/stores/track';

const SectionHolder = styled.div`
  display: flex;
  gap: 30px;

  .track-btn {
    border: 1px solid blue;
    box-sizing: border-box;
    padding: 5px 25px;
    border-radius: 3px;
  }

  .selected {
    background-color: #0220a7;
    color: white;
  }
`;

export default function TrackOption({ selectedTrack, setSelectedTrack, skillState, skillList }) {
  const setTrack = useTrackStore((state) => state.setTrack);
  const handleClick = (track) => {
    setSelectedTrack(track);
    setTrack(track);
    resetResumeSkill();
  };
  return (
    <SectionHolder>
      <button
        className={`track-btn ${selectedTrack === 'fdt' ? 'selected' : ''}`}
        onClick={() => handleClick('fdt')}
      >
        FDT
      </button>
      <button
        className={`track-btn ${selectedTrack === 'bdt' ? 'selected' : ''}`}
        onClick={() => handleClick('bdt')}
      >
        BDT
      </button>
      <button
        className={`track-btn ${selectedTrack === 'qa' ? 'selected' : ''}`}
        onClick={() => handleClick('qa')}
      >
        QA
      </button>
    </SectionHolder>
  );
}
