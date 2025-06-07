
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
      title: `${selectedStock} Reports Strong Q4 Earnings, Beats Expectations`,
      summary: 'Revenue growth exceeded analyst predictions by 15%, driven by strong product demand and market expansion.',
      source: 'Reuters',
      timestamp: '2 hours ago',
      sentiment: 'positive',
      impact: 'high',
      url: '#'
    },
    {
      id: '2',
      title: `Analyst Upgrades ${selectedStock} Price Target to $200`,
      summary: 'Major investment firm raises target citing innovative product pipeline and strong competitive position.',
      source: 'Bloomberg',
      timestamp: '4 hours ago',
      sentiment: 'positive',
      impact: 'medium',
      url: '#'
    },
    {
      id: '3',
      title: `${selectedStock} Announces Strategic Partnership with Tech Giant`,
      summary: 'New collaboration expected to accelerate growth in emerging markets and enhance technological capabilities.',
      source: 'TechCrunch',
      timestamp: '6 hours ago',
      sentiment: 'positive',
      impact: 'high',
      url: '#'
    },
    {
      id: '4',
      title: `Market Volatility Affects ${selectedStock} Trading Volume`,
      summary: 'Increased trading activity observed amid broader market uncertainty and sector rotation.',
      source: 'MarketWatch',
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
