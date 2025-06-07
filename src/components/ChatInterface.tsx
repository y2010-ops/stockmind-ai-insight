
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Send, TrendingUp } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: string[];
}

interface ChatInterfaceProps {
  selectedStock: string;
}

export const ChatInterface = ({ selectedStock }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI stock assistant for Indian markets. I can help you analyze ${selectedStock} or any other NSE/BSE stock with real-time data, sentiment analysis, and market insights. What would you like to know?`,
      timestamp: new Date(),
      sources: ['NSE Data', 'BSE Data', 'Indian News Feed', 'Social Sentiment']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getStockAnalysis = (stock: string, query: string) => {
    const responses = [
      `Based on current NSE data for ${stock}, the stock shows strong fundamentals with good quarterly results. Recent earnings beat estimates by 12% and the company has announced a dividend of ₹8 per share. Technical indicators suggest bullish momentum with RSI at 65.`,
      `${stock} is trading above its 50-day moving average on NSE. The stock has strong institutional backing with FII holding at 23%. Recent news about their expansion in tier-2 cities has boosted investor confidence. Price target revised to ₹2,400 by leading brokerages.`,
      `Current analysis for ${stock}: The stock is showing consolidation pattern with support at ₹1,850. Q3 results exceeded expectations with 18% YoY growth. Management guidance for FY24 remains positive. Mutual fund holdings increased by 2.3% last quarter.`,
      `${stock} technical analysis: Stock broke above resistance at ₹2,100 with good volumes. MACD showing positive crossover. Company's recent tie-up with government projects and strong order book makes it attractive for long-term investors.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuery = inputValue;
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response with realistic delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getStockAnalysis(selectedStock, currentQuery),
        timestamp: new Date(),
        sources: ['NSE Real-time Data', 'BSE Data', 'Economic Times', 'MoneyControl', 'Indian Express Business']
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const suggestions = [
    `What's the sentiment for ${selectedStock}?`,
    `Should I buy ${selectedStock} now?`,
    `Compare ${selectedStock} to Nifty 50`,
    `What are the risks of investing in ${selectedStock}?`,
    `${selectedStock} technical analysis`,
    `${selectedStock} fundamental analysis`
  ];

  return (
    <Card className="stock-card h-96">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-white/10">
          <div className="gradient-accent p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Stock Assistant</h3>
            <p className="text-sm text-gray-400">Ask me about Indian stocks</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'gradient-primary text-white' 
                  : 'bg-white/10 text-gray-100'
              }`}>
                <p className="text-sm">{message.content}</p>
                {message.sources && (
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <p className="text-xs text-gray-300">Sources:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {message.sources.map((source, idx) => (
                        <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">Try asking:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.slice(0, 4).map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputValue(suggestion)}
                  className="text-left text-sm p-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about any Indian stock..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading}
            className="gradient-accent text-white border-0 hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
