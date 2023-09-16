import React from 'react';
import Color from 'color';
import { IProjectItem } from 'src/stores/projects.interface';
import styled from '@emotion/styled';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';

const SectionHolder = styled.div`
  color: black;
  margin-top: -10px;

  a {
    text-decoration: underline;
  }
`;

export default function Project({ projects }: { projects: IProjectItem[] }) {
  function formatDate(inputDateStr) {
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
    <SectionHolder className="project-container">
      {projects.map((project) => (
        <div key={project.id}>
          <div className="experience-header flex justify-between">
            <div key={project.id} className="project-title font-bold text-md">
              {project.name} |{' '}
              <span className="text-[14px] font-normal italic">{project.languages}</span>
            </div>
            <div className="flex gap-2 text-xs items-center">
              <a
                href={project.demoLink}
                rel="noopener noreferrer"
                className="font-bold"
                target="_blank"
              >
                Demo Link
              </a>
              <div className="project-date  text-xs font-bold">{formatDate(project.timeline)}</div>
            </div>
          </div>
          <div className="text-[13px]">{project.intro}</div>
          <HTMLRenderer htmlString={project.description}></HTMLRenderer>
        </div>
      ))}
    </SectionHolder>
  );
}
