import { IEducation } from 'src/stores/index.interface';
import { dateParser } from 'src/helpers/utils';

export const Education = ({ education }: { education: IEducation[] }) => {
  function formatDate(inputDateStr: string): string | void {
    if (!inputDateStr) return;
    const inputDate = new Date(inputDateStr);
    const year = inputDate.getFullYear();

    return `${year}`;
  }
  return (
    <div>
      {education.map((item: IEducation, index: number) => {
        return (
          <div key={item.id} className="flex mb-4 last:mb-1 justify-between items-center">
            <div className="text-sm mt-[-12px]">
              <strong>
                {item.studyType} {item.studyType && item.area && <>|</>} {item.area}
              </strong>
              <div className="italic text-sm">{item.institution}</div>
              {item.score && (
                <div>
                  Grade: <span className="font-bold text-sm">{item.score}</span>
                </div>
              )}
            </div>
            <div className="text-xs font-bold">
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
