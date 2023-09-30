import { useState } from 'react';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';
import EditSectionContainer from 'src/helpers/common/components/EditSectionContainer';
import Skill from './components/Skill';
import TrackOption from './atoms/TrackOption';
import { useEffect } from 'react';
import useTrackStore from 'src/stores/track';

const fdtSkills = {
  languages: ['JavaScript', 'HTML', 'CSS'],
  frameworks: ['React.js', 'Bootstrap', 'JQuery'],
  databases: [],
  os: ['Linux'],
  technologies: ['REST API', 'Flexbox', 'Heroku', 'Netlify', 'Figma'],
  tools: ['Git', 'Postman', 'Chrome Developer Tools', 'Figma'],
};
const bdtSkills = {
  languages: ['Core Java', 'C++'],
  frameworks: ['Spring Boot', 'Spring Data', 'Mockito'],
  os: ['Linux'],
  databases: ['MongoDB'],
  technologies: ['REST', 'Redis', 'JUnit', 'Jackson'],
  tools: ['Git', 'Postman', 'Chrome Developer Tools', 'Figma'],
};
const qaSkills = {
  languages: ['Core Java', 'Basics of HTML'],
  frameworks: [
    'WebDriver',
    'TestNG',
    'Page Object Model',
    'Extent Report',
    'Cucumber',
    'Grid',
    'WebDriver Manager',
  ],
  os: ['Linux', 'Windows'],
  databases: ['MySQL'],
  technologies: [
    'Selenium',
    'Apache POI',
    'Apache Log4J',
    'Netlify',
    'XPath',
    'Regular Expression',
  ],
  tools: ['Git', 'Postman', 'Chrome Developer Tools', 'Figma'],
};

const SkillsLayout = () => {
  const skillState = [
    useLanguages(),
    useFrameworks(),
    useTechnologies(),
    // useLibraries(),
    useDatabases(),
    usePractices(),
    useTools(),
  ];
  console.log(skillState);
  const [selectedTrack, setSelectedTrack] = useState(useTrackStore.getState().track);

  const [expanded, setExpanded] = useState<string | false>('Languages');

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      <TrackOption
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
        skillState={skillState}
        skillList={
          selectedTrack === 'fdt' ? fdtSkills : selectedTrack === 'bdt' ? bdtSkills : qaSkills
        }
      />
      {skillState.map((state) => (
        <EditSectionContainer
          key={state.title}
          title={state.title}
          expanded={expanded === state.title}
          isEnabled={state.isEnabled}
          setIsEnabled={state.setIsEnabled}
          clickHandler={() => handleChange(state.title, expanded !== state.title)}
        >
          <Skill
            skillList={
              selectedTrack === 'fdt' ? fdtSkills : selectedTrack === 'bdt' ? bdtSkills : qaSkills
            }
            title={state.title}
            items={state.values}
            addItem={state.add}
            removeItem={state.remove}
            setItems={state.reset}
            hasLevel={state.hasLevel}
          />
        </EditSectionContainer>
      ))}
    </div>
  );
};

export default SkillsLayout;
