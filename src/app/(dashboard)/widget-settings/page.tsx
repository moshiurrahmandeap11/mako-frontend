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
    primaryColor: '#111111',
    greetingMessage: 'Hi! How can I help you shop today?',
    botName: 'Shop Assistant',
    position: 'bottom-right',
    addToCartEnabled: true,
  });

  const [domains, setDomains] = useState<string[]>([]);
  const [domainInput, setDomainInput] = useState('');
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [selectedApiKey, setSelectedApiKey] = useState('');

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
          setSelectedApiKey(activeKeys[0].keyPrefix);
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

  const handleAddDomain = async () => {
    const val = domainInput.trim().toLowerCase();
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
  const apiKeyToUse = selectedApiKey || 'YOUR_ACTIVE_API_KEY';

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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Widget Settings & Customization</h1>
        <p className="text-slate-400 text-xs mt-1">Configure assistant branding, whitelisted domains, and copy embed code</p>
      </div>

      {/* Main Grid: Settings Controls + Live Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Appearance Section */}
          <form onSubmit={handleSaveConfig} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Palette className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-white">Branding & Aesthetics</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Assistant Bot Name</label>
              <div className="relative">
                <Bot className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={config.botName}
                  onChange={(e) => setConfig({ ...config, botName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Greeting Message</label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  required
                  value={config.greetingMessage}
                  onChange={(e) => setConfig({ ...config, greetingMessage: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-slate-950 border border-slate-800 p-0.5"
                  />
                  <input
                    type="text"
                    value={config.primaryColor}
                    onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Widget Position</label>
                <select
                  value={config.position}
                  onChange={(e) => setConfig({ ...config, position: e.target.value as any })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.addToCartEnabled}
                  onChange={(e) => setConfig({ ...config, addToCartEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-950 border-slate-800"
                />
                <span className="text-xs font-semibold text-slate-200">Enable direct "+ Add to Cart" actions in Widget</span>
              </label>
            </div>

            <Button type="submit" disabled={savingConfig} variant="filled" className="w-full">
              {savingConfig ? 'Saving Settings...' : 'Save Appearance Settings'}
            </Button>
          </form>

          {/* Domain Whitelist */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Globe className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-white">Whitelisted Store Domains</h2>
            </div>
            <p className="text-slate-400 text-xs">Specify website domains authorized to make widget API requests:</p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. shop.example.com or *.example.com"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDomain())}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
              <Button type="button" onClick={handleAddDomain} disabled={savingDomains || !domainInput.trim()} variant="outline">
                Add Domain
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {domains.length === 0 ? (
                <span className="text-xs text-slate-500 italic">No domain restrictions set (all domains allowed for dev testing).</span>
              ) : (
                domains.map((dom) => (
                  <span key={dom} className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono font-bold">
                    {dom}
                    <button onClick={() => handleRemoveDomain(dom)} className="hover:text-rose-400">✕</button>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code Generator & Live Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Embed Code Generator */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-white">Embed Code Snippet</h2>
              </div>

              <Button onClick={copyEmbedCode} variant="filled">
                <span className="flex items-center gap-1.5">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </span>
              </Button>
            </div>

            {/* Framework Select Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              {frameworks.map((fw) => (
                <button
                  key={fw}
                  onClick={() => setSelectedFramework(fw)}
                  className={`px-2.5 py-1.5 rounded text-[11px] font-bold tracking-wider uppercase transition ${
                    selectedFramework === fw
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>

            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-amber-400 overflow-x-auto">
              {embedCode}
            </pre>
          </div>

          {/* Live Preview Device Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Live Widget Preview
              </span>
              <span className="text-[10px] text-amber-500 font-mono font-bold">Real-time UI</span>
            </div>

            {/* Rendered Mockup Container */}
            <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 h-[440px] relative overflow-hidden flex flex-col justify-between">
              {/* Header */}
              <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-[10px] text-slate-600 font-mono">mystore.com</span>
              </div>

              {/* Skeleton Page Body */}
              <div className="flex-1 p-4 flex flex-col justify-center items-center text-center opacity-25">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 mb-3" />
                <div className="h-3 w-32 bg-slate-800 rounded mb-2" />
                <div className="h-2 w-48 bg-slate-800 rounded" />
              </div>

              {/* Floating Widget Mockup */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: config.position === 'bottom-right' ? '16px' : 'auto',
                  left: config.position === 'bottom-left' ? '16px' : 'auto',
                }}
                className="w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
              >
                <div
                  style={{ backgroundColor: config.primaryColor }}
                  className="p-3 text-white flex items-center justify-between text-xs font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{config.botName || 'Shop Assistant'}</span>
                  </div>
                  <span>✕</span>
                </div>
                <div className="p-3 bg-slate-50 text-[11px] text-slate-700 min-h-[100px]">
                  <div className="p-2.5 rounded-xl border border-slate-200 bg-white shadow-sm mb-2 text-slate-800">
                    {config.greetingMessage}
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-200" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[10px] text-slate-900 truncate">Sample Product Card</p>
                      <p className="text-[10px] font-bold" style={{ color: config.primaryColor }}>$49.99 USD</p>
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
