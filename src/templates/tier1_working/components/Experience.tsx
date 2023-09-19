import React from 'react';
import Color from 'color';
import { IExperienceItem } from 'src/stores/experience.interface';
import styled from '@emotion/styled';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';
import { dateParser } from 'src/helpers/utils';

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
        <>
          <div className="experience-header flex justify-between items-center">
            <div key={workItem.id} className="experience-title font-bold text-md">
              {workItem.name}
            </div>
            <div className="experience-date  text-xs font-bold">
              {dateParser(workItem.startDate)} -{' '}
              {workItem.isWorkingHere ? 'Present' : dateParser(workItem.endDate)}
            </div>
          </div>
          <HTMLRenderer htmlString={workItem.summary}></HTMLRenderer>
        </>
      ))}
    </SectionHolder>
  );
}
