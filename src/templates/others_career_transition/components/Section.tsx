import Color from 'color';
import { IProfiles } from 'src/stores/basic.interface';
import React, { useEffect, useRef, useState } from 'react';
import { socialIcons } from 'src/helpers/icons';
import styled from '@emotion/styled';
import styles from './about.module.css';

const SectionHolder = styled.div`
  border-radius: 5px;
  padding: 9px 0px 10px 6px;

  .header {
    position: relative;
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

  .section-heading {
    color: ${(props) => props.theme.titleColor};
  }

  .under-line {
    position: absolute;
    height: 1px;
    bottom: 3px;
    background-color: ${(props) => props.theme.fontColor};
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

export function Section({
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
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [spanWidth, setSpanWidth] = useState<number>(0);
  const [headerWidth, setHeaderWidth] = useState<number>(0);

  const calculateWidth = (): void => {
    if (spanRef.current) {
      const width = spanRef.current.offsetWidth;
      setSpanWidth(width);
    }
    if (headerRef.current) {
      const width = headerRef.current.offsetWidth;
      setHeaderWidth(width);
    }
  };
  useEffect(() => {
    calculateWidth();
  }, []);
  return (
    <SectionHolder>
      <div
        ref={headerRef}
        className="header flex justify-start items-center gap-1 max-w-[100%] w-full"
        title={title}
      >
        <span
          ref={spanRef}
          className={`${
            titleClassname ? titleClassname : ''
          } whitespace-nowrap overflow-hidden overflow-ellipsis section-heading`}
        >
          {title}
          {/* <span
            className="under-line"
            style={{ width: `calc(${headerWidth}px - ${spanWidth}px)` }}
          ></span> */}
        </span>
      </div>

      {/* {profiles && <SocialIcons profiles={profiles} />} */}

      {children}
    </SectionHolder>
  );
}
