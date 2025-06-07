
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ChatInterface } from '@/components/ChatInterface';
import { StockTicker } from '@/components/StockTicker';
import { SentimentDashboard } from '@/components/SentimentDashboard';
import { NewsTimeline } from '@/components/NewsTimeline';
import { TrendingStocks } from '@/components/TrendingStocks';

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<string>('AAPL');

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              <span className="gradient-text">StockMind</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI-powered stock analysis with real-time sentiment tracking. 
              Ask questions, get insights, make informed decisions.
            </p>
          </div>
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Chat & Ticker */}
            <div className="lg:col-span-2 space-y-8">
              <ChatInterface selectedStock={selectedStock} />
              <StockTicker onStockSelect={setSelectedStock} />
            </div>
            
            {/* Right Column - Trending Stocks */}
            <div className="space-y-8">
              <TrendingStocks onStockSelect={setSelectedStock} />
            </div>
          </div>
          
          {/* Bottom Section - Analytics */}
          <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-8">
            <SentimentDashboard selectedStock={selectedStock} />
            <NewsTimeline selectedStock={selectedStock} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
