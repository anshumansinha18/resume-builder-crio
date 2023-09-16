import React from 'react';
import Color from 'color';
import { IExperienceItem } from 'src/stores/experience.interface';
import styled from '@emotion/styled';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';

const SectionHolder = styled.div`
  color: black;
  margin-top: -12px;

  // .experience-title {
  //   color: ${(props) => Color(props.theme.titleColor).toString()};
  // }

  // .experience-date {
  //   color: ${(props) => Color(props.theme.titleColor).toString()};
  // }
`;

export default function Experience({ work }: { work: IExperienceItem[] }) {
  return (
    <SectionHolder className="experience-container">
      {work.map((workItem) => (
        <div key={workItem.id}>
          <div className="experience-header flex justify-between items-center">
            <div className="experience-title font-bold text-md">{workItem.name}</div>
            <div className="experience-date  text-xs font-bold">
              [{workItem.startDate} - {workItem.endDate ? workItem.endDate : `Present`}]
            </div>
          </div>
          <HTMLRenderer htmlString={workItem.summary}></HTMLRenderer>
        </div>
      ))}
    </SectionHolder>
  );
}
