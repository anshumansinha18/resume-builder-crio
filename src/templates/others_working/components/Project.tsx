import React from 'react';
import Color from 'color';
import { IProjectItem } from 'src/stores/projects.interface';
import styled from '@emotion/styled';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';
import { dateParser } from 'src/helpers/utils';

const SectionHolder = styled.div`
  color: black;
  margin-top: -10px;

  a {
    text-decoration: underline;
  }
`;

export default function Project({ projects }: { projects: IProjectItem[] }) {
  return (
    <SectionHolder className="project-container">
      {projects.map((project) => (
        <div key={project.id}>
          <div className="experience-header flex justify-between gap-1">
            <div className="project-title font-bold text-md">
              {project.name} |{' '}
              <span className="text-[14px] font-normal italic">{project.languages}</span>
            </div>
            <div className="flex gap-1 text-xs items-center min-w-[120.65px]">
              {project.demoLink !== '' && (
                <a
                  href={project.demoLink}
                  rel="noopener noreferrer"
                  className="font-bold min-w-[62px]"
                  target="_blank"
                >
                  Demo Link
                </a>
              )}

              <div className="project-date text-xs font-bold w-full text-right">
                {dateParser(project.timeline)}
              </div>
            </div>
          </div>
          <div className="text-[13px]">{project.intro}</div>
          <HTMLRenderer htmlString={project.description}></HTMLRenderer>
        </div>
      ))}
    </SectionHolder>
  );
}
