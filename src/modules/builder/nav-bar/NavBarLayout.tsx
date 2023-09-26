import { ChangeEvent, useCallback, useRef, useState, useEffect } from 'react';
import { NavBarActions, NavBarMenu, StyledButton } from './atoms';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';

import { AVAILABLE_TEMPLATES } from 'src/helpers/constants';
import DEFAULT_RESUME_JSON from 'src/helpers/constants/resume-data.json';
import Image from 'next/image';
import Link from 'next/link';
import { NavMenuItem } from './components/MenuItem';
import { PrintResume } from './components/PrintResume';
import { TemplateSelect } from './components/TemplateSelect';
import { ThemeSelect } from './components/ThemeSelect';
import { Toast } from 'src/helpers/common/atoms/Toast';
import exportFromJSON from 'export-from-json';
import { useActivity } from 'src/stores/activity';
import { useAwards } from 'src/stores/awards';
import { useBasicDetails } from 'src/stores/basic';
import { useEducations } from 'src/stores/education';
import { useExperiences } from 'src/stores/experience';
import { useVoluteeringStore } from 'src/stores/volunteering';
import { useProjects } from 'src/stores/projects';
import { useMiniProjectsStore } from 'src/stores/miniProjects';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import axios from 'axios';

const TOTAL_TEMPLATES_AVAILABLE = Object.keys(AVAILABLE_TEMPLATES).length;
const SERVER_URL = 'https://resume-builder-crio-backend.onrender.com/v1/resume';

