import React from 'react';
import { AppState } from './types';
import { useAppLogic } from './hooks/useAppLogic';
import FacebookPost from './components/FacebookPost';
import PermissionRequest from './components/PermissionRequest';
import GeneratedComment from './components/GeneratedComment';
import Button from './components/common/Button';
import Spinner from './components/common/Spinner';
import Toast from './components/common/Toast';

const App: React.FC = () => {
    const {
        postContent,
        appState,
        analysis,
        generatedComment,
        error,
        showSuccessToast,
        setShowSuccessToast,
        resetState,
        handleConnectToFacebook,
        handleApprove,
        handleDeny,
        handlePostComment,
    } = useAppLogic();

    const isInitialLoading = appState === AppState.CONNECTING || appState === AppState.FETCHING_POSTS || appState === AppState.ANALYZING;

    const getLoadingMessage = () => {
        switch(appState) {
            case AppState.CONNECTING:
                return 'Connecting to Facebook...';
            case AppState.FETCHING_POSTS:
                return 'Fetching latest post...';
            case AppState.ANALYZING:
                return 'Analyzing Post...';
            case AppState.GENERATING_COMMENT:
                return 'Crafting Comment...';
            default:
                return 'Loading...';
        }
    }

    return (
        <div className="min-h-screen font-sans p-4 md:p-8 flex flex-col items-center antialiased">
            <header className="text-center mb-10 flex flex-col items-center">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-md mb-4 ring-1 ring-slate-200 dark:ring-slate-700">
                    <svg className="w-8 h-8 text-teal-600 dark:text-teal-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.25c.966 0 1.905.183 2.78.52l.22.086c.866.333 1.634.85 2.27 1.504.64.65.98 1.4.98 2.23v.21c0 .87-.33 1.63-.97 2.28-.63.64-1.4.98-2.27.98h-.21c-.87 0-1.63-.34-2.27-.98-.63-.65-1.02-1.4-1.02-2.28v-4.5c0-.966-.183-1.905-.52-2.78l-.086-.22c-.333-.866-.85-1.634-1.504-2.27C9.91 2.58 9.16 2.25 8.29 2.25h-.21c-.87 0-1.63.33-2.28.97-.64.63-.98 1.4-.98 2.27v.21c0 .87.34 1.63.98 2.27.65.63 1.4.98 2.28 1.02h4.5c.966 0 1.905.183 2.78.52l.22.086c.866.333 1.634.85 2.27 1.504.64.65.98 1.4.98 2.23v.21c0 .87-.33 1.63-.97 2.28-.63.64-1.4.98-2.27.98h-.21c-.87 0-1.63-.34-2.27-.98-.63-.65-1.02-1.4-1.02-2.28v-4.5c0-.966.183-1.905.52-2.78l-.086-.22c.333-.866-.85-1.634-1.504-2.27C14.09 9.58 14.84 9.25 15.71 9.25h.21c.87 0 1.63.33 2.28.97.64.63.98 1.4.98 2.27v.21c0 .87-.34 1.63-.98 2.27-.65.63-1.4.98-2.28 1.02h-4.5c-.966 0-1.905-.183-2.78-.52l-.22-.086c-.866-.333-1.634-.85-2.27-1.504C5.58 14.09 5.25 13.34 5.25 12.4v-.21c0-.87.33-1.63.97-2.28.63-.64 1.4-.98 2.27-.98h.21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">AI Facebook Assistant</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md">Connect to Facebook to analyze your latest post and generate a helpful, human-like comment.</p>
            </header>

            <main className="w-full max-w-2xl bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 p-6 md:p-8 space-y-6">
                {appState === AppState.IDLE && (
                    <div className="text-center p-8">
                        <h2 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100">Get Started</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">Click below to simulate connecting to your Facebook account and fetching your latest relevant post.</p>
                        <Button onClick={handleConnectToFacebook} className="inline-flex items-center gap-2">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"></path></svg>
                            Connect to Facebook
                        </Button>
                    </div>
                )}
                
                {isInitialLoading && (
                    <div className="flex flex-col items-center justify-center p-8 space-y-4">
                        <Spinner />
                        <p className="text-slate-600 dark:text-slate-400 animate-pulse text-lg">
                            {getLoadingMessage()}
                        </p>
                    </div>
                )}

                {(appState !== AppState.IDLE && !isInitialLoading) && <FacebookPost content={postContent} />}
                
                {appState === AppState.AWAITING_PERMISSION && analysis && (
                    <PermissionRequest 
                        topic={analysis.topic} 
                        onApprove={handleApprove}
                        onDeny={handleDeny}
                    />
                )}
                
                {appState === AppState.NOT_RELEVANT && (
                    <div className="text-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <p className="font-semibold text-lg">Post Not Relevant</p>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">This post doesn't seem to be about tech, coding, or design. No action taken.</p>
                        <Button onClick={resetState} variant="secondary" className="mt-4">
                            Start Over
                        </Button>
                    </div>
                )}

                {(appState === AppState.COMMENT_READY || (appState === AppState.GENERATING_COMMENT && !!generatedComment)) && (
                    <GeneratedComment 
                        comment={generatedComment} 
                        onPost={handlePostComment}
                        onRegenerate={handleApprove}
                        isGenerating={appState === AppState.GENERATING_COMMENT}
                    />
                )}

                {appState === AppState.ERROR && (
                    <div className="flex items-start space-x-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 rounded-lg">
                        <svg className="h-6 w-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <p className="font-bold">An Error Occurred</p>
                            <p className="mt-1 text-sm">{error}</p>
                            <Button onClick={resetState} variant="secondary" className="mt-4 !bg-red-100 !text-red-800 hover:!bg-red-200 dark:!bg-red-500/20 dark:!text-red-200 dark:hover:!bg-red-500/30">
                                Try Again
                            </Button>
                        </div>
                    </div>
                )}
            </main>
             <footer className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
                <p>Powered by Google Gemini</p>
            </footer>

            <Toast 
                message="Comment 'posted' successfully!"
                show={showSuccessToast}
                onClose={() => setShowSuccessToast(false)}
            />
        </div>
    );
};

export default App;