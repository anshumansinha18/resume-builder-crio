import React from 'react';
import { ISkills, ISkillItem } from 'src/stores/skill.interface';
import styled from '@emotion/styled';

const SectionHolder = styled.div`
  padding: 0;
  margin-top: -15px;
`;

function SkillCategory({ title, skills }: { title: string; skills: ISkillItem[] }) {
  return (
    <div className="text-[14px]">
      <strong>{title}: </strong>
      {skills.map((item, i) => (i !== skills.length - 1 ? `${item.name}, ` : `${item.name}`))}
    </div>
  );
}

export default function Skill({ skills }: { skills: ISkills }) {
  return (
    <SectionHolder className="skills-container">
      <SkillCategory title="OS" skills={skills.practices} />
      <SkillCategory title="Languages" skills={skills.languages} />
      <SkillCategory
        title="Technologies/Frameworks"
        skills={[...skills.frameworks, ...skills.technologies]}
      />
      <SkillCategory title="Database" skills={skills.databases} />
      <SkillCategory title="Tools" skills={skills.tools} />
    </SectionHolder>
  );
}
