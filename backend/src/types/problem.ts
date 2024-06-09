export type LeetCodeProblemResponse = {
  title: string;
  content: string | null;
  isPaidOnly: boolean;
  difficulty: string;
  exampleTestcases: string;
  hints: string[];
  sanpleTestcase: string;
  topicTags: { name: string; id: string; slug: string }[];
};

export type ProblemInput = {
  title: string;
  content: string;
  topics: string[];
  hints: string[];
};
