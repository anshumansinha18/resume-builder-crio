// eslint-disable-next-line import/no-unresolved
import '@splidejs/splide/css';

// import Splide, { Splide as SplideCore } from '@splidejs/splide';
import { useEffect, useRef, useState } from 'react';

import { AVAILABLE_TEMPLATES } from 'src/helpers/constants';
import { useTemplates } from 'src/stores/useTemplate';

import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const TemplateSelectForm = () => {
  const templateIndex = useTemplates((state) => state.activeTemplate.id);

  const [college, setCollege] = useState('none');
  const [template, setTemplate] = useState('none');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCollegeChange = (e) => {
    const selectedCollege = e.target.value;
    setCollege(selectedCollege);

    setTemplate('none');
  };

  const handleSubmit = () => {
    if (college === 'none' || template === 'none') {
      setErrorMsg('Please select both choices');
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
      return;
    }

    setErrorMsg('');

    useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES[template]);
  };

  const tier1Options = [
    { value: 'tier1_fresher_nwg', label: 'Tier-1 + Fresher/NWG' },
    { value: 'tier1_working', label: 'Tier-1 + Working Professional' },
    { value: 'tier1_career_transition', label: 'Tier-1 + Career Transition' },
  ];

  const otherOptions = [
    { value: 'others_fresher_nwg', label: 'Others + Fresher/NWG' },
    { value: 'others_working', label: 'Other + Working Professional' },
    { value: 'others_career_transition', label: 'Other + Career Transition' },
  ];

  const secondDropdownOptions =
    college === 'tier-1' ? tier1Options : college === 'others' ? otherOptions : [];

  return (
    <div>
      <section>
        <FormControl sx={{ m: 1, minWidth: 100, marginBottom: '30px' }}>
          <Select value={college} name="college" onChange={handleCollegeChange}>
            <MenuItem value="none" disabled={college === 'none'}>
              {college === 'none' ? <em>College Type</em> : <em>None</em>}
            </MenuItem>
            <MenuItem value="tier-1">Tier-1</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
          <FormHelperText>Please Select College Type</FormHelperText>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 350 }}>
          <Select
            value={template}
            name="template"
            onChange={(e) => {
              console.log(e.target.value);
              setTemplate(e.target.value);
            }}
          >
            <MenuItem value="none" disabled={template === 'none'}>
              {template === 'none' ? <em>Choose Template</em> : <em>None</em>}
            </MenuItem>
            {secondDropdownOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Please Select Template</FormHelperText>
        </FormControl>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Choose Template
          </button>
          <span className="ml-3 text-red-600">{errorMsg}</span>
        </div>
      </section>
    </div>
  );
};
