import axios from 'axios';
import { LeetCodeProblemResponse } from 'types/problem';

export const fetchLeetCodeProblem = async (title: string) => {
  const query = `
    query getQuestionDetail($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        title
        content
        difficulty
        exampleTestcases
        companyTagStats
        stats
        hints
        sampleTestCase

        topicTags {
          name
          id
          slug          
        }
        isPaidOnly
      }
    }
  `;

  const variables = {
    titleSlug: title,
  };

  const response = await axios.post<{ data: { question: LeetCodeProblemResponse } }>('https://leetcode.com/graphql', {
    query,
    variables,
  });

  const data = response.data.data.question;

  return data;
};
