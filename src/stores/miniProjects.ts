import create, { SetState, GetState } from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import resumeData from 'src/helpers/constants/resume-data.json';
import { IminiProjectsItem, IminiProjectsStore } from './miniProjects.interface';

const addMiniProject =
  (set: SetState<IminiProjectsStore>) =>
  ({ name, isBuildingNow, timeline, summary, id, url = '' }: IminiProjectsItem) =>
    set(
      produce((state: IminiProjectsStore) => {
        state.miniProjects.push({
          id,
          name,
          isBuildingNow,
          timeline,
          summary,
          url,
        });
      })
    );

const removeMiniProject = (set: SetState<IminiProjectsStore>) => (index: number) =>
  set((state) => ({
    miniProjects: state.miniProjects.slice(0, index).concat(state.miniProjects.slice(index + 1)),
  }));

const setMiniProject = (set: SetState<IminiProjectsStore>) => (values: IminiProjectsItem[]) => {
  set({
    miniProjects: values,
  });
};

const updatedMiniProject =
  (set: SetState<IminiProjectsStore>) => (index: number, updatedInfo: IminiProjectsItem) => {
    set(
      produce((state: IminiProjectsStore) => {
        state.miniProjects[index] = updatedInfo;
      })
    );
  };

const getMiniProject = (get: GetState<IminiProjectsStore>) => (index: number) => {
  return get().miniProjects[index];
};

const onMoveUp = (set: SetState<IminiProjectsStore>) => (index: number) => {
  set(
    produce((state: IminiProjectsStore) => {
      if (index > 0) {
        const currentExperience = state.miniProjects[index];
        state.miniProjects[index] = state.miniProjects[index - 1];
        state.miniProjects[index - 1] = currentExperience;
      }
    })
  );
};

const onMoveDown = (set: SetState<IminiProjectsStore>) => (index: number) => {
  set(
    produce((state: IminiProjectsStore) => {
      const totalExp = state.miniProjects.length;
      if (index < totalExp - 1) {
        const currentExperience = state.miniProjects[index];
        state.miniProjects[index] = state.miniProjects[index + 1];
        state.miniProjects[index + 1] = currentExperience;
      }
    })
  );
};

export const useMiniProjectsStore = create<IminiProjectsStore>(
  persist(
    (set, get) => ({
      miniProjects: resumeData.miniProjects,
      add: addMiniProject(set),
      get: getMiniProject(get),
      remove: removeMiniProject(set),
      reset: setMiniProject(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updatedMiniProject: updatedMiniProject(set),
    }),
    { name: 'miniProjects' }
  )
);
