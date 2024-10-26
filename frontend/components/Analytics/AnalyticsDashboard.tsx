"use client"

import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";



interface Sentiment {
  sentiment: string;
  rating: string;
  name: string;
  feedback: string;
  explanation: string;
}

interface SentimentData {
  sentiments: Sentiment[];
}

interface SummaryData {
  averageRating: number;
  overallSummary: string;
  keyPoints: string[];
  recommendations: string[];
}

const AnalyticsDashboard = ({ sentimentData, summaryData }: { sentimentData: SentimentData; summaryData: SummaryData | null }) => {
    if (!sentimentData.sentiments.length || !summaryData) {
        return <div>No data available</div>;
    }

    const sentimentDistribution = sentimentData.sentiments.reduce((acc: { [key: string]: number }, curr) => {
        acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
        return acc;
    }, {});

    const pieChartData = Object.entries(sentimentDistribution).map(([name, value]) => ({
        name: name as keyof typeof SENTIMENT_COLORS,
        value
    }));
    
      const SENTIMENT_COLORS = {
        positive: '#22c55e',
        neutral: '#64748b',
        negative: '#ef4444'
      };
    
      
      const ratingsData = sentimentData.sentiments.map((item, index) => ({
        name: `Feedback ${index + 1}`,
        rating: parseFloat(item.rating)
      }));
    
    

    return (
        <>
         <div className="p-6 max-w-7xl mx-auto">
         <div className="flex items-center justify-between">
         <h3 className="font-medium">Form Analysis</h3>
         <div className="flex items-center gap-6">
         <Button>Form Builder</Button>
         <Button variant={"secondary"}>Recalculate</Button>
         </div>
         </div>
      <div className="flex flex-col  gap-6">
        

        {/* Sentiment Analysis Section */}
        <div className="mt-10 grid grid-cols-3 gap-6">
          <Card className="bg-primary text-secondary">
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
              <CardDescription>Overview of feedback sentiments</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={SENTIMENT_COLORS[entry.name as keyof typeof SENTIMENT_COLORS] || '#CBD5E1'}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-primary text-secondary col-span-2">
            <CardHeader>
              <CardTitle>Ratings Trend</CardTitle>
              <CardDescription>User ratings over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ratingsData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Summary Section */}
        <div className="space-y-6">
          <Card className="bg-primary text-secondary">
            <CardHeader>
              <CardTitle>Overall Summary</CardTitle>
              <CardDescription>
                Average Rating: {summaryData.averageRating}/5
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-secondary/60 mb-4">{summaryData.overallSummary}</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-secondary/10 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">Key Points</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {summaryData.keyPoints.map((point, index) => (
                      <li key={index} className="text-secondary/60">{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-800/30 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {summaryData.recommendations.map((rec, index) => (
                      <li key={index} className="text-secondary/60">{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-secondary">
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>Latest user sentiments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 ">
                {sentimentData.sentiments.map((item, index) => (
                  <div key={index} className="bg-secondary/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{item.name}</span>
                      <Badge 
                        variant={item.sentiment === 'positive' ? 'default' : 
                               item.sentiment === 'negative' ? 'destructive' : 
                               'secondary'}
                      >
                        {item.sentiment}
                      </Badge>
                    </div>
                    <p className="text-secondary mb-2">{item.feedback}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary">Rating: {item.rating}/5</span>
                      <span className="text-secondary">{item.explanation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
        </>
    )

}

export default AnalyticsDashboard