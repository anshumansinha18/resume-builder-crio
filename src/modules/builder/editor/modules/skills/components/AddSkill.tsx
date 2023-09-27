import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import SliderValue from '../atoms/SliderValue';
import { OutlinedButton, TextButton } from 'src/helpers/common/atoms/Buttons';
import { ISkillItem } from 'src/stores/skill.interface';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';

const AddSkill = ({
  title,
  skillList,
  addHandler,
  items,
  hasLevel = false,
}: {
  addHandler: ({ name, level }: ISkillItem) => void;
  items: ISkillItem[];
  hasLevel: boolean;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState('');
  const inputRef = useRef<HTMLInputElement>();

  const toggleForm = () => {
    setShowForm(!showForm);
    setName('');
  };

  const addAll = () => {
    skillList[title.toLowerCase()].map((skill: string) => {
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
      if (!foundSkill) addHandler({ name: skill, level: 0 });
    });
  };
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrorText('');
  };

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    doneHandler();
  };

  const doneHandler = () => {
    const trimmedText = name.trim();
    const trimmedLowerText = trimmedText.toLowerCase();

    if (items.find((item) => item.name.toLowerCase() === trimmedLowerText)) {
      setErrorText('Duplicate entry');
    } else {
      setName('');
      setErrorText('');
      addHandler({ name: trimmedText, level });
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (name.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name]);

  const formEl = (
    <form onSubmit={submitHandler}>
      <TextField
        label="Skill"
        variant="filled"
        value={name}
        error={!!errorText}
        helperText={errorText}
        onChange={changeHandler}
        autoComplete="off"
        inputRef={inputRef}
        fullWidth
        required
        autoFocus
      />
      {hasLevel && <SliderValue level={level} setLevel={setLevel} />}
      <div className="flex gap-2 mt-3">
        <OutlinedButton onClick={doneHandler} disabled={disabled}>
          Add
        </OutlinedButton>
        <TextButton onClick={toggleForm}>Cancel</TextButton>
      </div>
    </form>
  );

  return showForm ? (
    formEl
  ) : (
    <>
      <OutlinedButton onClick={toggleForm}>+ Add more</OutlinedButton>
      <OutlinedButton onClick={addAll}>+ Add All</OutlinedButton>
    </>
  );
};

export default AddSkill;
