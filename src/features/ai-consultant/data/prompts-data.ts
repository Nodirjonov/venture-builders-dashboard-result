export interface PromptItem {
  text: string
}

export interface PromptCategory {
  title: string
  items: PromptItem[]
}

export const promptsData: PromptCategory[] = [
  {
    title: 'Blog',
    items: [
      { text: 'Get a list of blog post ideas' },
      { text: 'Write a blog post' },
      { text: 'Write a how-to guide style blog post' },
      { text: 'Write a listicle style blog post' },
      { text: 'Write an interview style blog post' },
      { text: 'Write a product review style blog post' },
      { text: 'Write an opinion piece style blog post' },
      { text: 'Write a new update style blog post' },
    ],
  },
  {
    title: 'Social Media',
    items: [
      { text: 'Write a social media post for Instagram' },
      { text: 'Write a social media post for Twitter/X' },
      { text: 'Write a social media post for LinkedIn' },
      { text: 'Write a social media post for Facebook' },
      { text: 'Create a social media content calendar' },
      { text: 'Generate hashtag ideas for my brand' },
      { text: 'Write a viral tweet thread' },
      { text: 'Create Instagram carousel content ideas' },
    ],
  },
  {
    title: 'Email Marketing',
    items: [
      { text: 'Write a welcome email for new subscribers' },
      { text: 'Write a promotional email for a product launch' },
      { text: 'Write a newsletter email' },
      { text: 'Write a re-engagement email for inactive subscribers' },
      { text: 'Write an abandoned cart email' },
      { text: 'Write a customer testimonial request email' },
      { text: 'Create an email drip campaign sequence' },
      { text: 'Write a seasonal promotion email' },
    ],
  },
  {
    title: 'Website Copy',
    items: [
      { text: 'Write a homepage headline and subheadline' },
      { text: 'Write an About Us page' },
      { text: 'Write product/service descriptions' },
      { text: 'Write a landing page for a specific campaign' },
      { text: 'Write a FAQ page' },
      { text: 'Write a testimonials page' },
      { text: 'Write a careers page' },
      { text: 'Write calls-to-action for key pages' },
    ],
  },
  {
    title: 'SEO',
    items: [
      { text: 'Generate a list of SEO keywords for my business' },
      { text: 'Write SEO-optimized meta descriptions' },
      { text: 'Create an SEO content strategy' },
      { text: 'Write an SEO-optimized blog post' },
      { text: 'Suggest internal linking opportunities' },
      { text: 'Write alt text for my website images' },
      { text: 'Create a local SEO strategy' },
      { text: 'Analyze competitor SEO keywords' },
    ],
  },
  {
    title: 'Advertising',
    items: [
      { text: 'Write Google Ads copy' },
      { text: 'Write Facebook/Instagram ad copy' },
      { text: 'Write LinkedIn ad copy' },
      { text: 'Create ad variations for A/B testing' },
      { text: 'Write a retargeting ad campaign' },
      { text: 'Suggest ad targeting strategies' },
      { text: 'Write a press release' },
      { text: 'Create a media kit' },
    ],
  },
  {
    title: 'Branding',
    items: [
      { text: 'Generate brand name ideas' },
      { text: 'Write a brand tagline/slogan' },
      { text: 'Define my brand voice and tone' },
      { text: 'Create a brand story' },
      { text: 'Write a brand positioning statement' },
      { text: 'Create a brand style guide outline' },
      { text: 'Define brand values and mission statement' },
      { text: 'Write an elevator pitch for my brand' },
    ],
  },
  {
    title: 'Sales',
    items: [
      { text: 'Write a cold outreach email' },
      { text: 'Write a sales pitch script' },
      { text: 'Create a sales proposal template' },
      { text: 'Write follow-up emails for sales leads' },
      { text: 'Create objection handling responses' },
      { text: 'Write a case study' },
      { text: 'Create a product demo script' },
      { text: 'Write a partnership proposal' },
    ],
  },
]

