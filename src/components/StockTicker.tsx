
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
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 34.20, changePercent: 1.41 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3678.90, change: -45.30, changePercent: -1.22 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', price: 1634.50, change: 23.15, changePercent: 1.44 },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1445.25, change: -18.75, changePercent: -1.28 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', price: 945.80, change: 12.65, changePercent: 1.36 },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2387.40, change: 28.90, changePercent: 1.23 }
  ];

  return (
    <Card className="stock-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">NSE Market Overview</h3>
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
          </div>
        ))}
      </div>
    </Card>
  );
};
