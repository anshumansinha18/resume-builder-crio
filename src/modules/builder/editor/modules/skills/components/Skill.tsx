import { ISkillItem } from 'src/stores/skill.interface';
import AddSkill from './AddSkill';
import SkillPill from '../atoms/SkillPill';
import DragContainer from 'src/helpers/common/components/DragContainer';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

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
  return (
    <>
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
            onClick={() => addItem({ name: skill, level: 0 })}
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
