import React from 'react';
import styled from '@emotion/styled';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';

const SectionHolder = styled.div`
  color: black;
  margin-top: -10px;

  a {
    text-decoration: underline;
  }
`;
export default function MiniProject({ miniProjects }) {
  function formatDate(inputDateStr) {
    if (!inputDateStr) return 'Ongoing';
    const inputDate = new Date(inputDateStr);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const month = months[inputDate.getMonth()];
    const year = inputDate.getFullYear();

    return `${month} ${year}`;
  }
  return (
    <SectionHolder>
      {miniProjects.map((project) => (
        <div key={project.id} className="">
          <div className="flex justify-between items-center">
            <div className="font-bold">{project.name}</div>
            <div className="font-bold text-xs">{formatDate(project.timeline)}</div>
          </div>
          <HTMLRenderer htmlString={project.summary}></HTMLRenderer>
        </div>
      ))}
    </SectionHolder>
  );
}
