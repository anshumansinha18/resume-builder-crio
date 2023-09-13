export interface ISkillItem {
  name: string;
  level: number;
}

export interface ISkillState {
  title: string;
  hasLevel: boolean;
  values: ISkillItem[];
  isEnabled: boolean;

  add: ({ name, level }: { name: string; level: number }) => void;
  remove: (index: number) => void;
  get: () => void;
  reset: (name: ISkillItem[]) => void;
  setIsEnabled: (enabled: boolean) => void;
}

export interface ISkills {
  languages: {
    name: string;
    level: number;
  }[];
  frameworks: {
    name: string;
    level: number;
  }[];
  technologies: {
    name: string;
    level: number;
  }[];
  libraries: {
    name: string;
    level: number;
  }[];
  databases: {
    name: string;
    level: number;
  }[];
  practices: {
    name: string;
    level: number;
  }[];
  tools: {
    name: string;
    level: number;
  }[];
}
