import React from 'react';

const NoInquiryCard = () => {
  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50/50 p-10 text-center">
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-400">
        ?
      </div>
      <p className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase">
        No inquiries
      </p>
    </div>
  );
};

export default NoInquiryCard;