const NavBarLayout = () => {
  const modalRef = useRef(null);
  const [openToast, setOpenToast] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [openBox, setOpenBox] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenBox(false);
      }
    };

    if (openBox) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openBox]);

  const exportResumeData = useCallback(() => {
    const updatedResumeJson = {
      ...DEFAULT_RESUME_JSON,
      basics: {
        ...DEFAULT_RESUME_JSON.basics,
        ...useBasicDetails.getState().values,
      },
      work: useExperiences.getState().experiences,
      education: useEducations.getState().academics,
      awards: useAwards.getState().awards,
      volunteer: useVoluteeringStore.getState().volunteeredExps,
      skills: {
        languages: useLanguages.getState().get(),
        frameworks: useFrameworks.getState().get(),
        technologies: useTechnologies.getState().get(),
        libraries: useLibraries.getState().get(),
        databases: useDatabases.getState().get(),
        practices: usePractices.getState().get(),
        tools: useTools.getState().get(),
      },
      activities: useActivity.getState().activities,
      projects: useProjects.getState().projects,
      miniProjects: useMiniProjectsStore.getState().miniProjects,
    };

    const fileName = updatedResumeJson.basics.name + '_' + new Date().toLocaleString();
    const exportType = exportFromJSON.types.json;
    exportFromJSON({
      data: updatedResumeJson,
      fileName,
      exportType,
    });
  }, []);

  const saveToDatabase = useCallback(() => {
    const updatedResumeJson = {
      ...DEFAULT_RESUME_JSON,
      basics: {
        ...DEFAULT_RESUME_JSON.basics,
        ...useBasicDetails.getState().values,
      },
      work: useExperiences.getState().experiences,
      education: useEducations.getState().academics,
      awards: useAwards.getState().awards,
      volunteer: useVoluteeringStore.getState().volunteeredExps,
      skills: {
        languages: useLanguages.getState().get(),
        frameworks: useFrameworks.getState().get(),
        technologies: useTechnologies.getState().get(),
        libraries: useLibraries.getState().get(),
        databases: useDatabases.getState().get(),
        practices: usePractices.getState().get(),
        tools: useTools.getState().get(),
      },
      activities: useActivity.getState().activities,
      projects: useProjects.getState().projects,
      miniProjects: useMiniProjectsStore.getState().miniProjects,
    };
    const formData = new FormData();
    formData.append(`resumeData`, JSON.stringify(updatedResumeJson));
    axios
      .post(`${SERVER_URL}/save`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // console.log(response.data);
        enqueueSnackbar(response.data);
      })
      .catch((error) => {
        enqueueSnackbar('Something went wrong with the backend');
        // console.log(error);
      });
  }, []);

  //importing the json
  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    const reader = new FileReader();

    reader.readAsText(fileObj);

    event.target.value = ''; // To read the same file

    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        const uploadedResumeJSON = JSON.parse(e.target?.result);
        const {
          basics = {},
          skills = {},
          work = [],
          education = [],
          activities = {
            involvements: '',
            achievements: '',
          },
          volunteer = [],
          awards = [],
        } = uploadedResumeJSON;
        const {
          languages = [],
          frameworks = [],
          libraries = [],
          databases = [],
          technologies = [],
          practices = [],
          tools = [],
        } = skills;
        useBasicDetails.getState().reset(basics);
        useLanguages.getState().reset(languages);
        useFrameworks.getState().reset(frameworks);
        useLibraries.getState().reset(libraries);
        useDatabases.getState().reset(databases);
        useTechnologies.getState().reset(technologies);
        usePractices.getState().reset(practices);
        useTools.getState().reset(tools);
        useExperiences.getState().reset(work);
        useEducations.getState().reset(education);
        useVoluteeringStore.getState().reset(volunteer);
        useAwards.getState().reset(awards);
        useActivity.getState().reset(activities);
        setOpenToast(true);
      }
    };
  }, []);

  const loadFromDatabase = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/get`, {
        params: {
          email: inputEmail,
        },
      });
      if (response.status === 200) {
        enqueueSnackbar(response.data.msg);
      } else {
        throw new Error(response.data.msg);
      }
      // console.log(response.data.data);
      const uploadedResumeJSON = response.data.data;
      const {
        basics = {},
        skills = {},
        work = [],
        education = [],
        activities = {
          involvements: '',
          achievements: '',
        },
        volunteer = [],
        awards = [],
        projects = [],
        miniProjects = [],
      } = uploadedResumeJSON;
      const {
        languages = [],
        frameworks = [],
        libraries = [],
        databases = [],
        technologies = [],
        practices = [],
        tools = [],
      } = skills;
      useBasicDetails.getState().reset(basics);
      useLanguages.getState().reset(languages);
      useFrameworks.getState().reset(frameworks);
      useLibraries.getState().reset(libraries);
      useDatabases.getState().reset(databases);
      useTechnologies.getState().reset(technologies);
      usePractices.getState().reset(practices);
      useTools.getState().reset(tools);
      useExperiences.getState().reset(work);
      useEducations.getState().reset(education);
      useVoluteeringStore.getState().reset(volunteer);
      useAwards.getState().reset(awards);
      useActivity.getState().reset(activities);
      useProjects.getState().reset(projects);
      useMiniProjectsStore.getState().reset(miniProjects);
      setOpenToast(true);
    } catch (err) {
      console.log(err);
    }
  }, [inputEmail]);

  const handleGlobalReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 pl-5 pr-4 items-center shadow-level-8dp z-20 print:hidden">
      <Link href="/" className="text-white text-md">
        HOME
      </Link>
      <SnackbarProvider />
      <div className="flex-auto flex justify-between items-center ml-5">
        <NavBarMenu>
          <NavMenuItem caption={`Choose Templates`} popoverChildren={<TemplateSelect />} />
          <NavMenuItem caption="Colours" popoverChildren={<ThemeSelect />} />
        </NavBarMenu>
        <NavBarActions>
          <StyledButton variant="text" onClick={handleGlobalReset}>
            Reset Data
          </StyledButton>
          <StyledButton variant="text" onClick={exportResumeData}>
            Export
          </StyledButton>
          <StyledButton variant="text" onClick={saveToDatabase}>
            Save to Database
          </StyledButton>
          <StyledButton
            variant="text"
            onClick={() => {
              if (fileInputRef.current) {
                const fileElement = fileInputRef.current as HTMLInputElement;
                fileElement.click();
              }
            }}
          >
            Import{' '}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="application/json"
              onChange={handleFileChange}
            />
          </StyledButton>
          <StyledButton
            className="relative"
            variant="text"
            onClick={() => setOpenBox((prev) => !prev)}
          >
            Load From Database
          </StyledButton>
          {openBox === true ? (
            <div
              ref={modalRef}
              className="w-[400px] h-[150px] absolute bg-white top-12 right-16 rounded-md flex flex-col items-center"
            >
              <label className="mt-4 text-slate-700 mb-2 inline-block text-lg">
                Enter user email:{' '}
              </label>
              <input
                type="text"
                className="w-[300px] border border-slate-300 rounded-mds"
                onChange={(e) => setInputEmail(e.target.value)}
              />
              <div className="mt-4">
                <button
                  className="mr-3 inline-block border border-slate-600 px-5 py-1 rounded bg-slate-600 text-white mb-1"
                  onClick={loadFromDatabase}
                >
                  Load
                </button>
                <button onClick={() => setOpenBox((prev) => !prev)}>Cancel</button>
              </div>
            </div>
          ) : null}

          <PrintResume name={useBasicDetails.getState().values.name} />
        </NavBarActions>
      </div>
      <Toast
        open={openToast}
        onClose={() => {
          setOpenToast(false);
        }}
        content={'Resume data was successfully imported.'}
      />
    </nav>
  );
};

export default NavBarLayout;
