export interface FeatureItem {
  id: string;
  slug: string;
  category: 'Smart Search' | 'Cart Bridge' | 'Web Scraper' | 'Customizer';
  title: string;
  tagline: string;
  description: string;
  badge: string;
  imageUrl: string;
  youtubeId: string;
  videoTitle: string;
  videoDescription: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  codeSnippet: string;
  previewDetails: {
    heading: string;
    subheading: string;
    points: { title: string; desc: string }[];
  };
}

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: '1',
    slug: 'rag-search',
    category: 'Smart Search',
    title: 'Smart Product Search & Recommendations',
    tagline: 'Understand buyer intent beyond simple keyword matching.',
    description:
      'Bypass rigid keyword search. Labto AI interprets natural buyer prompts and matches shoppers directly to relevant products from your catalog in real time.',
    badge: 'Intent Matching',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'pPjGf3_g33c',
    videoTitle: 'AI Shopping Assistant & Semantic Product Search',
    videoDescription: 'Watch how an intelligent AI shopping agent interprets natural shopper prompts and returns relevant catalog items in real time.',
    highlights: [
      'Natural language search (e.g. "Warm waterproof coat under $100")',
      'Automatic filtering by price range, variants, and stock status',
      'Multi-turn chat memory so shoppers can refine choices naturally',
    ],
    stats: [
      { label: 'Search Speed', value: '< 1.2s' },
      { label: 'Intent Accuracy', value: '99.4%' },
      { label: 'Stock Sync', value: 'Realtime' },
    ],
    codeSnippet: `Shopping Assistant: "I found 3 waterproof running shoes under $120 available in your size. Would you like to view them?"`,
    previewDetails: {
      heading: 'Natural Buyer Discovery',
      subheading: 'How Labto AI turns conversational queries into instant orders.',
      points: [
        {
          title: 'Conversational Product Finder',
          desc: 'Shoppers describe what they need in plain English instead of searching rigid keywords.',
        },
        {
          title: 'Smart Variant & Stock Filter',
          desc: 'Filters out-of-stock items and highlights matching colors, sizes, and price tiers automatically.',
        },
        {
          title: 'Contextual Multi-Turn Memory',
          desc: 'Remembers earlier questions so shoppers can compare choices without repeating themselves.',
        },
      ],
    },
  },
  {
    id: '2',
    slug: 'cart-bridge',
    category: 'Cart Bridge',
    title: 'Automated Add-To-Cart & Checkout Bridge',
    tagline: 'Turn buyer questions into instant orders right inside the chat.',
    description:
      'Eliminate checkout friction. Customers can add recommended items directly into their store cart from the AI chat window with a single click.',
    badge: '1-Click Add-to-Cart',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'dQ4ap929-Lk',
    videoTitle: 'Automated AI E-Commerce Add-to-Cart Bridge',
    videoDescription: 'See how conversational AI agents trigger native storefront cart mutations dynamically.',
    highlights: [
      '1-Click cart additions straight from chat product cards',
      'Automatic color, size, and variant selection resolution',
      'Compatible with Shopify, WooCommerce, Webflow, and custom stores',
    ],
    stats: [
      { label: 'Cart Action', value: '1-Click' },
      { label: 'Friction', value: 'Zero' },
      { label: 'Platform Sync', value: 'Instant' },
    ],
    codeSnippet: `Shopper: "Add the black medium jacket to my cart."
AI: "Done! The item has been added to your store cart."`,
    previewDetails: {
      heading: 'Decoupled Cart Orchestration',
      subheading: 'Seamless client-side cart injection across any modern e-commerce platform.',
      points: [
        {
          title: 'Instant In-Chat Cart Additions',
          desc: 'Shoppers add items to cart without leaving the conversation or switching pages.',
        },
        {
          title: 'Universal Store Compatibility',
          desc: 'Works out of the box with Shopify, WooCommerce, Webflow, BigCommerce, and Next.js.',
        },
        {
          title: 'Automatic Variant Resolution',
          desc: 'Resolves color, size, and packaging choices naturally before placing items in the cart.',
        },
      ],
    },
  },
  {
    id: '3',
    slug: 'knowledge-base',
    category: 'Web Scraper',
    title: 'Automated Web Scraper & Policy AI',
    tagline: 'Paste your website URL for automatic policy learning.',
    description:
      'Paste your website link and Labto AI automatically crawls your shipping, return, and FAQ pages so buyers get accurate customer support 24/7.',
    badge: '60s Auto Crawl',
    imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80',
    youtubeId: '3-M9G9y4lZc',
    videoTitle: 'Auto-Train AI on Your Website URL in 1 Minute',
    videoDescription: 'Step-by-step walkthrough of crawling store URLs and training an AI chatbot agent to answer store policy inquiries accurately.',
    highlights: [
      'Automated site crawling — just enter your website URL',
      'Answers shipping times, return policies, and warranty FAQs',
      'Strictly grounded answers with zero price or policy hallucination',
    ],
    stats: [
      { label: 'Setup Time', value: '60 Secs' },
      { label: 'Policy Accuracy', value: '100%' },
      { label: 'Support SLA', value: '24/7' },
    ],
    codeSnippet: `Shopper: "What is your return policy for international orders?"
AI: "We accept returns within 30 days of delivery. Free return labels are provided."`,
    previewDetails: {
      heading: 'Automated Knowledge Ingestion',
      subheading: 'Turn store policy pages into sub-second AI answers.',
      points: [
        {
          title: 'Automated Site Crawler',
          desc: 'Scrapes and indexes your FAQ and policy pages without manual copy-pasting.',
        },
        {
          title: 'Grounded Customer Support',
          desc: 'Provides exact policy information to reduce support ticket backlogs by up to 80%.',
        },
        {
          title: 'Instant Policy Sync',
          desc: 'Re-crawl your site at any time to keep AI knowledge up-to-date when policies change.',
        },
      ],
    },
  },
  {
    id: '4',
    slug: 'widget-customizer',
    category: 'Customizer',
    title: 'No-Code Store Brand Customizer',
    tagline: 'Match the AI assistant to your store\'s exact look and feel.',
    description:
      'Style the assistant to fit your brand. Customize primary colors, launcher icons, bot names, avatars, and initial greeting prompts from your merchant dashboard.',
    badge: 'Merchant Dashboard',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'kYJ-wL3m-64',
    videoTitle: 'How to Customize Your AI Chatbot Widget',
    videoDescription: 'A complete walkthrough of configuring themes, initial greetings, positioning, and testing live.',
    highlights: [
      'Custom brand color picker, launcher icons, and bot avatar',
      'Custom greeting messages and suggestion chips',
      'Live preview simulator before publishing to your store',
    ],
    stats: [
      { label: 'Setup Time', value: '< 2 Mins' },
      { label: 'CSS Required', value: '0 Lines' },
      { label: 'Theme Sync', value: 'Instant' },
    ],
    codeSnippet: `Dashboard Config: Primary Color = #1DBF73 | Bot Name = Shopping Assistant | Position = Bottom-Right`,
    previewDetails: {
      heading: 'Effortless Brand Alignment',
      subheading: 'Make the AI look and feel like an integral part of your store.',
      points: [
        {
          title: 'Live Preview Simulator',
          desc: 'Test chat styling and responses inside an interactive sandbox before going live.',
        },
        {
          title: 'Custom Brand Voice Tuning',
          desc: 'Adjust greeting phrasing, tone, and automated suggestion chips.',
        },
        {
          title: 'Zero Code Changes',
          desc: 'Changes saved in the dashboard reflect instantly on your live store without editing scripts.',
        },
      ],
    },
  },
];
