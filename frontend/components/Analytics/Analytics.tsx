"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Analytics from './AnalyticsDashboard';

// interface SentimentData {
//   sentiments: Array<any>;
// }

// interface SummaryData {
//   averageRating: number;
//   overallSummary: string;
//   keyPoints: Array<string>;
//   recommendations: Array<string>;
// }


const fetchFeedbackData = async (id: string) => {
  const response = await fetch('http://localhost:3000/api/form/analyse/670bd4f97ff7be50abd3');
  if (!response.ok) {
    throw new Error('Failed to fetch feedback data');
  }
  const { data } = await response.json();
  return data;
};


const fetchSentimentData = async (yourFeedbackData: any) => {
  const response = await fetch('http://localhost:3000/api/sentiments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: yourFeedbackData }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch sentiment data');
  }
  return response.json();
};


const fetchSummaryData = async (yourFeedbackData: any) => {
  const response = await fetch('http://localhost:3000/api/feedbacks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: yourFeedbackData }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch summary data');
  }
  return response.json();
};


const AnalyticsPage = ({ id }: { id: string }) => {

  const { data: feedbackData, error: feedbackError, isLoading: feedbackLoading } = useQuery({
    queryKey: ['feedback', id],
    queryFn: () => fetchFeedbackData(id),
    staleTime: Infinity, 
    cacheTime: Infinity,
  });

  
  const { data: sentimentData, error: sentimentError, isLoading: sentimentLoading } = useQuery({
    queryKey: ['sentiment', feedbackData],
    queryFn: () => feedbackData ? fetchSentimentData(feedbackData) : Promise.reject(),
    enabled: !!feedbackData,
    staleTime: Infinity, 
    cacheTime: Infinity,
  });

  const { data: summaryData, error: summaryError, isLoading: summaryLoading } = useQuery({
    queryKey: ['summary', feedbackData],
    queryFn: () => feedbackData ? fetchSummaryData(feedbackData) : Promise.reject(),
    enabled: !!feedbackData,
    staleTime: Infinity, 
    cacheTime: Infinity,
  });

  
  if (feedbackLoading || sentimentLoading || summaryLoading) {
    return <div>Loading...</div>;
  }


  if (feedbackError || sentimentError || summaryError) {
    return <div>{feedbackError?.message || sentimentError?.message || summaryError?.message}</div>;
  }

 
  return <Analytics sentimentData={sentimentData} summaryData={summaryData!} />;
};

export default AnalyticsPage;
