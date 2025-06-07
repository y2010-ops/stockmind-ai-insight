
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, MessageSquare, Twitter, Calendar } from 'lucide-react';

interface SentimentDashboardProps {
  selectedStock: string;
}

export const SentimentDashboard = ({ selectedStock }: SentimentDashboardProps) => {
  const sentimentData = [
    { time: '9AM', reddit: 65, twitter: 72, news: 68, overall: 68 },
    { time: '11AM', reddit: 70, twitter: 75, news: 65, overall: 70 },
    { time: '1PM', reddit: 75, twitter: 70, news: 72, overall: 72 },
    { time: '3PM', reddit: 80, twitter: 78, news: 75, overall: 78 },
    { time: '5PM', reddit: 85, twitter: 82, news: 80, overall: 82 }
  ];

  const pieData = [
    { name: 'Bullish', value: 65, color: '#22c55e' },
    { name: 'Neutral', value: 25, color: '#eab308' },
    { name: 'Bearish', value: 10, color: '#ef4444' }
  ];

  const sourceData = [
    { source: 'Reddit', mentions: 1250, sentiment: 78 },
    { source: 'Twitter', mentions: 890, sentiment: 72 },
    { source: 'News', mentions: 340, sentiment: 85 },
    { source: 'Forums', mentions: 180, sentiment: 65 }
  ];

  return (
    <Card className="stock-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="gradient-success p-2 rounded-lg">
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Sentiment Analysis</h3>
          <p className="text-sm text-gray-400">{selectedStock} - Real-time tracking</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Sentiment Timeline */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Sentiment Timeline (Today)</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Line type="monotone" dataKey="overall" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e' }} />
                <Line type="monotone" dataKey="reddit" stroke="#ff6b6b" strokeWidth={2} />
                <Line type="monotone" dataKey="twitter" stroke="#4ecdc4" strokeWidth={2} />
                <Line type="monotone" dataKey="news" stroke="#45b7d1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Distribution & Source Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Overall Sentiment</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-300">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Source Breakdown */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Sources</h4>
            <div className="space-y-3">
              {sourceData.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {source.source === 'Reddit' && <MessageSquare className="h-4 w-4 text-orange-400" />}
                    {source.source === 'Twitter' && <Twitter className="h-4 w-4 text-blue-400" />}
                    {source.source === 'News' && <Calendar className="h-4 w-4 text-green-400" />}
                    {source.source === 'Forums' && <TrendingUp className="h-4 w-4 text-purple-400" />}
                    <span className="text-sm text-gray-300">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-400">{source.mentions}</span>
                    <div className="w-12 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${source.sentiment}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-300 w-8">{source.sentiment}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
