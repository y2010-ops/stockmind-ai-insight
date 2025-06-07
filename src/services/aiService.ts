
import { HfInference } from '@huggingface/inference';

// Free tier Hugging Face inference client
const hf = new HfInference(); // No API key needed for free tier

export interface StockAnalysis {
  summary: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  prediction: string;
  technicalIndicators: {
    rsi: number;
    macd: string;
    support: number;
    resistance: number;
  };
  recommendation: 'buy' | 'sell' | 'hold';
}

export interface SentimentResult {
  score: number;
  label: 'POSITIVE' | 'NEGATIVE';
  confidence: number;
}

// Advanced sentiment analysis using DistilBERT
export const analyzeSentiment = async (text: string): Promise<SentimentResult> => {
  try {
    const result = await hf.textClassification({
      model: 'distilbert-base-uncased-finetuned-sst-2-english',
      inputs: text
    });

    const sentiment = result[0];
    return {
      score: sentiment.label === 'POSITIVE' ? sentiment.score : -sentiment.score,
      label: sentiment.label as 'POSITIVE' | 'NEGATIVE',
      confidence: sentiment.score
    };
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    // Fallback to simple keyword analysis
    return simpleKeywordSentiment(text);
  }
};

// Fallback sentiment analysis using keyword matching
const simpleKeywordSentiment = (text: string): SentimentResult => {
  const positiveWords = ['bullish', 'buy', 'growth', 'profit', 'up', 'gain', 'positive', 'strong', 'good'];
  const negativeWords = ['bearish', 'sell', 'loss', 'down', 'fall', 'negative', 'weak', 'bad', 'decline'];
  
  const words = text.toLowerCase().split(' ');
  const positiveCount = words.filter(word => positiveWords.includes(word)).length;
  const negativeCount = words.filter(word => negativeWords.includes(word)).length;
  
  const score = (positiveCount - negativeCount) / words.length;
  const label = score > 0 ? 'POSITIVE' : 'NEGATIVE';
  
  return {
    score,
    label,
    confidence: Math.abs(score)
  };
};

// Advanced stock analysis with AI prediction algorithms
export const analyzeStock = async (symbol: string, query: string): Promise<StockAnalysis> => {
  try {
    // Get current stock data (mock for now, can be replaced with real API)
    const stockData = await getStockData(symbol);
    
    // Calculate technical indicators
    const technicalIndicators = calculateTechnicalIndicators(stockData);
    
    // Analyze sentiment from query
    const sentiment = await analyzeSentiment(query);
    
    // Generate AI-powered summary using text generation
    const summary = await generateStockSummary(symbol, stockData, sentiment);
    
    // Make prediction based on technical analysis and sentiment
    const prediction = generatePrediction(technicalIndicators, sentiment);
    
    return {
      summary,
      sentiment: sentiment.score > 0.1 ? 'bullish' : sentiment.score < -0.1 ? 'bearish' : 'neutral',
      confidence: sentiment.confidence,
      prediction,
      technicalIndicators,
      recommendation: getRecommendation(technicalIndicators, sentiment)
    };
  } catch (error) {
    console.error('Stock analysis error:', error);
    return getFallbackAnalysis(symbol);
  }
};

// Generate AI-powered stock summary
const generateStockSummary = async (symbol: string, stockData: any, sentiment: SentimentResult): Promise<string> => {
  try {
    const prompt = `Analyze ${symbol} stock: Current price ₹${stockData.price}, change ${stockData.change}%. Market sentiment: ${sentiment.label}. Provide brief analysis.`;
    
    // Use Hugging Face text generation (free tier)
    const result = await hf.textGeneration({
      model: 'gpt2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7
      }
    });
    
    return result.generated_text || getFallbackSummary(symbol, stockData);
  } catch (error) {
    console.error('Text generation error:', error);
    return getFallbackSummary(symbol, stockData);
  }
};

// Technical indicators calculation algorithms
const calculateTechnicalIndicators = (stockData: any) => {
  // Simplified technical analysis algorithms
  const price = stockData.price;
  const change = stockData.change;
  
  // RSI calculation (simplified)
  const rsi = 50 + (change * 2); // Simplified RSI based on price change
  const normalizedRsi = Math.max(0, Math.min(100, rsi));
  
  // MACD signal (simplified)
  const macd = change > 0 ? 'bullish crossover' : 'bearish crossover';
  
  // Support and resistance levels (simplified)
  const support = price * 0.95;
  const resistance = price * 1.05;
  
  return {
    rsi: normalizedRsi,
    macd,
    support,
    resistance
  };
};

// AI prediction algorithm
const generatePrediction = (indicators: any, sentiment: SentimentResult): string => {
  const { rsi } = indicators;
  const sentimentScore = sentiment.score;
  
  // Combine technical and sentiment analysis
  const technicalSignal = rsi > 70 ? -1 : rsi < 30 ? 1 : 0;
  const sentimentSignal = sentimentScore > 0.2 ? 1 : sentimentScore < -0.2 ? -1 : 0;
  
  const combinedSignal = (technicalSignal + sentimentSignal) / 2;
  
  if (combinedSignal > 0.3) {
    return "AI prediction: Strong upward momentum expected. Technical indicators and sentiment align bullishly.";
  } else if (combinedSignal < -0.3) {
    return "AI prediction: Downward pressure likely. Technical indicators and sentiment suggest caution.";
  } else {
    return "AI prediction: Sideways movement expected. Mixed signals from technical and sentiment analysis.";
  }
};

// Get trading recommendation
const getRecommendation = (indicators: any, sentiment: SentimentResult): 'buy' | 'sell' | 'hold' => {
  const { rsi } = indicators;
  const sentimentScore = sentiment.score;
  
  if (rsi < 30 && sentimentScore > 0) return 'buy';
  if (rsi > 70 && sentimentScore < 0) return 'sell';
  return 'hold';
};

// Mock stock data (replace with real API)
const getStockData = async (symbol: string) => {
  const mockData = {
    'RELIANCE': { price: 2456.75, change: 1.41 },
    'TCS': { price: 3678.90, change: -1.22 },
    'HDFCBANK': { price: 1634.50, change: 1.44 },
    'INFY': { price: 1445.25, change: -1.28 }
  };
  
  return mockData[symbol as keyof typeof mockData] || { price: 1000, change: 0 };
};

// Fallback responses
const getFallbackAnalysis = (symbol: string): StockAnalysis => ({
  summary: `${symbol} shows mixed signals in current market conditions. Consider fundamental analysis alongside technical indicators for investment decisions.`,
  sentiment: 'neutral',
  confidence: 0.6,
  prediction: "Market volatility suggests cautious approach with proper risk management.",
  technicalIndicators: {
    rsi: 50,
    macd: 'neutral',
    support: 1000,
    resistance: 1100
  },
  recommendation: 'hold'
});

const getFallbackSummary = (symbol: string, stockData: any): string => {
  return `${symbol} is currently trading at ₹${stockData.price} with a ${stockData.change}% change. Technical analysis suggests ${stockData.change > 0 ? 'positive' : 'negative'} momentum in the short term.`;
};
