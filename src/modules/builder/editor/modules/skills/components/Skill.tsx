import { ISkillItem } from 'src/stores/skill.interface';
import AddSkill from './AddSkill';
import SkillPill from '../atoms/SkillPill';
import DragContainer from 'src/helpers/common/components/DragContainer';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const animation = {
  initial: { height: '1px' },
  animate: { height: '100%' },
};

export default function Skill({
  skillList,
  title,
  items,
  addItem,
  removeItem,
  setItems,
  hasLevel,
}: {
  items: ISkillItem[];
  addItem: ({ name, level }: ISkillItem) => void;
  removeItem: (index: number) => void;
  setItems: (name: ISkillItem[]) => void;
  hasLevel: boolean;
}) {
  // useEffect(() => {
  //   skillList[title.toLowerCase()].map((skill) => addItem({ name: skill, level: 0 }));
  // }, [skillList]);
  // console.log(skillList, title);
  const handleAddSkill = (skill: string, title: string) => {
    let addedSkill: string[] | void = [];
    if (title.toLowerCase() === 'languages') {
      addedSkill = useLanguages.getState().get();
    } else if (title.toLowerCase() === 'frameworks') {
      addedSkill = useFrameworks.getState().get();
    } else if (title.toLowerCase() === 'technologies') {
      addedSkill = useTechnologies.getState().get();
    } else if (title.toLowerCase() === 'databases') {
      addedSkill = useDatabases.getState().get();
    } else if (title.toLowerCase() === 'os') {
      addedSkill = usePractices.getState().get();
    } else if (title.toLowerCase() === 'tools') {
      addedSkill = useTools.getState().get();
    }
    const foundSkill = addedSkill.find((obj) => obj.name.toLowerCase() === skill.toLowerCase());
    if (foundSkill) {
      enqueueSnackbar('Skill already Present', { variant: 'warning' });
    } else {
      addItem({ name: skill, level: 0 });
    }
  };
  return (
    <>
      <SnackbarProvider />
      <motion.div
        className="flex flex-col gap-2 mb-8 empty:mb-0"
        initial={animation.initial}
        animate={animation.animate}
      >
        <DragContainer items={items} setItems={setItems}>
          <AnimatePresence>
            {items.map((item, index) => (
              <SkillPill
                key={item.name}
                index={index}
                name={item.name}
                level={item.level}
                onDelete={removeItem}
                showLevel={hasLevel}
              />
            ))}
          </AnimatePresence>
        </DragContainer>
      </motion.div>
      {/* <TrackOption></TrackOption> */}
      <div className="skill-items mb-2 mt-[-5px]">
        {skillList[title.toLowerCase()].map((skill) => (
          <button
            key={skill}
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-normal text-sm hover:text-white py-0 px-1 mb-1 mr-1 border border-blue-300 hover:border-transparent rounded"
            onClick={() => handleAddSkill(skill, title)}
          >
            {skill}
          </button>
        ))}
      </div>
      <AddSkill
        addHandler={addItem}
        items={items}
        hasLevel={hasLevel}
        skillList={skillList}
        title={title}
      />
    </>
  );
}
