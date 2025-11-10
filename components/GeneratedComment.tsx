import React from 'react';
import Button from './common/Button';
import Spinner from './common/Spinner';

interface GeneratedCommentProps {
  comment: string;
  onPost: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
}

const GeneratedComment: React.FC<GeneratedCommentProps> = ({ comment, onPost, onRegenerate, isGenerating }) => {
  return (
    <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-2">
        <h3 className="text-lg font-semibold mb-3">Suggested Comment</h3>
        <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-gradient-to-tr from-teal-500 to-cyan-500 p-1 rounded-full w-10 h-10 flex items-center justify-center ring-2 ring-white dark:ring-slate-700">
                 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.25c.966 0 1.905.183 2.78.52l.22.086c.866.333 1.634.85 2.27 1.504.64.65.98 1.4.98 2.23v.21c0 .87-.33 1.63-.97 2.28-.63.64-1.4.98-2.27.98h-.21c-.87 0-1.63-.34-2.27-.98-.63-.65-1.02-1.4-1.02-2.28v-4.5c0-.966-.183-1.905-.52-2.78l-.086-.22c-.333-.866-.85-1.634-1.504-2.27C9.91 2.58 9.16 2.25 8.29 2.25h-.21c-.87 0-1.63.33-2.28.97-.64.63-.98 1.4-.98 2.27v.21c0 .87.34 1.63.98 2.27.65.63 1.4.98 2.28 1.02h4.5c.966 0 1.905.183 2.78.52l.22.086c.866.333 1.634.85 2.27 1.504.64.65.98 1.4.98 2.23v.21c0 .87-.33 1.63-.97 2.28-.63.64-1.4.98-2.27.98h-.21c-.87 0-1.63-.34-2.27-.98-.63-.65-1.02-1.4-1.02-2.28v-4.5c0-.966.183-1.905.52-2.78l-.086-.22c.333-.866-.85-1.634-1.504-2.27C14.09 9.58 14.84 9.25 15.71 9.25h.21c.87 0 1.63.33 2.28.97.64.63.98 1.4.98 2.27v.21c0 .87-.34 1.63-.98 2.27-.65.63-1.4.98-2.28 1.02h-4.5c-.966 0-1.905-.183-2.78-.52l-.22-.086c-.866-.333-1.634-.85-2.27-1.504C5.58 14.09 5.25 13.34 5.25 12.4v-.21c0-.87.33-1.63.97-2.28.63-.64 1.4-.98 2.27-.98h.21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-700 p-4 rounded-lg rounded-tl-none">
                <p className="whitespace-pre-wrap text-slate-800 dark:text-slate-200">{comment}</p>
            </div>
        </div>
        <div className="mt-5 flex justify-end gap-4">
            <Button
                onClick={onRegenerate}
                variant="secondary"
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 w-36"
            >
                {isGenerating ? (
                    <>
                        <Spinner className="!h-5 !w-5" />
                        <span>Generating...</span>
                    </>
                ) : (
                    'Regenerate'
                )}
            </Button>
            <Button onClick={onPost} disabled={isGenerating}>
                Post Comment
            </Button>
        </div>
    </div>
  );
};

export default GeneratedComment;