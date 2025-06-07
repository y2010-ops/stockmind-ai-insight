
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';

interface TrendingStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  mentions: number;
}

interface TrendingStocksProps {
  onStockSelect: (symbol: string) => void;
}

export const TrendingStocks = ({ onStockSelect }: TrendingStocksProps) => {
  const trendingStocks: TrendingStock[] = [
    { symbol: 'NVDA', name: 'NVIDIA', price: 721.33, change: 12.45, changePercent: 1.76, sentiment: 'bullish', mentions: 2450 },
    { symbol: 'TSLA', name: 'Tesla', price: 248.73, change: -3.21, changePercent: -1.27, sentiment: 'bearish', mentions: 1890 },
    { symbol: 'GME', name: 'GameStop', price: 18.45, change: 2.34, changePercent: 14.56, sentiment: 'bullish', mentions: 1650 },
    { symbol: 'AMC', name: 'AMC Entertainment', price: 4.12, change: 0.23, changePercent: 5.91, sentiment: 'neutral', mentions: 980 },
    { symbol: 'PLTR', name: 'Palantir', price: 17.89, change: 1.45, changePercent: 8.83, sentiment: 'bullish', mentions: 750 }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'bg-green-500/20 text-green-400';
      case 'bearish': return 'bg-red-500/20 text-red-400';
      default: return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  return (
    <Card className="stock-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="gradient-secondary p-2 rounded-lg">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Trending Stocks</h3>
          <p className="text-sm text-gray-400">Most discussed today</p>
        </div>
      </div>

      <div className="space-y-4">
        {trendingStocks.map((stock, index) => (
          <div
            key={stock.symbol}
            onClick={() => onStockSelect(stock.symbol)}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{stock.symbol}</h4>
                  <p className="text-xs text-gray-400">{stock.name}</p>
                </div>
              </div>
              <Badge className={getSentimentColor(stock.sentiment)}>
                {stock.sentiment}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-white">${stock.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                  </span>
                  <span className={`text-sm ${
                    stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 text-gray-400">
                  <Users className="h-3 w-3" />
                  <span className="text-xs">{stock.mentions}</span>
                </div>
                <p className="text-xs text-gray-500">mentions</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
