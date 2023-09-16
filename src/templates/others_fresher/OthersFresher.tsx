import React, { useContext, useEffect } from 'react';

import AboutMe from './components/AboutMe';
import Achievements from './components/Achievements';
import BasicIntro from './components/BasicIntro';
import { Education } from './components/Education';
import Involvement from './components/Involvement';
import { Objective } from './components/Objective';
// import RatedSkills from './components/RatedSkills';
import { Heading } from './components/Heading';
import { SectionValidator } from 'src/helpers/common/components/ValidSectionRenderer';
import { StateContext } from 'src/modules/builder/resume/ResumeLayout';
// import UnratedSkills from './components/UnratedSkills';
import Work from './components/Work';
import styled from '@emotion/styled';
import { Section } from '../tier1_fresher/components/Section';
import Skill from './components/Skill';
import Experience from './components/Experience';
import Project from './components/Project';
import Activities from './components/Activities';

const ResumeContainer = styled.div`
  display: flex;
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
  const involvements = resumeData.activities.involvements;
  const achievements = resumeData.activities.achievements;

  useEffect(() => {
    const containerRect = document.getElementById('height-check')?.getBoundingClientRect();

    const leftSection = document.getElementById('height-check');
    let pageBreakAdded = false;
    Array.from(leftSection?.children).forEach((ele) => {
      if (ele.id) {
        if (!pageBreakAdded) {
          //calculate current section's height relative to resume-layout container.
          console.log(ele.id);
          const elementRect = ele?.getBoundingClientRect();
          const elementHeightRelative = elementRect?.bottom - containerRect?.top;

          //If the section's height is greater than a particular threshold, then push it to second page.

          if (elementHeightRelative > 1051) {
            //handle edge case of education and project.
            //As education and project sections have multiple fields, don't send entire project/education section to next page if it exceeds the threshold.
            //Send a particular sub-section to the next page.
            if (ele.id === 'education' || ele.id === 'projects' || ele.id === 'mini-projects') {
              Array.from(ele.children[1].children).forEach((section, index) => {
                const subSectionRect = section.getBoundingClientRect();
                const relativeSubSectionHeight = subSectionRect.bottom - containerRect?.top;

                if (!pageBreakAdded) {
                  //handling edge case: If first sub-section of education/project is exceeding the threshold, then push entire section to next page.
                  if (relativeSubSectionHeight > 1051 && index > 0) {
                    pageBreakAdded = true;
                    section.style.cssText = 'break-before: page; margin-top: 40px';
                  } else if (relativeSubSectionHeight > 1051) {
                    pageBreakAdded = true;
                    ele.style.cssText = 'break-before: page; margin-top: 40px';
                  }
                }
              });
            } else {
              ele.style.cssText = 'break-before: page; margin-top: 40px';
              pageBreakAdded = true;
            }
          }
        }
      }
    });
  }, []);

  return (
    <ResumeContainer>
      <LeftSection id="height-check">
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

        <Section id="projects" title="Projects" titleClassname="text-lg">
          <Project projects={resumeData.projects} />
        </Section>

        <Section id="education" title="Education" titleClassname="text-lg">
          <Education education={resumeData.education} />
        </Section>

        {/* <Section title="Experience" titleClassname="text-lg">
          <Experience work={resumeData.work} />
        </Section> */}
        {involvements !== '' && (
          <Section id="clubs-activities" title="Clubs & Activities" titleClassname="text-lg">
            <Activities activities={involvements} />
          </Section>
        )}

        {achievements !== '' && (
          <Section id="achievements" title="Achievements" titleClassname="text-lg">
            <Activities activities={achievements} />
          </Section>
        )}
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
