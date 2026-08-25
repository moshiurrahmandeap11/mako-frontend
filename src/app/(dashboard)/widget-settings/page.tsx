'use client';

import { useState, useEffect } from 'react';
import {
  Palette,
  Globe,
  Code2,
  Copy,
  Check,
  Bot,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { fetchApi } from '@/lib/api-client';
import toast from 'react-hot-toast';
import Button from '@/components/Button';

export default function WidgetSettingsPage() {
  const [config, setConfig] = useState({
    primaryColor: '#1DBF73',
    greetingMessage: 'Hi! How can I help you shop today?',
    botName: 'Shop Assistant',
    position: 'bottom-right',
    addToCartEnabled: true,
  });

  const [domains, setDomains] = useState<string[]>([]);
  const [domainInput, setDomainInput] = useState('');
  const [apiKeys, setApiKeys] = useState<{ id: string; name: string; keyPrefix: string; isActive: boolean }[]>([]);
  const [selectedKeyPrefix, setSelectedKeyPrefix] = useState('');

  const [savingConfig, setSavingConfig] = useState(false);
  const [savingDomains, setSavingDomains] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('HTML');

  const frameworks = [
    'HTML', 'Next.js', 'React', 'Vue', 'Svelte', 
    'Astro', 'Shopify', 'WordPress', 'PHP', 'Laravel'
  ];

  useEffect(() => {
    // 1. Fetch Widget Config
    fetchApi('/api/widget-config')
      .then((data) => {
        if (data.config) setConfig(data.config);
      })
      .catch(console.error);

    // 2. Fetch Merchant Profile for domains
    fetchApi('/api/merchant/me')
      .then((data) => {
        setDomains(data.merchant?.allowedDomains || []);
      })
      .catch(console.error);

    // 3. Fetch API Keys
    fetchApi('/api/keys')
      .then((data) => {
        const activeKeys = (data.keys || []).filter((k: any) => k.isActive);
        setApiKeys(activeKeys);
        if (activeKeys.length > 0) {
          setSelectedKeyPrefix(activeKeys[0].keyPrefix);
        }
      })
      .catch(console.error);
  }, []);

  const handleSaveConfig = async (e: any) => {
    e.preventDefault();
    setSavingConfig(true);
    try {
      await fetchApi('/api/widget-config', {
        method: 'PATCH',
        body: JSON.stringify(config),
      });
      toast.success('Widget configuration saved successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save config');
    } finally {
      setSavingConfig(false);
    }
  };

  function normalizeDomain(input: string): string {
    if (!input) return '';
    let str = input.trim().toLowerCase();
    str = str.replace(/^https?:\/\//i, '');
    str = str.split('/')[0].split('?')[0].split('#')[0].split(':')[0];
    return str;
  }

  const handleAddDomain = async () => {
    const val = normalizeDomain(domainInput);
    if (!val || domains.includes(val)) return;

    const newDomains = [...domains, val];
    setSavingDomains(true);

    try {
      await fetchApi('/api/merchant/domains', {
        method: 'PATCH',
        body: JSON.stringify({ allowedDomains: newDomains }),
      });
      setDomains(newDomains);
      setDomainInput('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update domains');
    } finally {
      setSavingDomains(false);
    }
  };

  const handleRemoveDomain = async (domainToRemove: string) => {
    const newDomains = domains.filter((d) => d !== domainToRemove);
    setSavingDomains(true);

    try {
      await fetchApi('/api/merchant/domains', {
        method: 'PATCH',
        body: JSON.stringify({ allowedDomains: newDomains }),
      });
      setDomains(newDomains);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update domains');
    } finally {
      setSavingDomains(false);
    }
  };

  const scriptHost = process.env.NEXT_PUBLIC_WIDGET_SCRIPT_URL || 'http://localhost:4000/widget.js';
  const [customKeyInput, setCustomKeyInput] = useState('');
  const apiKeyToUse = customKeyInput.trim() || 'YOUR_API_KEY_SECRET';

  const getSnippet = () => {
    switch (selectedFramework) {
      case 'Next.js':
        return `import Script from 'next/script';\n\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        {children}\n        <Script\n          src="${scriptHost}"\n          data-api-key="${apiKeyToUse}"\n          strategy="afterInteractive"\n        />\n      </body>\n    </html>\n  );\n}`;
      case 'React':
        return `import { useEffect } from 'react';\n\nexport default function App() {\n  useEffect(() => {\n    const script = document.createElement('script');\n    script.src = "${scriptHost}";\n    script.setAttribute('data-api-key', "${apiKeyToUse}");\n    script.async = true;\n    document.body.appendChild(script);\n  }, []);\n\n  return <div>My Store</div>;\n}`;
      case 'Vue':
        return `<script setup>\nimport { onMounted } from 'vue';\n\nonMounted(() => {\n  const script = document.createElement('script');\n  script.src = "${scriptHost}";\n  script.setAttribute('data-api-key', "${apiKeyToUse}");\n  script.async = true;\n  document.body.appendChild(script);\n});\n</script>`;
      case 'Shopify':
        return `<!-- Paste in theme.liquid before </body> tag -->\n<script\n  src="${scriptHost}"\n  data-api-key="${apiKeyToUse}"\n  async\n></script>`;
      case 'WordPress':
        return `// Add to functions.php\nfunction add_labto_ai_widget() {\n    echo '<script src="${scriptHost}" data-api-key="${apiKeyToUse}" async></script>';\n}\nadd_action('wp_footer', 'add_labto_ai_widget');`;
      default:
        return `<script\n  src="${scriptHost}"\n  data-api-key="${apiKeyToUse}"\n  async\n></script>`;
    }
  };

  const embedCode = getSnippet();

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success('Snippet copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">Widget Settings & Customization</h1>
        <p className="text-[#62646A] text-xs sm:text-sm mt-1">Configure assistant branding, whitelisted domains, and copy embed code</p>
      </div>

      {/* Main Grid: Settings Controls + Live Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-3">
          {/* Appearance Section */}
          <form onSubmit={handleSaveConfig} className="bg-white border border-[#E4E5E7] rounded-md p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E4E5E7] pb-3">
              <Palette className="w-4 h-4 text-[#74767E]" strokeWidth={1.5} />
              <h2 className="text-base font-medium text-[#222325]">Branding & Aesthetics</h2>
            </div>

            <div>
              <label className="block text-xs font-normal text-[#404145] mb-1.5">Assistant Bot Name</label>
              <div className="relative">
                <Bot className="w-4 h-4 text-[#74767E] absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                <input
                  type="text"
                  required
                  value={config.botName}
                  onChange={(e) => setConfig({ ...config, botName: e.target.value })}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-normal text-[#404145] mb-1.5">Greeting Message</label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-[#74767E] absolute left-3 top-3" strokeWidth={1.5} />
                <textarea
                  rows={2}
                  required
                  value={config.greetingMessage}
                  onChange={(e) => setConfig({ ...config, greetingMessage: e.target.value })}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-normal text-[#404145] mb-1.5">Primary Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                    className="w-9 h-9 rounded-md cursor-pointer bg-white border border-[#E4E5E7] p-0.5"
                  />
                  <input
                    type="text"
                    value={config.primaryColor}
                    onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs font-mono text-[#222325] focus:border-[#1DBF73]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-normal text-[#404145] mb-1.5">Widget Position</label>
                <select
                  value={config.position}
                  onChange={(e) => setConfig({ ...config, position: e.target.value as any })}
                  className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.addToCartEnabled}
                  onChange={(e) => setConfig({ ...config, addToCartEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-[#1DBF73] focus:ring-[#1DBF73] bg-white border-[#E4E5E7]"
                />
                <span className="text-xs font-normal text-[#404145]">Enable direct &quot;+ Add to Cart&quot; actions in Widget</span>
              </label>
            </div>

            <Button type="submit" disabled={savingConfig} variant="primary" className="w-full !font-normal text-xs">
              {savingConfig ? 'Saving Settings...' : 'Save Appearance Settings'}
            </Button>
          </form>

          {/* Domain Whitelist */}
          <div className="bg-white border border-[#E4E5E7] rounded-md p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-[#E4E5E7] pb-3">
              <Globe className="w-4 h-4 text-[#74767E]" strokeWidth={1.5} />
              <h2 className="text-base font-medium text-[#222325]">Whitelisted Store Domains</h2>
            </div>
            <p className="text-[#62646A] text-xs">Specify website domains authorized to make widget API requests:</p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. https://labtobit-frontend.vercel.app or my-store.com"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDomain())}
                className="flex-1 px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73]"
              />
              <Button type="button" onClick={handleAddDomain} disabled={savingDomains || !domainInput.trim()} variant="outline" className="text-[#222325] border-[#E4E5E7] !font-normal text-xs">
                Add Domain
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {domains.length === 0 ? (
                <span className="text-xs text-[#74767E] italic">No domain restrictions set (all domains allowed for dev testing).</span>
              ) : (
                domains.map((dom) => (
                  <span key={dom} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0F2F5] border border-[#E4E5E7] text-[#62646A] text-xs font-mono font-normal">
                    {dom}
                    <button onClick={() => handleRemoveDomain(dom)} className="hover:text-rose-600 cursor-pointer">✕</button>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code Generator & Live Preview */}
        <div className="lg:col-span-5 space-y-3">
          {/* Embed Code Generator */}
          <div className="bg-white border border-[#E4E5E7] rounded-md p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#74767E]" strokeWidth={1.5} />
                <h2 className="text-base font-medium text-[#222325]">Embed Code Snippet</h2>
              </div>

              <Button onClick={copyEmbedCode} variant="primary" className="!font-normal text-xs">
                <span className="flex items-center gap-1.5">
                  {copied ? <Check className="w-3.5 h-3.5" strokeWidth={1.5} /> : <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </span>
              </Button>
            </div>

            {/* API Key Input Option */}
            <div className="space-y-1 pb-1">
              <label className="block text-xs font-normal text-[#404145]">
                Insert Full API Key (Optional — auto-populates below)
              </label>
              <input
                type="text"
                value={customKeyInput}
                onChange={(e) => setCustomKeyInput(e.target.value)}
                placeholder="Paste your secret key (e.g. aiw_live_...)"
                className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73] font-mono"
              />
              <p className="text-[11px] text-[#74767E]">
                Tip: Your secret API key was shown when you created it in the <a href="/api-keys" className="text-[#1DBF73] hover:underline font-normal">API Keys</a> tab.
              </p>
            </div>

            {/* Framework Select Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 pb-1">
              {frameworks.map((fw) => (
                <button
                  key={fw}
                  onClick={() => setSelectedFramework(fw)}
                  className={`px-2.5 py-1 rounded-md text-xs font-normal transition cursor-pointer ${
                    selectedFramework === fw
                      ? 'bg-[#1DBF73] text-white font-normal'
                      : 'bg-[#F0F2F5] text-[#62646A] hover:text-[#222325]'
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>

            <pre className="p-3 bg-[#0F172A] border border-slate-800 rounded-md font-mono text-xs text-[#1DBF73] overflow-x-auto">
              {embedCode}
            </pre>
          </div>

          {/* Live Preview Device Box */}
          <div className="bg-white border border-[#E4E5E7] rounded-md p-4 sm:p-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b border-[#E4E5E7] pb-3 mb-3">
              <span className="text-xs font-normal text-[#404145] flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#74767E]" strokeWidth={1.5} />
                Live Widget Preview
              </span>
              <span className="text-[11px] text-[#1DBF73] font-mono font-normal">Real-time UI</span>
            </div>

            {/* Rendered Mockup Container */}
            <div className="w-full bg-[#F7F7F7] rounded-md border border-[#E4E5E7] p-4 h-[420px] relative overflow-hidden flex flex-col justify-between">
              {/* Header */}
              <div className="border-b border-[#E4E5E7] pb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] text-[#74767E] font-mono">mystore.com</span>
              </div>

              {/* Skeleton Page Body */}
              <div className="flex-1 p-4 flex flex-col justify-center items-center text-center opacity-30">
                <div className="w-12 h-12 rounded-md bg-slate-300 mb-3" />
                <div className="h-3 w-32 bg-slate-300 rounded mb-2" />
                <div className="h-2 w-48 bg-slate-300 rounded" />
              </div>

              {/* Floating Widget Mockup */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: config.position === 'bottom-right' ? '16px' : 'auto',
                  left: config.position === 'bottom-left' ? '16px' : 'auto',
                }}
                className="w-72 bg-white rounded-md border border-[#E4E5E7] overflow-hidden flex flex-col"
              >
                <div
                  style={{ backgroundColor: config.primaryColor }}
                  className="p-3 text-white flex items-center justify-between text-xs font-normal"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>{config.botName || 'Shop Assistant'}</span>
                  </div>
                  <span>✕</span>
                </div>
                <div className="p-3 bg-slate-50 text-[11px] text-slate-700 min-h-[100px]">
                  <div className="p-2.5 rounded-md border border-slate-200 bg-white mb-2 text-slate-800">
                    {config.greetingMessage}
                  </div>
                  <div className="bg-white p-2 rounded-md border border-slate-200 flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-200" />
                    <div className="flex-1 min-w-0">
                      <p className="font-normal text-[10px] text-slate-900 truncate">Sample Product Card</p>
                      <p className="text-[10px] font-medium" style={{ color: config.primaryColor }}>$49.99 USD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
