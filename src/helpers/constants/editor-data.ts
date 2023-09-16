import BasicLayout from 'src/modules/builder/editor/modules/basic/BasicLayout';
import SkillsLayout from 'src/modules/builder/editor/modules/skills/SkillsLayout';
import EducationLayout from 'src/modules/builder/editor/modules/education/EducationLayout';
import ExperienceLayout from 'src/modules/builder/editor/modules/experience/ExperienceLayout';
import ActivitiesLayout from 'src/modules/builder/editor/modules/activities/ActivitiesLayout';
import VolunteeringLayout from 'src/modules/builder/editor/modules/volunteering/VolunteeringLayout';
import MiniProjectLayout from 'src/modules/builder/editor/modules/mini-projects/MiniProjectsLayout';
import AwardsLayout from 'src/modules/builder/editor/modules/awards/AwardsLayout';
import ProjectsLayout from 'src/modules/builder/editor/modules/projects/ProjectsLayout';

export const headers: {
  [key: string]: { title: string; component: () => JSX.Element };
} = {
  'basic-details': { title: 'Basic details', component: BasicLayout },
  'skills-and-expertise': {
    title: 'Skills and expertise',
    component: SkillsLayout,
  },
  education: { title: 'Education', component: EducationLayout },
  experience: { title: 'Experience', component: ExperienceLayout },
  activities: { title: 'Activities & Achievements', component: ActivitiesLayout },
  // volunteering: { title: 'Volunteering', component: VolunteeringLayout },
  projects: { title: 'Projects', component: ProjectsLayout },
  miniProjects: { title: 'Mini Projects', component: MiniProjectLayout },
};
