
import { useState, useEffect } from 'react';
import { analyzeStock, StockAnalysis } from '@/services/aiService';
import { analyzeBatchSentiment, getMockSentimentData, BatchSentimentResult } from '@/services/sentimentAnalyzer';

export const useAIAnalysis = (selectedStock: string) => {
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [sentiment, setSentiment] = useState<BatchSentimentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeStockWithAI = async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`AI Analysis started for ${selectedStock}: ${query}`);
      
      // Run stock analysis and sentiment analysis in parallel
      const [stockAnalysis, sentimentData] = await Promise.all([
        analyzeStock(selectedStock, query),
        performSentimentAnalysis(selectedStock)
      ]);
      
      setAnalysis(stockAnalysis);
      setSentiment(sentimentData);
      
      console.log('AI Analysis completed:', { stockAnalysis, sentimentData });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'AI analysis failed';
      setError(errorMessage);
      console.error('AI Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const performSentimentAnalysis = async (symbol: string): Promise<BatchSentimentResult> => {
    const { redditPosts, tweets, newsHeadlines } = getMockSentimentData(symbol);
    return await analyzeBatchSentiment(redditPosts, tweets, newsHeadlines);
  };

  // Auto-analyze when stock changes
  useEffect(() => {
    if (selectedStock) {
      performSentimentAnalysis(selectedStock).then(setSentiment);
    }
  }, [selectedStock]);

  return {
    analysis,
    sentiment,
    isLoading,
    error,
    analyzeStockWithAI
  };
};
