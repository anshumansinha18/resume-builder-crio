export interface IProjectItem {
  id: string;
  name: string;
  languages: string;
  demoLink: string;
  timeline: string | null;
  intro: string;
  description: string;
}

export interface IProjectStore {
  projects: IProjectItem[];
  add: (newProject: IProjectItem) => void;
  get: (index: number) => void;
  remove: (index: number) => void;
  reset: (values: IProjectItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
  updateProject: (index: number, updatedInfo: IProjectItem) => void;
}
