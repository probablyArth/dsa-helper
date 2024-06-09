import { URL } from 'url';

export const extractProblemName = (problem_url: string) => {
  let url: URL;
  try {
    url = new URL(problem_url);
    if (url.hostname === 'leetcode.com') {
      return extractLeetCodeProblem(url.pathname);
    }
    return null;
  } catch (e) {
    return null;
  }
};

const extractLeetCodeProblem = (path: string) => {
  const s = path.split('/');
  if (s.length < 3) return null;
  if (s[1] !== 'problems') return null;
  return s[2];
};
