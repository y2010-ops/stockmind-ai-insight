
import { analyzeSentiment } from './aiService';

export interface BatchSentimentResult {
  overall: number;
  sources: {
    reddit: number;
    twitter: number;
    news: number;
  };
  confidence: number;
  trending: 'up' | 'down' | 'stable';
}

// Advanced multi-source sentiment analysis
export const analyzeBatchSentiment = async (
  redditPosts: string[],
  tweets: string[],
  newsHeadlines: string[]
): Promise<BatchSentimentResult> => {
  try {
    // Analyze sentiment from multiple sources in parallel
    const [redditSentiments, twitterSentiments, newsSentiments] = await Promise.all([
      Promise.all(redditPosts.map(post => analyzeSentiment(post))),
      Promise.all(tweets.map(tweet => analyzeSentiment(tweet))),
      Promise.all(newsHeadlines.map(headline => analyzeSentiment(headline)))
    ]);

    // Calculate average sentiment for each source
    const redditAvg = calculateAverageSentiment(redditSentiments);
    const twitterAvg = calculateAverageSentiment(twitterSentiments);
    const newsAvg = calculateAverageSentiment(newsSentiments);

    // Weight sources differently (news has more weight)
    const overall = (redditAvg * 0.3 + twitterAvg * 0.3 + newsAvg * 0.4);
    
    // Calculate confidence based on agreement between sources
    const confidence = calculateConfidence([redditAvg, twitterAvg, newsAvg]);
    
    // Determine trending direction
    const trending = overall > 0.1 ? 'up' : overall < -0.1 ? 'down' : 'stable';

    return {
      overall: Math.round(overall * 100) / 100,
      sources: {
        reddit: Math.round(redditAvg * 100) / 100,
        twitter: Math.round(twitterAvg * 100) / 100,
        news: Math.round(newsAvg * 100) / 100
      },
      confidence,
      trending
    };
  } catch (error) {
    console.error('Batch sentiment analysis error:', error);
    return getFallbackSentiment();
  }
};

const calculateAverageSentiment = (sentiments: any[]) => {
  if (sentiments.length === 0) return 0;
  return sentiments.reduce((sum, s) => sum + s.score, 0) / sentiments.length;
};

const calculateConfidence = (scores: number[]) => {
  // Calculate standard deviation to measure agreement
  const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);
  
  // Higher agreement = higher confidence
  return Math.max(0, 1 - stdDev);
};

const getFallbackSentiment = (): BatchSentimentResult => ({
  overall: 0.1,
  sources: {
    reddit: 0.05,
    twitter: 0.1,
    news: 0.15
  },
  confidence: 0.7,
  trending: 'stable'
});

// Mock data for sentiment sources (replace with real APIs)
export const getMockSentimentData = (symbol: string) => {
  const redditPosts = [
    `${symbol} looking bullish with strong quarterly results`,
    `Bought more ${symbol} on the dip, fundamental story remains strong`,
    `${symbol} management guidance looks positive for next quarter`
  ];
  
  const tweets = [
    `${symbol} breaking resistance levels with good volume`,
    `${symbol} institutional buying spotted, price target raised`,
    `Sector rotation favoring ${symbol} type stocks`
  ];
  
  const newsHeadlines = [
    `${symbol} Reports Strong Q3 Results, Beats Street Estimates by 15%`,
    `Brokerages Upgrade ${symbol} Price Target to ₹2,800`,
    `${symbol} Announces Strategic Partnership with Government Initiative`
  ];
  
  return { redditPosts, tweets, newsHeadlines };
};
