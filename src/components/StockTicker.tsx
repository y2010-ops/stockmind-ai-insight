
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface StockTickerProps {
  onStockSelect: (symbol: string) => void;
}

export const StockTicker = ({ onStockSelect }: StockTickerProps) => {
  const stocks: Stock[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.85, change: 2.45, changePercent: 1.39 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.12, change: -1.23, changePercent: -0.86 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 4.67, changePercent: 1.25 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.73, change: -3.21, changePercent: -1.27 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 153.45, change: 1.89, changePercent: 1.25 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 721.33, change: 12.45, changePercent: 1.76 }
  ];

  return (
    <Card className="stock-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Market Overview</h3>
        <span className="text-sm text-gray-400">Real-time prices</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => onStockSelect(stock.symbol)}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-white">{stock.symbol}</h4>
                <p className="text-xs text-gray-400 truncate">{stock.name}</p>
              </div>
              <div className={`p-1 rounded ${stock.change >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {stock.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
              </div>
            </div>
            
            <div className="space-y-1">
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
          </div>
        ))}
      </div>
    </Card>
  );
};
