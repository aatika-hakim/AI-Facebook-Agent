import React from 'react';

const ActionButton: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <button className="flex-1 flex items-center justify-center gap-2 text-center py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600/50 transition-colors duration-200">
        {icon}
        {label}
    </button>
);

const FacebookPost: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-700/30">
        <div className="flex items-center mb-4">
            <img 
                src="https://i.pravatar.cc/40?u=jane-doe" 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full mr-3 border-2 border-white dark:border-slate-600"
            />
            <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">Jane Doe</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">2h ago</p>
            </div>
        </div>
        <p className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 text-base">{content}</p>
        <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-1 flex justify-around text-sm font-semibold text-slate-600 dark:text-slate-300">
            <ActionButton 
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.97l-1.9 3.8z" /></svg>}
                label="Like"
            />
            <ActionButton 
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                label="Comment"
            />
            <ActionButton 
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>}
                label="Share"
            />
        </div>
    </div>
  );
};

export default FacebookPost;