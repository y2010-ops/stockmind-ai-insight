
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Send, TrendingUp, Brain, Zap } from 'lucide-react';
import { useAIAnalysis } from '@/hooks/useAIAnalysis';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: string[];
  analysis?: any;
}

interface ChatInterfaceProps {
  selectedStock: string;
}

export const ChatInterface = ({ selectedStock }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI stock assistant powered by advanced machine learning models. I can analyze ${selectedStock} using real-time sentiment analysis, technical indicators, and predictive algorithms. What would you like to know?`,
      timestamp: new Date(),
      sources: ['Hugging Face AI', 'DistilBERT Sentiment Model', 'Technical Analysis Engine', 'Indian Market Data']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const { analysis, sentiment, isLoading, error, analyzeStockWithAI } = useAIAnalysis(selectedStock);

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

    // Get AI analysis
    await analyzeStockWithAI(currentQuery);
  };

  // Add AI response when analysis completes
  React.useEffect(() => {
    if (analysis && !isLoading) {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: analysis.summary,
        timestamp: new Date(),
        sources: [
          'DistilBERT Sentiment Analysis', 
          'Technical Indicators Engine', 
          'NSE Real-time Data', 
          'AI Prediction Algorithm',
          'Indian Market News Feed'
        ],
        analysis: {
          sentiment: analysis.sentiment,
          confidence: `${Math.round(analysis.confidence * 100)}%`,
          prediction: analysis.prediction,
          recommendation: analysis.recommendation,
          technicalIndicators: analysis.technicalIndicators
        }
      };
      setMessages(prev => [...prev, aiResponse]);
    }
  }, [analysis, isLoading]);

  const suggestions = [
    `What's the AI sentiment prediction for ${selectedStock}?`,
    `Should I buy ${selectedStock} based on technical analysis?`,
    `Compare ${selectedStock} fundamentals to sector average`,
    `What are the AI-predicted risks for ${selectedStock}?`,
    `${selectedStock} technical indicators analysis`,
    `Predict ${selectedStock} price movement using ML`
  ];

  return (
    <Card className="stock-card h-96">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-white/10">
          <div className="gradient-accent p-2 rounded-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <span>AI Stock Assistant</span>
              <Zap className="h-4 w-4 text-yellow-400" />
            </h3>
            <p className="text-sm text-gray-400">Powered by Hugging Face ML Models</p>
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
                
                {/* AI Analysis Results */}
                {message.analysis && (
                  <div className="mt-3 p-3 bg-white/10 rounded-lg border border-white/20">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-300">AI Sentiment:</span>
                        <span className={`ml-1 font-semibold ${
                          message.analysis.sentiment === 'bullish' ? 'text-green-400' :
                          message.analysis.sentiment === 'bearish' ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {message.analysis.sentiment}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-300">Confidence:</span>
                        <span className="ml-1 text-blue-400">{message.analysis.confidence}</span>
                      </div>
                      <div>
                        <span className="text-gray-300">Recommendation:</span>
                        <span className={`ml-1 font-semibold ${
                          message.analysis.recommendation === 'buy' ? 'text-green-400' :
                          message.analysis.recommendation === 'sell' ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {message.analysis.recommendation.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-300">RSI:</span>
                        <span className="ml-1 text-purple-400">{Math.round(message.analysis.technicalIndicators.rsi)}</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/20">
                      <p className="text-xs text-gray-300 italic">{message.analysis.prediction}</p>
                    </div>
                  </div>
                )}

                {message.sources && (
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <p className="text-xs text-gray-300">AI Models & Sources:</p>
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
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-xs text-gray-300">AI analyzing with ML models...</span>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-start">
              <div className="bg-red-500/20 border border-red-500/30 p-3 rounded-lg">
                <p className="text-sm text-red-300">AI Error: {error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">Try asking AI:</p>
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
            placeholder="Ask AI about any Indian stock..."
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
