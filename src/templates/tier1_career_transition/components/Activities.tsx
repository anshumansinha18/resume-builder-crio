import React from 'react';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';

export default function Activities({ activities }) {
  return (
    <div className="mt-[-12px] mr-4">
      <HTMLRenderer htmlString={activities}></HTMLRenderer>
    </div>
  );
}
