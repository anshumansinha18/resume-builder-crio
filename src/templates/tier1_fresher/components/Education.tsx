import { IEducation } from 'src/stores/index.interface';
import { dateParser } from 'src/helpers/utils';

export const Education = ({ education }: { education: IEducation[] }) => {
  return (
    <>
      {education.map((item: IEducation, index: number) => {
        return (
          <div key={item.id} className="flex mb-3 justify-between items-center">
            <div className="text-sm">
              <strong>
                {item.studyType} | {item.area}
              </strong>
              <div className="italic text-sm">{item.institution}</div>
              <div>
                CPI: <span className="font-bold text-sm">{item.score}</span>
              </div>
            </div>
            <div className="text-xs italic">
              {item.startDate.toString()} - {item.endDate.toString()}
            </div>
          </div>
        );
      })}
    </>
  );
};