export const questionsData: PromptCategory[] = [
  {
    title: 'Business Model and Strategy',
    items: [
      { text: 'What type of business model should I consider?' },
      { text: 'How can I differentiate my business from competitors?' },
      { text: 'What is the best value proposition for my target market?' },
      {
        text: 'Should I focus on breadth (variety) or depth (specialization)?',
      },
      { text: 'How scalable is my business idea?' },
      { text: 'How should I price my product/service?' },
      { text: 'Should I consider a freemium model?' },
      { text: 'What is the best go-to-market strategy?' },
    ],
  },
  {
    title: 'Target Market',
    items: [
      { text: 'Who is my ideal customer?' },
      { text: 'What are the demographics of my target market?' },
      { text: 'What pain points does my target market have?' },
      { text: 'How large is my target market?' },
      { text: 'What are the buying habits of my target audience?' },
      { text: 'Are there underserved segments I can target?' },
      { text: 'How do I create customer personas?' },
      { text: 'What channels does my target audience prefer?' },
    ],
  },
  {
    title: 'Competition',
    items: [
      { text: 'Who are my main competitors?' },
      { text: 'What are my competitors doing well?' },
      { text: 'What gaps exist in my competitors offerings?' },
      { text: 'How do I conduct a competitive analysis?' },
      { text: 'What is my unique selling proposition vs competitors?' },
      { text: 'Should I compete on price or quality?' },
      { text: 'How do I stay ahead of competitors?' },
      { text: 'What barriers to entry exist in my market?' },
    ],
  },
  {
    title: 'Revenue and Financials',
    items: [
      { text: 'What revenue model is best for my business?' },
      { text: 'How do I create a financial projection?' },
      { text: 'What are my expected startup costs?' },
      { text: 'How long until I break even?' },
      { text: 'What key financial metrics should I track?' },
      { text: 'How do I manage cash flow effectively?' },
      { text: 'What funding options are available for my business?' },
      { text: 'How do I calculate my burn rate?' },
    ],
  },
  {
    title: 'Marketing and Growth',
    items: [
      { text: 'What marketing channels should I focus on?' },
      { text: 'How do I build brand awareness?' },
      { text: 'What is the best content marketing strategy?' },
      { text: 'How do I calculate customer acquisition cost?' },
      { text: 'What growth hacking strategies can I use?' },
      { text: 'How do I create a referral program?' },
      { text: 'Should I invest in paid advertising early on?' },
      { text: 'How do I measure marketing ROI?' },
    ],
  },
  {
    title: 'Product Development',
    items: [
      { text: 'How do I validate my product idea?' },
      { text: 'What features should I prioritize for my MVP?' },
      { text: 'How do I gather user feedback effectively?' },
      { text: 'What is the ideal product development timeline?' },
      { text: 'Should I build in-house or outsource development?' },
      { text: 'How do I protect my intellectual property?' },
      { text: 'What is the best approach to product iteration?' },
      { text: 'How do I conduct user testing?' },
    ],
  },
  {
    title: 'Team and Operations',
    items: [
      { text: 'What roles should I hire for first?' },
      { text: 'How do I find and attract top talent?' },
      { text: 'Should I hire employees or contractors?' },
      { text: 'How do I build a strong company culture?' },
      { text: 'What operational processes should I establish early?' },
      { text: 'How do I manage a remote team effectively?' },
      { text: 'What tools and software does my team need?' },
      { text: 'How should I structure equity for co-founders?' },
    ],
  },
  {
    title: 'Legal and Compliance',
    items: [
      { text: 'What legal structure should my business have?' },
      { text: 'What licenses and permits do I need?' },
      { text: 'How do I protect customer data and privacy?' },
      { text: 'What contracts do I need for my business?' },
      { text: 'Do I need terms of service and privacy policy?' },
      { text: 'How do I handle intellectual property rights?' },
      { text: 'What insurance does my business need?' },
      { text: 'How do I comply with industry regulations?' },
    ],
  },
]
