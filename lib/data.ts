
export interface Trend {
  id: string;
  title: string;
  category: 'Model' | 'Business' | 'Research' | 'Application' | 'Ethics';
  summary: string;
  source: string;
  date: string;
  impactScore: number; // 1-10
  tags: string[];
  url?: string;
}

export const trends: Trend[] = [
  {
    id: '1',
    title: 'Google Launches Gemini 3 & Agentic Platform "Antigravity"',
    category: 'Model',
    summary: 'Google has released Gemini 3 alongside a new "Antigravity" agentic coding platform. The models feature advanced reasoning capabilities and deep integration with Workspace.',
    source: 'The AI Track',
    date: 'Dec 9, 2025',
    impactScore: 10,
    tags: ['Google', 'Gemini 3', 'Agents', 'Coding'],
  },
  {
    id: '2',
    title: 'Anthropic Claude Opus 4.5 Released',
    category: 'Model',
    summary: 'The new Claude Opus 4.5 sets benchmarks in software engineering tasks, reportedly outperforming all existing competitors in code generation and debugging.',
    source: 'Humai Blog',
    date: 'Dec 8, 2025',
    impactScore: 9,
    tags: ['Anthropic', 'Claude', 'Coding', 'Benchmark'],
  },
  {
    id: '3',
    title: '$30B Compute Alliance: Microsoft, NVIDIA, Anthropic',
    category: 'Business',
    summary: 'A massive strategic alliance has been formed to build the next generation of AI compute infrastructure, valued at over $30 billion.',
    source: 'The AI Track',
    date: 'Dec 10, 2025',
    impactScore: 10,
    tags: ['Infrastructure', 'Microsoft', 'NVIDIA', 'Investment'],
  },
  {
    id: '4',
    title: 'Dementia Detection Breakthrough via EEG AI',
    category: 'Application',
    summary: 'New AI models can now accurately detect early signs of Dementia using standard EEG signals, paving the way for non-invasive early diagnosis.',
    source: 'Crescendo AI',
    date: 'Dec 7, 2025',
    impactScore: 8,
    tags: ['Healthcare', 'EEG', 'Dementia', 'MedTech'],
  },
  {
    id: '5',
    title: 'GPT-5 Enterpise Early Access Expands',
    category: 'Model',
    summary: 'OpenAI has opened GPT-5 access to select enterprise partners, citing major reductions in hallucinations and improved long-context reasoning.',
    source: 'Enterprise Times',
    date: 'Dec 6, 2025',
    impactScore: 9,
    tags: ['OpenAI', 'GPT-5', 'Enterprise'],
  },
  {
    id: '6',
    title: 'Rise of "Agentic AI" in the Workplace',
    category: 'Research',
    summary: 'Reports indicate a 33% expected integration of autonomous AI agents in enterprise software by 2028, moving from chatbots to action-taking agents.',
    source: 'Forbes',
    date: 'Dec 5, 2025',
    impactScore: 7,
    tags: ['Agents', 'Automation', 'Future of Work'],
  }
];
