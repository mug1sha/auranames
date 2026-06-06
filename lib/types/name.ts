export interface StandardName {
  name: string;
  meaning?: string;
}

export interface RecommendedName {
  name: string;
  definition: string;
}

export interface GenerationResponse {
  success: boolean;
  curatedNames: StandardName[];
  recommendedNames: RecommendedName[];
  error?: string;
}

