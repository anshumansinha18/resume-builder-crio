import React, { useContext } from 'react';

import AboutMe from './components/AboutMe';
import Achievements from './components/Achievements';
import BasicIntro from './components/BasicIntro';
import { Education } from './components/Education';
import Involvement from './components/Involvement';
import { Objective } from './components/Objective';
import RatedSkills from './components/RatedSkills';
import { Heading } from './components/Heading';
import { SectionValidator } from 'src/helpers/common/components/ValidSectionRenderer';
import { StateContext } from 'src/modules/builder/resume/ResumeLayout';
import UnratedSkills from './components/UnratedSkills';
import Work from './components/Work';
import styled from '@emotion/styled';
import { Section } from '../tier1_fresher/components/Section';
import Skill from './components/Skill';
import Experience from './components/Experience';

const ResumeContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 40px 50px;
  column-gap: 10px;

  @media print {
    border: none;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
`;

// const RightSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-basis: 34%;

//   height: 100%;
//   font-size: 12px;
// `;

export default function ProfessionalTemplate() {
  const resumeData = useContext(StateContext);
  const skills = resumeData.skills;
  // const involvements = resumeData.activities.involvements;
  // const achievements = resumeData.activities.achievements;

  return (
    <ResumeContainer>
      <LeftSection>
        <Heading
          title={resumeData.basics?.name}
          profiles={resumeData.basics.profiles}
          titleClassname="text-3xl font-bold"
        >
          <BasicIntro basics={resumeData.basics} profiles={resumeData.basics.profiles} />
        </Heading>

        <Section title="Skills" titleClassname="text-lg">
          <Skill skills={skills} />
        </Section>

        <Section title="Experience" titleClassname="text-lg">
          <Experience work={resumeData.work} />
        </Section>

        <Section title="Education" titleClassname="text-lg">
          <Education education={resumeData.education} />
        </Section>
      </LeftSection>

      {/* <RightSection>
        <SectionValidator value={resumeData.basics.summary}>
          <Section title="Summary">
            <AboutMe summary={resumeData.basics.summary} profileImage={resumeData.basics.image} />
          </Section>
        </SectionValidator>

        <SectionValidator value={resumeData.basics.objective}>
          <Section title="Career Objective">
            <Objective objective={resumeData.basics.objective} />
          </Section>
        </SectionValidator>

        <SectionValidator value={skills.languages.concat(skills.frameworks)}>
          <Section title="Technical expertise">
            <RatedSkills items={skills.languages.concat(skills.frameworks)} />
          </Section>
        </SectionValidator>

        <SectionValidator value={skills.technologies.concat(skills.libraries, skills.databases)}>
          <Section title="Skills / Exposure">
            <UnratedSkills items={skills.technologies.concat(skills.libraries, skills.databases)} />
          </Section>
        </SectionValidator>
        <SectionValidator value={skills.practices}>
          <Section title="Methodology/Approach">
            <UnratedSkills items={skills.practices} />
          </Section>
        </SectionValidator>
        <SectionValidator value={skills.tools}>
          <Section title="Tools">
            <UnratedSkills items={skills.tools} />
          </Section>
        </SectionValidator>
        <SectionValidator value={resumeData.education}>
          <Section title="Education">
            <Education education={resumeData.education} />
          </Section>
        </SectionValidator>
      </RightSection> */}
    </ResumeContainer>
  );
}
