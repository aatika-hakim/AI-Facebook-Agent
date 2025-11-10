import React from 'react';
import Button from './common/Button';

interface PermissionRequestProps {
  topic: string;
  onApprove: () => void;
  onDeny: () => void;
}

const PermissionRequest: React.FC<PermissionRequestProps> = ({ topic, onApprove, onDeny }) => {
  return (
    <div className="text-center p-4 border-t border-slate-200 dark:border-slate-700 mt-4">
        <div className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold">Analysis Complete</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
            This post appears to be about: <span className="font-medium text-slate-800 dark:text-slate-200">{topic}</span>.
        </p>
        <p className="mt-5 text-lg font-semibold text-teal-600 dark:text-teal-400">Can I help answer this post?</p>
        <div className="mt-5 flex justify-center gap-4">
            <Button onClick={onDeny} variant="secondary">
                No, Thanks
            </Button>
            <Button onClick={onApprove}>
                Yes, Help Out
            </Button>
        </div>
    </div>
  );
};

export default PermissionRequest;