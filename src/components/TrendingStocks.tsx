
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
    { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 2834.50, change: 145.20, changePercent: 5.40, sentiment: 'bullish', mentions: 3240 },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 634.75, change: -23.45, changePercent: -3.56, sentiment: 'bearish', mentions: 2890 },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 6745.30, change: 234.80, changePercent: 3.61, sentiment: 'bullish', mentions: 2150 },
    { symbol: 'LT', name: 'Larsen & Toubro', price: 2456.90, change: 45.60, changePercent: 1.89, sentiment: 'neutral', mentions: 1680 },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 845.25, change: 67.40, changePercent: 8.67, sentiment: 'bullish', mentions: 1420 }
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
          <h3 className="font-semibold text-white">Trending Indian Stocks</h3>
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
                <p className="text-lg font-bold text-white">₹{stock.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)}
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
