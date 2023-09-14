import { Divider, styled, alpha } from '@mui/material';
import Link from '@mui/material/Link';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { TemplateSelectForm } from './TemplateSelectForm';

import { TemplateSlider } from './TemplatesSlider';

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.resume[800],
  borderColor: theme.palette.resume[100],
  ':hover': {
    borderColor: theme.palette.resume[800],
    backgroundColor: alpha(theme.palette.resume[800], 0.04),
  },
}));

export const TemplateSelect = () => {
  return (
    <div className={`h-[200px] w-[700px] bg-white flex flex-col px-10 py-[23px] shadow-2xl`}>
      {/* <TemplateSlider /> */}
      <TemplateSelectForm />
    </div>
  );
};
