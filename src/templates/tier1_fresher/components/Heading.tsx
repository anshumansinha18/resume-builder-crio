import Color from 'color';
import { IProfiles } from 'src/stores/basic.interface';
import React from 'react';
import { socialIcons } from 'src/helpers/icons';
import styled from '@emotion/styled';

const SectionHolder = styled.div`
  border-radius: 5px;
  padding: 18px 0px 10px 6px;
  position: relative;

  .header {
    position: absolute;
    top: 0;
    transform: translate(0, -50%);
    background: white;
    padding: 0 0px;
    font-weight: bold;
    color: ${(props) => props.theme.fontColor};
  }

  .social-icons {
    position: absolute;
    top: 0;
    right: 10px;
    transform: translate(0, -50%);
    color: ${(props) => props.theme.titleColor};
  }
`;

function SocialIcons({ profiles }: { profiles: IProfiles[] }) {
  return (
    <div className="social-icons flex">
      {profiles.map((profile) => {
        const Icon = socialIcons.get(profile.network);

        return (
          Icon &&
          profile.url && (
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
              key={profile.network}
            >
              <Icon className="h-5 w-5 bg-white" />
            </a>
          )
        );
      })}
    </div>
  );
}

export function Heading({
  title,
  children,
  titleClassname,
  profiles,
}: {
  title: string;
  children: React.ReactNode;
  titleClassname?: string;
  profiles?: IProfiles[];
}) {
  return (
    <SectionHolder>
      <div
        className="header flex justify-center items-center gap-1 max-w-[100%] w-full"
        title={title}
      >
        <span
          className={`${
            titleClassname ? titleClassname : ''
          } whitespace-nowrap overflow-hidden overflow-ellipsis`}
        >
          {title}
        </span>
      </div>

      {/* {profiles && <SocialIcons profiles={profiles} />} */}

      {children}
    </SectionHolder>
  );
}
