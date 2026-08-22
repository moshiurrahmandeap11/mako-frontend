export interface FeatureItem {
  id: string;
  slug: string;
  category: 'RAG Search' | 'Cart Bridge' | 'Knowledge Base' | 'AR Try-On' | 'Customizer';
  title: string;
  tagline: string;
  description: string;
  badge: string;
  youtubeId: string;
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
    category: 'RAG Search',
    title: 'Sub-Second RAG Vector Search Engine',
    tagline: 'Understand shopper purchase intent with cosine vector embeddings.',
    description:
      'Bypass rigid keyword matches. Labto AI leverages Gemini 2.0 Flash AI and PostgreSQL pgvector embeddings to deliver intelligent context-aware product recommendations in under 1.2 seconds.',
    badge: '1.2s Response Latency',
    youtubeId: 'dQw4w9WgXcQ', // Clean placeholder video
    highlights: [
      '1536-dimensional vector distance indexing with pgvector',
      'Real-time catalog stock synchronization and price filters',
      'Sub-second query-to-answer turnaround time',
      'Contextual multi-turn dialogue with memory preservation',
    ],
    stats: [
      { label: 'Search Latency', value: '< 1.2s' },
      { label: 'Intent Accuracy', value: '99.4%' },
      { label: 'Conversion Lift', value: '+34%' },
    ],
    codeSnippet: `// 1-Click Vector Recommendation Query
const recommendations = await labto.search({
  query: "Breathable running shoes under $120",
  limit: 4,
  inStockOnly: true
});`,
    previewDetails: {
      heading: 'Intelligent Query Vectorization',
      subheading: 'How Labto AI transforms ambiguous buyer queries into precise cart additions.',
      points: [
        {
          title: 'Semantic Distance Mapping',
          desc: 'Converts unstructured natural language prompts into high-dimensional vector embeddings, scoring match relevance with cosine similarity.',
        },
        {
          title: 'Hybrid Filter Layer',
          desc: 'Combines vector search with structured SQL filters (price ranges, available inventory, size tags) for zero hallucinated suggestions.',
        },
        {
          title: 'Streaming Typewriter Response',
          desc: 'Shoppers receive answers progressively in real-time, drastically reducing perceived waiting latency to zero.',
        },
      ],
    },
  },
  {
    id: '2',
    slug: 'cart-bridge',
    category: 'Cart Bridge',
    title: 'Storefront Cart Event Bridge',
    tagline: 'Direct client-side cart mutation with zero backend secret sharing.',
    description:
      'Triggers cart mutations dynamically by emitting standardized CustomEvents. Decoupled iframe architecture lets Shopify, WooCommerce, and custom Next.js stores add products with zero security risk.',
    badge: 'Standard CustomEvent',
    youtubeId: 'dQw4w9WgXcQ',
    highlights: [
      'Standardized `ai-widget:add-to-cart` window event dispatcher',
      'Zero exposure of merchant private API keys to client browsers',
      'Supports variants, SKU selections, and bulk quantity additions',
      'Automatic cart drawer slide-out triggers upon item mutation',
    ],
    stats: [
      { label: 'Event Latency', value: '15ms' },
      { label: 'Cart Abandonment Drop', value: '-28%' },
      { label: 'Direct Additions', value: '1-Click' },
    ],
    codeSnippet: `// Storefront Event Bridge Listener
window.addEventListener("ai-widget:add-to-cart", (event) => {
  const { productId, variantId, quantity } = event.detail;
  storefrontCart.addItem({ productId, variantId, quantity });
  storefrontCart.openDrawer();
});`,
    previewDetails: {
      heading: 'Decoupled Cart Orchestration',
      subheading: 'Seamless client-side cart injection across any modern e-commerce platform.',
      points: [
        {
          title: 'Cross-Domain PostMessage Security',
          desc: 'The iframe widget securely dispatches verified JSON payloads to the parent window without exposing private backend credentials.',
        },
        {
          title: 'Universal Platform Compatibility',
          desc: 'Works out of the box with Shopify Liquid, WooCommerce AJAX cart endpoints, BigCommerce, Magento, and custom React SPAs.',
        },
        {
          title: 'Instant Variant Resolution',
          desc: 'AI dynamically resolves color, size, and packaging variant IDs based on natural buyer dialogue before dispatching.',
        },
      ],
    },
  },
  {
    id: '3',
    slug: 'knowledge-base',
    category: 'Knowledge Base',
    title: 'PDF & Document Knowledge Indexer',
    tagline: 'Drop store manuals, warranty FAQs, and return policies for instant training.',
    description:
      'Drag and drop PDF, DOCX, or text files into your merchant console. Labto AI automatically parses, cleans, chunks, and indexes knowledge to answer customer service inquiries on autopilot.',
    badge: 'Multi-Format Ingestion',
    youtubeId: 'dQw4w9WgXcQ',
    highlights: [
      'Automatic PDF text extraction and semantic chunking',
      'Strict truth grounding with zero fabricated responses',
      'Tenant-isolated document vector collections',
      'Instant document activation and 1-click re-indexing',
    ],
    stats: [
      { label: 'Ingestion Speed', value: '500 pgs/min' },
      { label: 'Support Resolution', value: '82%' },
      { label: 'Hallucination Rate', value: '0.0%' },
    ],
    codeSnippet: `// Document Upload & Vectorization API
const response = await fetch('/api/knowledge-base/upload', {
  method: 'POST',
  headers: { 'x-api-key': 'YOUR_API_KEY' },
  body: formData // PDF or DOCX file stream
});`,
    previewDetails: {
      heading: 'Automated Ingestion Pipeline',
      subheading: 'Turn complex merchant knowledge documents into sub-second AI answers.',
      points: [
        {
          title: 'Recursive Character Chunking',
          desc: 'Splits lengthy policy handbooks into semantic paragraph chunks with optimal overlap to preserve context.',
        },
        {
          title: 'Source Attribution Citations',
          desc: 'AI provides exact page numbers and policy clauses when answering return/shipping inquiries.',
        },
        {
          title: 'Instant Document Synchronization',
          desc: 'Delete or update documents at any time with immediate vector index purge.',
        },
      ],
    },
  },
  {
    id: '4',
    slug: 'ar-tryon',
    category: 'AR Try-On',
    title: 'AR Live Camera Virtual Fitting Room',
    tagline: 'Real-time 60 FPS body landmark estimation powered by WebAssembly.',
    description:
      'Browser-based real-time 60 FPS body landmark estimation (Google MediaPipe Pose via WebAssembly). Shoppers can visually try on apparel live with zero server GPU cost.',
    badge: 'WebAssembly 60 FPS',
    youtubeId: 'dQw4w9WgXcQ',
    highlights: [
      '100% client-side WebAssembly computation (Zero cloud GPU fees)',
      'Real-time 33-point body and facial landmark tracking',
      'Zero video or camera frame retention for total user privacy',
      'Smooth responsive viewport scaling on mobile and desktop',
    ],
    stats: [
      { label: 'Framerate', value: '60 FPS' },
      { label: 'Server GPU Cost', value: '$0.00' },
      { label: 'Return Rate Reduction', value: '-42%' },
    ],
    codeSnippet: `// WebAssembly Landmark Fitting Room Hook
const { isTracking, bodyLandmarks } = useVirtualTryOn({
  modelPath: '/models/mediapipe-pose.wasm',
  targetCategory: 'apparel-upper-body'
});`,
    previewDetails: {
      heading: 'Zero-Cost Client-Side Computer Vision',
      subheading: 'Deliver magical AR experiences without incurring expensive cloud infrastructure bills.',
      points: [
        {
          title: 'Google MediaPipe WebAssembly Engine',
          desc: 'Executes lightweight neural networks directly inside the customer browser RAM & GPU.',
        },
        {
          title: 'Instant Canvas Projection',
          desc: 'Renders 2D/3D product textures onto detected torso landmarks with responsive affine transformations.',
        },
        {
          title: 'Total Privacy Guarantee',
          desc: 'Camera feed stays exclusively in local memory; no frames are transmitted to remote servers.',
        },
      ],
    },
  },
  {
    id: '5',
    slug: 'widget-customizer',
    category: 'Customizer',
    title: 'No-Code Widget Customizer & Live Simulator',
    tagline: 'Brand colors, avatars, and placement with instant iframe preview.',
    description:
      'Style the assistant without writing a single line of CSS. Customize brand themes, greeting messages, shapes, and placement with a live iframe simulator matching your storefront palette.',
    badge: 'Real-Time Sync',
    youtubeId: 'dQw4w9WgXcQ',
    highlights: [
      'Full RGB / Hex color palette picker with live preview',
      'Custom launcher icons, greeting prompts, and title headers',
      'Bottom-left vs bottom-right corner positioning',
      'Instant configuration sync to live merchant widget sessions',
    ],
    stats: [
      { label: 'Setup Time', value: '< 2 mins' },
      { label: 'CSS Required', value: '0 Lines' },
      { label: 'Sync Latency', value: 'Instant' },
    ],
    codeSnippet: `// Widget Configuration Payload
const settings = {
  primaryColor: '#39FF88',
  backgroundColor: '#0B132B',
  title: 'Store Concierge AI',
  initialMessage: 'Hi there! Looking for recommendations?',
  position: 'bottom-right'
};`,
    previewDetails: {
      heading: 'Effortless Brand Alignment',
      subheading: 'Make the AI look and feel like an integral part of your boutique store.',
      points: [
        {
          title: 'Visual Live Sandbox',
          desc: 'Test chat interactions inside an interactive iframe playground before publishing to live shoppers.',
        },
        {
          title: 'Custom Brand Voice Tuning',
          desc: 'Adjust greeting phrasing, tone (enthusiastic, formal, concise), and automated suggestion chips.',
        },
        {
          title: 'Zero Re-deployment Required',
          desc: 'Changes saved in the dashboard reflect instantly on your live store without editing theme scripts.',
        },
      ],
    },
  },
];
