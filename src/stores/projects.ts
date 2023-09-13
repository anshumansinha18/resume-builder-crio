/* eslint-disable prettier/prettier */
import create, { SetState, GetState } from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import resumeData from 'src/helpers/constants/resume-data.json';
import { IProjectItem, IProjectStore } from './projects.interface';

const addProject =
  (set: SetState<IProjectStore>) =>
  ({
    name,
    languages,
    demoLink,
    timeline,
    intro,
    description,
    id,
  }: IProjectItem) =>
    set(
      produce((state: IProjectStore) => {
        state.projects.push({
          id,
          name,
          languages,
          demoLink,
          timeline,
          intro,
          description,
        });
      })
    );

const removeProject = (set: SetState<IProjectStore>) => (index: number) =>
  set((state) => ({
    projects: state.projects.slice(0, index).concat(state.projects.slice(index + 1)),
  }));

const setProject = (set: SetState<IProjectStore>) => (values: IProjectItem[]) => {
  set({
    projects: values,
  });
};

const updateProject =
  (set: SetState<IProjectStore>) => (index: number, updatedInfo: IProjectItem) => {
    set(
      produce((state: IProjectStore) => {
        state.projects[index] = updatedInfo;
      })
    );
  };

const getProject = (get: GetState<IProjectStore>) => (index: number) => {
  return get().projects[index];
};

const onMoveUp = (set: SetState<IProjectStore>) => (index: number) => {
  set(
    produce((state: IProjectStore) => {
      if (index > 0) {
        //swapping
        const currentProject = state.projects[index];
        state.projects[index] = state.projects[index - 1];
        state.projects[index - 1] = currentProject;
      }
    })
  );
};

const onMoveDown = (set: SetState<IProjectStore>) => (index: number) => {
  set(
    produce((state: IProjectStore) => {
      const totalProject = state.projects.length;
      if (index < totalProject - 1) {
        const currentProject = state.projects[index];
        state.projects[index] = state.projects[index + 1];
        state.projects[index + 1] = currentProject;
      }
    })
  );
};

export const useProjects = create<IProjectStore>(
  persist(
    (set, get) => ({
      projects: resumeData.projects,
      add: addProject(set),
      get: getProject(get),
      remove: removeProject(set),
      reset: setProject(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updateProject: updateProject(set),
    }),
    { name: 'projects' }
  )
);
