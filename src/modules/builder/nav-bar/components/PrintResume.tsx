import { useEffect } from 'react';

import { StyledButton } from '../atoms';
import useTrackStore from 'src/stores/track';

export const PrintResume = ({ name }: { name: string }) => {
  useEffect(() => {
    globalThis?.addEventListener('beforeprint', () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const track = useTrackStore.getState().track;
      name = name.split(' ').join('_');

      globalThis.document.title = `${name}_${track}_${Date.now()}`;
    });

    globalThis?.addEventListener('afterprint', () => {
      globalThis.document.title = 'Single Page Resume Builder';
    });
  }, []);

  return (
    <StyledButton onClick={globalThis?.print} variant="outlined">
      Download as PDF
    </StyledButton>
  );
};
