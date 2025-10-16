export interface ModerationResult {
  allowed: boolean;
  action_reason: "allow" | "block" | "replace" | "review";
  reason: string;
  toxicity_score: number;
  categories: {
    insult: number;
    hate: number;
    sexual: number;
    threat: number;
    spam: number;
  };
  bad_words: string[];
  normalized_text: string;
  suggested_replacement: string;
  confidence: number;
}
