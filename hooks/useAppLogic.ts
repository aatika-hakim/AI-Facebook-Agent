import { useState, useCallback } from 'react';
import { AppState, PostAnalysis } from '../types';
import * as geminiService from '../services/geminiService';

const MOCK_FACEBOOK_POST = "I'm having an issue with CSS Grid. I have a 3-column layout, but the middle column is unexpectedly stretching and pushing the third one out of the container. I've set 'grid-template-columns: 1fr 2fr 1fr', but it doesn't seem to work as I thought. Any ideas what I might be doing wrong here?";

export const useAppLogic = () => {
    const [postContent, setPostContent] = useState<string>('');
    const [appState, setAppState] = useState<AppState>(AppState.IDLE);
    const [analysis, setAnalysis] = useState<PostAnalysis | null>(null);
    const [generatedComment, setGeneratedComment] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

    const resetState = useCallback(() => {
        setPostContent('');
        setAppState(AppState.IDLE);
        setAnalysis(null);
        setGeneratedComment('');
        setError('');
        setShowSuccessToast(false);
    }, []);

    const handleAnalyze = useCallback(async (contentToAnalyze: string) => {
        setAppState(AppState.ANALYZING);
        setError('');
        try {
            const result = await geminiService.analyzePost(contentToAnalyze);
            setAnalysis(result);
            if (result.isRelevant) {
                setAppState(AppState.AWAITING_PERMISSION);
            } else {
                setAppState(AppState.NOT_RELEVANT);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setAppState(AppState.ERROR);
        }
    }, []);

    const handleConnectToFacebook = useCallback(() => {
        setAppState(AppState.CONNECTING);
        // Simulate connecting to Facebook API (OAuth)
        setTimeout(() => {
            setAppState(AppState.FETCHING_POSTS);
            // Simulate fetching the latest post
            setTimeout(() => {
                setPostContent(MOCK_FACEBOOK_POST);
                // Once post is "fetched", trigger analysis
                handleAnalyze(MOCK_FACEBOOK_POST);
            }, 1500);
        }, 1500);
    }, [handleAnalyze]);

    const handleApprove = useCallback(async () => {
        if (!analysis || !analysis.isRelevant) return;

        setAppState(AppState.GENERATING_COMMENT);
        try {
            const comment = await geminiService.generateComment(analysis.summary);
            setGeneratedComment(comment);
            setAppState(AppState.COMMENT_READY);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setAppState(AppState.ERROR);
        }
    }, [analysis]);

    const handleDeny = useCallback(() => {
        resetState();
    }, [resetState]);

    const handlePostComment = useCallback(() => {
        setShowSuccessToast(true);
        // The Toast component will auto-hide, and we reset state after it's gone
        setTimeout(() => {
            resetState();
        }, 3000);
    }, [resetState]);
    
    return {
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
    };
};