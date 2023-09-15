import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Define the store state type
interface TrackStoreState {
  track: string;
  setTrack: (track: string) => void;
}

const trackStore = (set: (fn: (state: TrackStoreState) => TrackStoreState) => void) => ({
  track: 'fdt',
  setTrack: (track: string) => {
    set((state) => ({
      ...state,
      track,
    }));
  },
});

const useTrackStore = create<TrackStoreState>(
  devtools(
    persist(trackStore, {
      name: 'track',
    })
  )
);

export default useTrackStore;
