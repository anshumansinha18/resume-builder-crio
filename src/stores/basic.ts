import create, { SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import resumeData from 'src/helpers/constants/resume-data.json';
import { IBasicDetailsItem, IBasicDetailsStore } from './basic.interface';

const onChangeText = (set: SetState<IBasicDetailsStore>) => (values: IBasicDetailsItem) =>
  set({ values });

// this store (useBasicDetails) manages basic personal details for a resume using Zustand. It initializes the store with default values from resumeData.basics, provides a way to reset and update these details, and ensures that the data is persisted in the browser's local storage for data continuity across page reloads or sessions.
export const useBasicDetails = create<IBasicDetailsStore>(
  persist(
    (set) => ({
      values: resumeData.basics,
      reset: onChangeText(set),
    }),
    { name: 'basic' }
  )
);
