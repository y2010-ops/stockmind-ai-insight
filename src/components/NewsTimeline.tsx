
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, TrendingUp, Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
  url: string;
}

interface NewsTimelineProps {
  selectedStock: string;
}

export const NewsTimeline = ({ selectedStock }: NewsTimelineProps) => {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: `${selectedStock} Reports Strong Q3 Results, Beats Street Estimates by 15%`,
      summary: 'Revenue growth exceeded analyst predictions driven by strong domestic demand and digital transformation initiatives across business segments.',
      source: 'Economic Times',
      timestamp: '2 hours ago',
      sentiment: 'positive',
      impact: 'high',
      url: '#'
    },
    {
      id: '2',
      title: `Brokerages Upgrade ${selectedStock} Price Target to ₹2,800`,
      summary: 'Leading investment firms raise target citing robust fundamentals, strong order book, and expansion in tier-2 cities.',
      source: 'MoneyControl',
      timestamp: '4 hours ago',
      sentiment: 'positive',
      impact: 'medium',
      url: '#'
    },
    {
      id: '3',
      title: `${selectedStock} Announces Strategic Partnership with Government Initiative`,
      summary: 'New collaboration under Make in India program expected to boost manufacturing capacity and create 5,000 jobs.',
      source: 'Business Standard',
      timestamp: '6 hours ago',
      sentiment: 'positive',
      impact: 'high',
      url: '#'
    },
    {
      id: '4',
      title: `FII Selling Pressure Affects ${selectedStock} Trading Volume`,
      summary: 'Increased volatility observed amid global market uncertainty and rupee depreciation concerns.',
      source: 'Mint',
      timestamp: '8 hours ago',
      sentiment: 'neutral',
      impact: 'low',
      url: '#'
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'negative': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-purple-500/20 text-purple-400';
      case 'medium': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <Card className="stock-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="gradient-accent p-2 rounded-lg">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">News Timeline</h3>
          <p className="text-sm text-gray-400">{selectedStock} - Latest updates</p>
        </div>
      </div>

      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-white mb-2 leading-tight">{item.title}</h4>
                <p className="text-sm text-gray-300 mb-3">{item.summary}</p>
                
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xs text-gray-400">{item.source}</span>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{item.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className={getSentimentColor(item.sentiment)}>
                    {item.sentiment}
                  </Badge>
                  <Badge className={getImpactColor(item.impact)}>
                    {item.impact} impact
                  </Badge>
                </div>
              </div>
              
              <button className="ml-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <button className="w-full p-3 text-center text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-white/10">
          Load More News
        </button>
      </div>
    </Card>
  );
};
