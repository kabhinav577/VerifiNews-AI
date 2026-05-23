export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type MainTabParamList = {
  HomeStack: undefined;
  Feed: undefined;
  Search: undefined;
  ProfileStack: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  InputArticle: { initialUrl?: string } | undefined;
  Result: { prediction: string; confidence: number; explanation?: string; originalText?: string; isFromHistory?: boolean; created_at?: string; modelUsed?: string };
  History: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  History: undefined;
  Result: { prediction: string; confidence: number; explanation?: string; originalText?: string; isFromHistory?: boolean; created_at?: string; modelUsed?: string };
};
