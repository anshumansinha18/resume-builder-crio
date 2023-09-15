import React from 'react';
import { ISkills, ISkillItem } from 'src/stores/skill.interface';
import styled from '@emotion/styled';

const SectionHolder = styled.div`
  padding: 0;
  margin-top: -15px;
`;

function SkillCategory({ title, skills }: { title: string; skills: ISkillItem[] }) {
  return (
    <div className="text-[13px]">
      <strong>{title}: </strong>
      {skills.map((item, i) => (i !== skills.length - 1 ? `${item.name}, ` : `${item.name}`))}
    </div>
  );
}

export default function Skill({ skills }: { skills: ISkills }) {
  return (
    <SectionHolder className="skills-container">
      {skills.practices.length !== 0 && <SkillCategory title="OS" skills={skills.practices} />}
      {skills.languages.length !== 0 && (
        <SkillCategory title="Languages" skills={skills.languages} />
      )}
      {(skills.frameworks.length !== 0 || skills.technologies.length !== 0) && (
        <SkillCategory
          title="Technologies/Frameworks"
          skills={[...skills.frameworks, ...skills.technologies]}
        />
      )}
      {skills.databases.length !== 0 && (
        <SkillCategory title="Database" skills={skills.databases} />
      )}
      {skills.tools.length !== 0 && <SkillCategory title="Tools" skills={skills.tools} />}
    </SectionHolder>
  );
}
