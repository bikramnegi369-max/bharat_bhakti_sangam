export type Temple = {
  slug: string;
  name: string;
  description: string;
  descriptionImages: string[]; // Array of 2 image URLs related to the temple's description
  features: {
    title: string;
    featuresList: string[];
    featuresImages: string[]; // Array of 2 image URLs related to the temple's features
  };
  location: {
    title: string;
    description: string;
  };
  history: {
    title: string;
    description: string;
    historyImages: string[]; // Array of 2 image URLs related to the temple's history
  };
  bestTimeToVisit: string;
  timings: string;
  entryFee: string;
};

export type Temples = Temple[];
