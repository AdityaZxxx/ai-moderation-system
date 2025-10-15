// src/types.ts
export interface ModerationResult {
  is_offensive: boolean;
  toxicity_level: "None" | "Low" | "Medium" | "High" | "Severe";
  offending_words: string[];
  reason: string;
  suggested_action: "ALLOW" | "REVIEW" | "BLOCK";
}
