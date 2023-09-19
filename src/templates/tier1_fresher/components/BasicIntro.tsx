import { IBasics } from 'src/stores/index.interface';
import { IProfiles } from 'src/stores/basic.interface';
import styled from '@emotion/styled';
import Color from 'color';
import Image from 'next/image';

const Role = styled.span`
  color: ${(props) => Color(props.theme.titleColor).alpha(0.85).toString()};
`;

export default function BasicIntro({
  basics,
  profiles,
}: {
  basics: IBasics;
  profiles: IProfiles[];
}) {
  const findUsername = (profileUrl: string): string => {
    if (profileUrl.endsWith('/')) {
      profileUrl = profileUrl.slice(0, -1);
    }
    const username = profileUrl.slice(profileUrl.lastIndexOf('/') + 1);
    return username;
  };
  return (
    <div className="flex flex-col items-center gap-0">
      <div className="">
        <Role className="text-[15=6px] font-medium">{basics.label}</Role>
      </div>

      <div className="flex justify-end gap-2">
        <div className="flex gap-1  items-center">
          {/* <Image src={'/icons/phone.svg'} alt="Phone" width={12} height={12} /> */}
          {/* <span className="text-sm">{basics.phone}</span> */}
          <a className="text-sm" href={`tel:${basics.phone}`}>
            {basics.phone}
          </a>
          <span>|</span>
        </div>
        <div className="flex gap-1 items-center">
          {/* <Image src={'/icons/mail.svg'} alt="Email" width={12} height={12} /> */}
          <a className="text-sm" href={`mailto:${basics.email}`}>
            {basics.email}
          </a>
          <span>|</span>
        </div>
        <div className="flex gap-1 items-center">
          {/* <Image src={'/icons/location.svg'} alt="Location" width={12} height={12} /> */}
          <a className="text-sm cursor-pointer" href={`${profiles[0].url}`}>{`github/${findUsername(
            profiles[0].url
          )}`}</a>
          <span>|</span>
        </div>
        <div className="flex gap-1 items-center">
          {/* <Image src={'/icons/location.svg'} alt="Location" width={12} height={12} /> */}
          <span className="text-sm">{`linkedin/${findUsername(profiles[2].url)}`}</span>
        </div>
      </div>
    </div>
  );
}
