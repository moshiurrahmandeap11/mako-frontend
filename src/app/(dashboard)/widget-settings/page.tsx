"use client";

import Button from "@/components/Button";
import { fetchApi } from "@/lib/api-client";
import {
  AlertTriangle,
  Bot,
  Check,
  Copy,
  Loader2,
  MessageSquare,
  Plus,
  RefreshCw,
  ShieldAlert,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function WidgetSettingsPage() {
  const [config, setConfig] = useState<any>({
    primaryColor: "#1DBF73",
    headerBgColor: "#FFFFFF",
    headerTextColor: "#222325",
    launcherBgColor: "#1DBF73",
    launcherIconColor: "#FFFFFF",
    greetingMessage: "Hi! How can I help you shop today?",
    botName: "AI Assistant",
    position: "bottom-right",
    addToCartEnabled: true,
    suggestionChips: [
      "Show me your portfolio projects",
      "What services do you provide?",
      "How can I contact you?",
    ],
    botAvatarUrl: "",
  });

  const [domains, setDomains] = useState<string[]>([]);
  const [domainStatuses, setDomainStatuses] = useState<
    { domain: string; status: string; chunkCount: number }[]
  >([]);
  const [domainInput, setDomainInput] = useState("");
  const [chipInput, setChipInput] = useState("");
  const [apiKeys, setApiKeys] = useState<
    { id: string; name: string; keyPrefix: string; isActive: boolean }[]
  >([]);
  const [selectedKeyPrefix, setSelectedKeyPrefix] = useState("");

  const [savingConfig, setSavingConfig] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [savingDomains, setSavingDomains] = useState(false);
  const [rescrapingDomain, setRescrapingDomain] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState("HTML");

  // Quick Create API Key Modal State
  const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyBotName, setNewKeyBotName] = useState("");
  const [newKeyDomain, setNewKeyDomain] = useState("");
  const [newKeyTemplate, setNewKeyTemplate] = useState("Customer Support");
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [createdKeySecret, setCreatedKeySecret] = useState<string | null>(null);
  const [createdKeyCopied, setCreatedKeyCopied] = useState(false);

  const frameworks = [
    "HTML",
    "Next.js",
    "React",
    "Vue",
    "Svelte",
    "Astro",
    "Shopify",
    "WordPress",
    "PHP",
    "Laravel",
  ];

  const PRESET_PALETTES = [
    {
      name: "Emerald Green",
      primary: "#1DBF73",
      headerBg: "#FFFFFF",
      headerText: "#222325",
      launcherBg: "#1DBF73",
      launcherIcon: "#FFFFFF",
    },
    {
      name: "Sleek Midnight",
      primary: "#3B82F6",
      headerBg: "#0F172A",
      headerText: "#FFFFFF",
      launcherBg: "#0F172A",
      launcherIcon: "#FFFFFF",
    },
    {
      name: "Royal Purple",
      primary: "#8B5CF6",
      headerBg: "#F5F3FF",
      headerText: "#4C1D95",
      launcherBg: "#8B5CF6",
      launcherIcon: "#FFFFFF",
    },
    {
      name: "Ocean Blue",
      primary: "#0284C7",
      headerBg: "#F0F9FF",
      headerText: "#0C4A6E",
      launcherBg: "#0284C7",
      launcherIcon: "#FFFFFF",
    },
    {
      name: "Minimalist Dark",
      primary: "#18181B",
      headerBg: "#18181B",
      headerText: "#FAFAFA",
      launcherBg: "#18181B",
      launcherIcon: "#FFFFFF",
    },
  ];

  useEffect(() => {
    // 1. Fetch Widget Config
    fetchApi("/api/widget-config")
      .then((data) => {
        if (data.config) {
          setConfig({
            ...data.config,
            suggestionChips: data.config.suggestionChips || [
              "Show me your portfolio projects",
              "What services do you provide?",
              "How can I contact you?",
            ],
          });
        }
      })
      .catch(console.error);

    // 2. Fetch Merchant Profile for domains & scrape statuses
    fetchApi("/api/merchant/me")
      .then((data) => {
        setDomains(data.merchant?.allowedDomains || []);
        setDomainStatuses(data.merchant?.domainStatuses || []);
      })
      .catch(console.error);

    // 3. Fetch API Keys
    fetchApi("/api/keys")
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
      await fetchApi("/api/widget-config", {
        method: "PATCH",
        body: JSON.stringify(config),
      });
      toast.success("Widget configuration saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save config");
    } finally {
      setSavingConfig(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB");
      return;
    }

    setUploadingAvatar(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await fetchApi("/api/widget-config/upload-avatar", {
          method: "POST",
          body: JSON.stringify({ image: base64Data }),
        });
        setConfig((prev: any) => ({ ...prev, botAvatarUrl: res.avatarUrl }));
        toast.success("Bot icon uploaded to Cloudinary successfully!");
      } catch (err: any) {
        toast.error(err.message || "Failed to upload image");
      } finally {
        setUploadingAvatar(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setConfig((prev: any) => ({ ...prev, botAvatarUrl: null }));
    toast.success("Reset to default mascot icon. Click Save to apply.");
  };

  function normalizeDomain(input: string): string {
    if (!input) return "";
    let str = input.trim().toLowerCase();
    str = str.replace(/^https?:\/\//i, "");
    str = str.split("/")[0].split("?")[0].split("#")[0].split(":")[0];
    return str;
  }

  const handleAddDomain = async () => {
    const val = normalizeDomain(domainInput);
    if (!val || domains.includes(val)) return;

    const newDomains = [...domains, val];
    setSavingDomains(true);

    try {
      await fetchApi("/api/merchant/domains", {
        method: "PATCH",
        body: JSON.stringify({ allowedDomains: newDomains }),
      });
      setDomains(newDomains);
      setDomainInput("");
      toast.success(`Domain ${val} whitelisted and scraping triggered!`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update domains");
    } finally {
      setSavingDomains(false);
    }
  };

  const handleRemoveDomain = async (domainToRemove: string) => {
    const newDomains = domains.filter((d) => d !== domainToRemove);
    setSavingDomains(true);

    try {
      await fetchApi("/api/merchant/domains", {
        method: "PATCH",
        body: JSON.stringify({ allowedDomains: newDomains }),
      });
      setDomains(newDomains);
    } catch (err: any) {
      toast.error(err.message || "Failed to update domains");
    } finally {
      setSavingDomains(false);
    }
  };

  const handleRescrape = async (domain: string) => {
    setRescrapingDomain(domain);
    try {
      await fetchApi("/api/merchant/domains/rescrape", {
        method: "POST",
        body: JSON.stringify({ domain }),
      });
      toast.success(`Background re-scraping initiated for ${domain}!`);
    } catch (err: any) {
      toast.error(err.message || "Failed to re-scrape domain");
    } finally {
      setRescrapingDomain(null);
    }
  };

  const handleAddChip = () => {
    const val = chipInput.trim();
    if (!val) return;
    const currentChips = config.suggestionChips || [];
    if (currentChips.length >= 4) {
      toast.error("You can add up to 4 suggested question chips.");
      return;
    }
    setConfig({ ...config, suggestionChips: [...currentChips, val] });
    setChipInput("");
  };

  const handleRemoveChip = (chipToRemove: string) => {
    const currentChips = config.suggestionChips || [];
    setConfig({
      ...config,
      suggestionChips: currentChips.filter((c: string) => c !== chipToRemove),
    });
  };

  const applyPalette = async (palette: (typeof PRESET_PALETTES)[0]) => {
    const updatedConfig = {
      ...config,
      primaryColor: palette.primary,
      headerBgColor: palette.headerBg,
      headerTextColor: palette.headerText,
      launcherBgColor: palette.launcherBg,
      launcherIconColor: palette.launcherIcon,
    };
    setConfig(updatedConfig);

    try {
      await fetchApi("/api/widget-config", {
        method: "PATCH",
        body: JSON.stringify(updatedConfig),
      });
      toast.success(`Applied & saved ${palette.name} theme live!`);
    } catch (err: any) {
      toast.error(err.message || `Applied ${palette.name} theme locally.`);
    }
  };

  const scriptHost =
    process.env.NEXT_PUBLIC_WIDGET_SCRIPT_URL ||
    "http://localhost:4000/widget.js";
  const [customKeyInput, setCustomKeyInput] = useState("");
  const apiKeyToUse = customKeyInput.trim() || "YOUR_API_KEY_SECRET";

  const getSnippet = () => {
    switch (selectedFramework) {
      case "Next.js":
        return `import Script from 'next/script';\n\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        {children}\n        <Script\n          src="${scriptHost}"\n          data-api-key="${apiKeyToUse}"\n          strategy="afterInteractive"\n        />\n      </body>\n    </html>\n  );\n}`;
      case "React":
        return `import { useEffect } from 'react';\n\nexport default function App() {\n  useEffect(() => {\n    const script = document.createElement('script');\n    script.src = "${scriptHost}";\n    script.setAttribute('data-api-key', "${apiKeyToUse}");\n    script.async = true;\n    document.body.appendChild(script);\n  }, []);\n\n  return <div>My Store</div>;\n}`;
      case "Vue":
        return `<script setup>\nimport { onMounted } from 'vue';\n\nonMounted(() => {\n  const script = document.createElement('script');\n  script.src = "${scriptHost}";\n  script.setAttribute('data-api-key', "${apiKeyToUse}");\n  script.async = true;\n  document.body.appendChild(script);\n});\n</script>`;
      case "Shopify":
        return `<!-- Paste in theme.liquid before </body> tag -->\n<script\n  src="${scriptHost}"\n  data-api-key="${apiKeyToUse}"\n  async\n></script>`;
      case "WordPress":
        return `// Add to functions.php\nfunction add_labto_ai_widget() {\n    echo '<script src="${scriptHost}" data-api-key="${apiKeyToUse}" async></script>';\n}\nadd_action('wp_footer', 'add_labto_ai_widget');`;
      default:
        return `<script\n  src="${scriptHost}"\n  data-api-key="${apiKeyToUse}"\n  async\n></script>`;
    }
  };

  const embedCode = getSnippet();

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success("Snippet copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const openCreateKeyModal = () => {
    setNewKeyName("My Web Widget");
    setNewKeyBotName(config.botName || "AI Assistant");
    setNewKeyDomain(domains[0] || "");
    setCreatedKeySecret(null);
    setCreatedKeyCopied(false);
    setShowCreateKeyModal(true);
  };

  const handleQuickCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingKey(true);
    try {
      // 1. Whitelist domain if provided
      const cleanDomain = normalizeDomain(newKeyDomain);
      if (cleanDomain && !domains.includes(cleanDomain)) {
        const updatedDomains = [...domains, cleanDomain];
        await fetchApi("/api/merchant/domains", {
          method: "PATCH",
          body: JSON.stringify({ allowedDomains: updatedDomains }),
        });
        setDomains(updatedDomains);
      }

      // 2. Generate API Key
      const data = await fetchApi("/api/keys", {
        method: "POST",
        body: JSON.stringify({
          name: newKeyName || "My Web Widget",
          template: newKeyTemplate,
          allowedDomains: cleanDomain ? [cleanDomain] : [],
        }),
      });

      const fullSecret = data.apiKey?.fullKey;
      if (fullSecret) {
        setCreatedKeySecret(fullSecret);
        setCustomKeyInput(fullSecret); // Auto-populates all snippet tabs immediately!
      }

      // 3. Sync Assistant Bot Name to widget config if changed
      if (newKeyBotName.trim() && newKeyBotName.trim() !== config.botName) {
        const updatedConfig = { ...config, botName: newKeyBotName.trim() };
        setConfig(updatedConfig);
        await fetchApi("/api/widget-config", {
          method: "PATCH",
          body: JSON.stringify(updatedConfig),
        });
      }

      // 4. Reload API keys
      const keysData = await fetchApi("/api/keys");
      const activeKeys = (keysData.keys || []).filter((k: any) => k.isActive);
      setApiKeys(activeKeys);
      if (activeKeys.length > 0) {
        setSelectedKeyPrefix(activeKeys[0].keyPrefix);
      }

      toast.success("API Key generated & snippet auto-populated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to generate API Key.");
    } finally {
      setIsCreatingKey(false);
    }
  };

  const handleResetDefaults = async () => {
    try {
      const data = await fetchApi("/api/widget-config/reset", {
        method: "POST",
      });
      if (data.config) {
        setConfig(data.config);
      } else {
        setConfig({
          primaryColor: "#1DBF73",
          headerBgColor: "#FFFFFF",
          headerTextColor: "#222325",
          launcherBgColor: "#1DBF73",
          launcherIconColor: "#FFFFFF",
          greetingMessage: "Hi! How can I help you shop today?",
          botName: "AI Assistant",
          position: "bottom-right",
          addToCartEnabled: true,
          suggestionChips: [
            "Show me your portfolio projects",
            "What services do you provide?",
            "How can I contact you?",
          ],
        });
      }
      toast.success("Widget configuration reset to default settings!");
    } catch (err: any) {
      toast.error(err.message || "Failed to reset settings");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
            Widget Settings & Customization
          </h1>
          <p className="text-[#62646A] text-xs sm:text-sm mt-1">
            Configure assistant branding, header theme, greeting message, and
            test widget live
          </p>
        </div>
      </div>

      {/* Main Grid: Settings Controls + Live Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-3">
          {/* Domain Whitelist */}
          <div className="bg-white border border-[#E4E5E7] rounded-md p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-[#E4E5E7] pb-3">
              <h2 className="text-base font-medium text-[#222325]">
                Whitelisted Store Domains
              </h2>
            </div>
            <p className="text-[#62646A] text-xs">
              Specify website domains authorized to make widget API requests:
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. https://labtobit-frontend.vercel.app or my-store.com"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddDomain())
                }
                className="flex-1 px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73]"
              />
              <Button
                type="button"
                onClick={handleAddDomain}
                disabled={savingDomains || !domainInput.trim()}
                variant="outline"
                className="text-[#222325] border-[#E4E5E7] !font-normal text-xs"
              >
                Add Domain
              </Button>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              {domains.length === 0 ? (
                <span className="text-xs text-[#74767E] italic">
                  No domain restrictions set (all domains allowed for dev
                  testing).
                </span>
              ) : (
                domains.map((dom) => {
                  const statusInfo = domainStatuses.find(
                    (s) => s.domain === dom,
                  );
                  const isScraped = statusInfo
                    ? statusInfo.chunkCount > 0
                    : false;
                  return (
                    <div
                      key={dom}
                      className="flex items-center justify-between p-2.5 rounded-md bg-[#F0F2F5] border border-[#E4E5E7] text-xs"
                    >
                      <div className="flex items-center gap-2 font-mono text-[#222325]">
                        <span>{dom}</span>
                        {/* Feature 4: Scrape Status Badge */}
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-medium px-2 py-0.5 rounded-md bg-white border border-[#E4E5E7] text-[#404145]">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${isScraped ? "bg-[#1DBF73]" : "bg-amber-500 animate-pulse"}`}
                          />
                          {isScraped
                            ? `Scraped & Ready (${statusInfo?.chunkCount || 0} chunks)`
                            : "Crawl Pending"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Button
                          type="button"
                          onClick={() => handleRescrape(dom)}
                          isLoading={rescrapingDomain === dom}
                          variant="outline"
                          size="sm"
                          icon={
                            <RefreshCw className="w-3 h-3 text-[#74767E]" />
                          }
                          className="!py-1 !px-2.5 text-xs text-[#222325] border-[#E4E5E7]"
                        >
                          Re-scrape
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleRemoveDomain(dom)}
                          variant="ghost"
                          size="sm"
                          icon={
                            <Trash2 className="w-3.5 h-3.5 text-[#74767E] hover:text-rose-600" />
                          }
                          className="!p-1.5"
                        >
                          {null}
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Appearance Section */}
          <form
            onSubmit={handleSaveConfig}
            className="bg-white border border-[#E4E5E7] rounded-md p-4 sm:p-5 space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-[#E4E5E7] pb-3">
              <h2 className="text-base font-medium text-[#222325]">
                Branding & Aesthetics
              </h2>
            </div>

            {/* Feature 1: 1-Click Color Presets */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-md p-3 space-y-2">
              <label className="block text-xs font-medium text-[#334155]">
                1-Click Theme Color Presets
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_PALETTES.map((pal) => (
                  <Button
                    key={pal.name}
                    type="button"
                    onClick={() => applyPalette(pal)}
                    variant="outline"
                    size="sm"
                    className="text-[#222325] border-[#E4E5E7] !py-1 !px-2.5 text-xs font-normal bg-white"
                  >
                    <span>{pal.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-normal text-[#404145] mb-1.5">
                Assistant Bot Name
              </label>
              <div className="relative">
                <Bot
                  className="w-4 h-4 text-[#74767E] absolute left-3 top-1/2 -translate-y-1/2"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  required
                  value={config.botName}
                  onChange={(e) =>
                    setConfig({ ...config, botName: e.target.value })
                  }
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>
            </div>

            {/* Custom Bot Avatar / Icon */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-md p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-medium text-[#334155]">
                    Assistant Bot Avatar & Icon
                  </label>
                  <p className="text-[11px] text-[#64748B]">
                    Upload a custom logo/profile icon or use default robot
                    mascot
                  </p>
                </div>
                {config.botAvatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="text-[11px] text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Reset to Default</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Avatar Preview */}
                <div className="relative w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center overflow-hidden flex-shrink-0">
                  {config.botAvatarUrl ? (
                    <img
                      src={config.botAvatarUrl}
                      alt="Bot Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Bot className="w-6 h-6 text-[#1DBF73]" />
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F1F5F9] text-xs font-medium cursor-pointer transition shadow-xs">
                      {uploadingAvatar ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1DBF73]" />
                          <span>Uploading to Cloudinary...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5 text-[#64748B]" />
                          <span>Upload Image / Logo</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
                        onChange={handleAvatarUpload}
                        disabled={uploadingAvatar}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-[10px] text-[#94A3B8]">
                    Supports PNG, JPG, SVG, WebP up to 5MB (Uploaded to
                    Cloudinary)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-normal text-[#404145] mb-1.5">
                Greeting Message
              </label>
              <div className="relative">
                <MessageSquare
                  className="w-4 h-4 text-[#74767E] absolute left-3 top-3"
                  strokeWidth={1.5}
                />
                <textarea
                  rows={2}
                  required
                  value={config.greetingMessage}
                  onChange={(e) =>
                    setConfig({ ...config, greetingMessage: e.target.value })
                  }
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>
            </div>

            {/* Feature 2: Custom Suggested Questions Chips Editor */}
            <div className="pt-2 border-t border-[#E4E5E7] space-y-2">
              <label className="block text-xs font-medium text-[#222325]">
                Custom Suggested Question Chips (Max 4)
              </label>
              <p className="text-[#62646A] text-xs">
                Quick question shortcuts shown to visitors when opening chat:
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Track My Order, Shipping Info, or Return Policy"
                  value={chipInput}
                  onChange={(e) => setChipInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddChip())
                  }
                  className="flex-1 px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73]"
                />
                <Button
                  type="button"
                  onClick={handleAddChip}
                  disabled={!chipInput.trim()}
                  variant="outline"
                  className="text-[#222325] border-[#E4E5E7] !font-normal text-xs"
                >
                  Add Chip
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {(config.suggestionChips || []).map((chip: string) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0F2F5] border border-[#E4E5E7] text-[#222325] text-xs font-normal"
                  >
                    <MessageSquare className="w-3 h-3 text-[#74767E]" />
                    <span>{chip}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveChip(chip)}
                      className="hover:text-rose-600 cursor-pointer ml-1 text-[#74767E]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-normal text-[#404145] mb-1.5">
                  Primary Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.primaryColor || "#1DBF73"}
                    onChange={(e) =>
                      setConfig({ ...config, primaryColor: e.target.value })
                    }
                    className="w-9 h-9 rounded-md cursor-pointer bg-white border border-[#E4E5E7] p-0.5"
                  />
                  <input
                    type="text"
                    value={config.primaryColor || "#1DBF73"}
                    onChange={(e) =>
                      setConfig({ ...config, primaryColor: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs font-mono text-[#222325] focus:border-[#1DBF73]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-normal text-[#404145] mb-1.5">
                  Widget Position
                </label>
                <select
                  value={config.position || "bottom-right"}
                  onChange={(e) =>
                    setConfig({ ...config, position: e.target.value as any })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </div>
            </div>

            {/* Custom Header & Launcher Color Controls */}
            <div className="pt-2 border-t border-[#E4E5E7] space-y-3">
              <h3 className="text-xs font-medium text-[#222325]">
                Header & Floating Button Customization
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-normal text-[#404145] mb-1.5">
                    Header Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.headerBgColor || "#FFFFFF"}
                      onChange={(e) =>
                        setConfig({ ...config, headerBgColor: e.target.value })
                      }
                      className="w-9 h-9 rounded-md cursor-pointer bg-white border border-[#E4E5E7] p-0.5"
                    />
                    <input
                      type="text"
                      value={config.headerBgColor || "#FFFFFF"}
                      onChange={(e) =>
                        setConfig({ ...config, headerBgColor: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs font-mono text-[#222325] focus:border-[#1DBF73]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-normal text-[#404145] mb-1.5">
                    Header Text & Icon Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.headerTextColor || "#222325"}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          headerTextColor: e.target.value,
                        })
                      }
                      className="w-9 h-9 rounded-md cursor-pointer bg-white border border-[#E4E5E7] p-0.5"
                    />
                    <input
                      type="text"
                      value={config.headerTextColor || "#222325"}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          headerTextColor: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs font-mono text-[#222325] focus:border-[#1DBF73]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-normal text-[#404145] mb-1.5">
                    Floating Launcher Button Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.launcherBgColor || "#1DBF73"}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          launcherBgColor: e.target.value,
                        })
                      }
                      className="w-9 h-9 rounded-md cursor-pointer bg-white border border-[#E4E5E7] p-0.5"
                    />
                    <input
                      type="text"
                      value={config.launcherBgColor || "#1DBF73"}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          launcherBgColor: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs font-mono text-[#222325] focus:border-[#1DBF73]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-normal text-[#404145] mb-1.5">
                    Floating Button Icon Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.launcherIconColor || "#FFFFFF"}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          launcherIconColor: e.target.value,
                        })
                      }
                      className="w-9 h-9 rounded-md cursor-pointer bg-white border border-[#E4E5E7] p-0.5"
                    />
                    <input
                      type="text"
                      value={config.launcherIconColor || "#FFFFFF"}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          launcherIconColor: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs font-mono text-[#222325] focus:border-[#1DBF73]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.addToCartEnabled}
                  onChange={(e) =>
                    setConfig({ ...config, addToCartEnabled: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#1DBF73] focus:ring-[#1DBF73] bg-white border-[#E4E5E7]"
                />
                <span className="text-xs font-normal text-[#404145]">
                  Enable direct &quot;+ Add to Cart&quot; actions in Widget
                </span>
              </label>
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                onClick={handleResetDefaults}
                variant="outline"
                className="flex-1 text-[#222325] border-[#E4E5E7] !font-normal text-xs"
              >
                Reset to Defaults
              </Button>
              <Button
                type="submit"
                disabled={savingConfig}
                variant="primary"
                className="flex-1 !font-normal text-xs"
              >
                {savingConfig
                  ? "Saving Settings..."
                  : "Save Appearance Settings"}
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column: Code Generator & Live Preview */}
        <div className="lg:col-span-5 space-y-3">
          {/* Embed Code Generator */}
          <div className="bg-white border border-[#E4E5E7] rounded-md p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-medium text-[#222325]">
                  Embed Code Snippet
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={openCreateKeyModal}
                  variant="outline"
                  className="!font-normal text-xs border-[#1DBF73] text-[#1DBF73] hover:bg-[#1DBF73]/10"
                >
                  <span className="flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Create API Key</span>
                  </span>
                </Button>

                <Button
                  onClick={copyEmbedCode}
                  variant="primary"
                  className="!font-normal text-xs"
                >
                  <span className="flex items-center gap-1.5">
                    {copied ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                    ) : (
                      <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                    )}
                    <span>{copied ? "Copied!" : "Copy Code"}</span>
                  </span>
                </Button>
              </div>
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
                Tip: Your secret API key was shown when you created it in the{" "}
                <a
                  href="/api-keys"
                  className="text-[#1DBF73] hover:underline font-normal"
                >
                  API Keys
                </a>{" "}
                tab.
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
                      ? "bg-[#1DBF73] text-white font-normal"
                      : "bg-[#F0F2F5] text-[#62646A] hover:text-[#222325]"
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>

            <pre className="p-3 bg-surface-light rounded-md text-xs overflow-x-auto">
              {embedCode}
            </pre>
          </div>

          {/* Live Preview Device Box */}
          <div className="bg-white border border-[#E4E5E7] rounded-md p-4 sm:p-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b border-[#E4E5E7] pb-3 mb-3">
              <span className="text-xs font-normal text-[#404145] flex items-center gap-1.5">
                Live Widget Preview
              </span>
              <span className="text-[11px] text-[#1DBF73] font-mono font-normal">
                Real-time UI
              </span>
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
                <span className="text-[10px] text-[#74767E] font-mono">
                  mystore.com
                </span>
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
                  position: "absolute",
                  bottom: "16px",
                  right: config.position === "bottom-right" ? "16px" : "auto",
                  left: config.position === "bottom-left" ? "16px" : "auto",
                }}
                className="w-72 bg-white rounded-md border border-[#E4E5E7] overflow-hidden flex flex-col shadow-sm"
              >
                <div
                  style={{
                    backgroundColor: config.headerBgColor || "#FFFFFF",
                    color: config.headerTextColor || "#222325",
                  }}
                  className="p-3 border-b border-[#E4E5E7] flex items-center justify-between text-xs font-normal"
                >
                  <div className="flex items-center gap-2">
                    {config.botAvatarUrl ? (
                      <img
                        src={config.botAvatarUrl}
                        alt="Bot Avatar"
                        className="w-5 h-5 rounded-md object-cover flex-shrink-0"
                      />
                    ) : (
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{
                          backgroundColor: config.primaryColor || "#1DBF73",
                        }}
                      />
                    )}
                    <span className="font-medium">
                      {config.botName || "AI Assistant"}
                    </span>
                  </div>
                  <span>✕</span>
                </div>
                <div className="p-3 bg-slate-50 text-[11px] text-slate-700 min-h-[90px]">
                  <div className="p-2.5 rounded-md border border-slate-200 bg-white mb-2 text-slate-800">
                    {config.greetingMessage}
                  </div>
                  <div className="bg-white p-2 rounded-md border border-slate-200 flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-200" />
                    <div className="flex-1 min-w-0">
                      <p className="font-normal text-[10px] text-slate-900 truncate">
                        Sample Product Card
                      </p>
                      <p
                        className="text-[10px] font-medium"
                        style={{ color: config.primaryColor || "#1DBF73" }}
                      >
                        $49.99 USD
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Launcher Button Mockup */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: config.position === "bottom-right" ? "12px" : "auto",
                  left: config.position === "bottom-left" ? "12px" : "auto",
                  backgroundColor:
                    config.launcherBgColor || config.primaryColor || "#1DBF73",
                  color: config.launcherIconColor || "#FFFFFF",
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-md cursor-pointer border border-white/20"
                title="Launcher Button"
              >
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1-Click Quick Create API Key Modal */}
      {showCreateKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-[#E4E5E7] rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E5E7] bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5">
                <div>
                  <h3 className="text-sm text-[#0F172A]">
                    {createdKeySecret
                      ? "API Key Generated Successfully"
                      : "Create & Integrate API Key"}
                  </h3>
                  <p className="text-[11px] text-[#64748B]">
                    {createdKeySecret
                      ? "Auto-populated into your widget snippets below"
                      : "Generate an API key and instantly auto-populate your embed snippet"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateKeyModal(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-md hover:bg-[#E2E8F0] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {createdKeySecret ? (
              <div className="p-5 space-y-4">
                {/* One-Time Visibility Notice */}
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 space-y-1">
                    <p className="font-semibold">
                      ⚠️ One-Time Visibility Notice:
                    </p>
                    <p className="text-[11.5px] leading-relaxed">
                      For security, your full raw API Key is displayed{" "}
                      <strong>ONLY ONCE</strong>. It has been automatically
                      filled into the embed snippet on this page. Copy and store
                      it safely if you need it elsewhere!
                    </p>
                  </div>
                </div>

                {/* Secret Key Display Box */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#404145]">
                    Your Secret API Key:
                  </label>
                  <div className="flex items-center gap-2 bg-[#F1F5F9] border border-[#CBD5E1] p-2.5 rounded-md">
                    <code className="text-xs font-mono text-[#0F172A] flex-1 break-all select-all">
                      {createdKeySecret}
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(createdKeySecret);
                        setCreatedKeyCopied(true);
                        toast.success("API Key copied!");
                        setTimeout(() => setCreatedKeyCopied(false), 2000);
                      }}
                      className="px-2.5 py-1.5 bg-white border border-[#CBD5E1] hover:border-[#1DBF73] text-xs text-[#0F172A] rounded flex items-center gap-1 shrink-0 font-medium transition cursor-pointer"
                    >
                      {createdKeyCopied ? (
                        <Check className="w-3.5 h-3.5 text-[#1DBF73]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{createdKeyCopied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowCreateKeyModal(false);
                      copyEmbedCode();
                    }}
                    variant="primary"
                    className="w-full text-xs font-medium"
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Done & Copy Embed Snippet</span>
                    </span>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickCreateKey} className="p-5 space-y-3.5">
                {/* Notice */}
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[11.5px] text-blue-800 leading-snug">
                    Creating an API key here will automatically inject it into
                    all code snippets on this page and whitelist the domain
                    instantly.
                  </p>
                </div>

                {/* Key / Project Name */}
                <div>
                  <label className="block text-xs font-medium text-[#404145] mb-1">
                    API Key / Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. My Next.js Store, Portfolio Widget"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] placeholder-[#94A3B8] focus:outline-none focus:border-[#1DBF73]"
                  />
                </div>

                {/* Assistant Bot Name */}
                <div>
                  <label className="block text-xs font-medium text-[#404145] mb-1">
                    Assistant Bot Name
                  </label>
                  <div className="relative">
                    <Bot className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. AI Assistant, Shop Support Bot"
                      value={newKeyBotName}
                      onChange={(e) => setNewKeyBotName(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] placeholder-[#94A3B8] focus:outline-none focus:border-[#1DBF73]"
                    />
                  </div>
                  <p className="text-[10.5px] text-[#94A3B8] mt-0.5">
                    This name will appear as the bot title in the chat widget
                    header.
                  </p>
                </div>

                {/* Domain Whitelist */}
                <div>
                  <label className="block text-xs font-medium text-[#404145] mb-1">
                    Website Domain to Whitelist
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. my-site.com or https://store.vercel.app"
                    value={newKeyDomain}
                    onChange={(e) => setNewKeyDomain(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] placeholder-[#94A3B8] focus:outline-none focus:border-[#1DBF73]"
                  />
                  <p className="text-[10.5px] text-[#94A3B8] mt-0.5">
                    Authorized domain where the widget will be embedded.
                  </p>
                </div>

                {/* Template Selection */}
                <div>
                  <label className="block text-xs font-medium text-[#404145] mb-1">
                    Bot Persona / Template
                  </label>
                  <select
                    value={newKeyTemplate}
                    onChange={(e) => setNewKeyTemplate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                  >
                    <option value="Customer Support">
                      Customer Support & Sales Agent
                    </option>
                    <option value="FAQ / Knowledge Base">
                      FAQ / Knowledge Base Assistant
                    </option>
                    <option value="Booking & Scheduling">
                      Booking & Scheduling
                    </option>
                  </select>
                </div>

                {/* Modal Footer */}
                <div className="pt-3 border-t border-[#E4E5E7] flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateKeyModal(false)}
                    className="text-xs font-normal"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isCreatingKey || !newKeyName.trim()}
                    className="text-xs font-medium"
                  >
                    {isCreatingKey ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <span>Generate & Auto-Populate</span>
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
