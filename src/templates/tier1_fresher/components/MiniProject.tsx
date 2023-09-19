import React from 'react';
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
export default function MiniProject({ miniProjects }) {
  return (
    <SectionHolder>
      {miniProjects.map((project) => (
        <div key={project.id} className="">
          <div className="flex justify-between items-center">
            <div className="font-bold">{project.name}</div>
            <div className="font-bold text-xs">{dateParser(project.timeline)}</div>
          </div>
          <HTMLRenderer htmlString={project.summary}></HTMLRenderer>
        </div>
      ))}
    </SectionHolder>
  );
}
