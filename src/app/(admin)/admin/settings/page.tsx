"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Save } from "lucide-react";
import Button from "@/components/Button";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("");
  const [announcementBanner, setAnnouncementBanner] = useState("");
  const [defaultSignupCredits, setDefaultSignupCredits] = useState(1500);

  const { data, isLoading } = useQuery({
    queryKey: ["adminPlatformSettings"],
    queryFn: () => api.get("/api/admin/settings") as Promise<any>,
  });

  useEffect(() => {
    if (data?.settings) {
      setMaintenanceMode(Boolean(data.settings.maintenanceMode));
      setMaintenanceMessage(data.settings.maintenanceMessage || "");
      setAnnouncementBanner(data.settings.announcementBanner || "");
      setDefaultSignupCredits(data.settings.defaultSignupCredits || 1500);
    }
  }, [data]);

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      return api.post("/api/admin/settings", { key, value });
    },
    onSuccess: () => {
      toast.success("Settings saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminPlatformSettings"] });
    },
    onError: () => {
      toast.error("Failed to update settings.");
    },
  });

  const handleSaveAll = async () => {
    try {
      await updateSettingMutation.mutateAsync({ key: "maintenanceMode", value: maintenanceMode });
      await updateSettingMutation.mutateAsync({ key: "maintenanceMessage", value: maintenanceMessage });
      await updateSettingMutation.mutateAsync({ key: "announcementBanner", value: announcementBanner });
      await updateSettingMutation.mutateAsync({ key: "defaultSignupCredits", value: defaultSignupCredits });
    } catch {}
  };

  if (isLoading) {
    return <div className="py-12 text-center text-xs text-[#74767E]">Loading platform settings...</div>;
  }

  return (
    <div className="space-y-3 text-left max-w-3xl">
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 sm:p-5.5">
        <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
          Platform Global Configurations
        </h1>
        <p className="text-xs sm:text-sm text-[#62646A] mt-0.5">
          Configure platform-wide banners, default credits, and maintenance modes.
        </p>
      </div>

      <div className="p-5 sm:p-6 bg-white border border-[#E4E5E7] rounded-md space-y-5">
        {/* Maintenance Toggle */}
        <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-4">
          <div>
            <span className="text-sm font-medium text-[#222325]">Maintenance Mode</span>
            <p className="text-xs text-[#74767E] mt-0.5">
              Temporarily restrict regular store access while keeping admin operations active.
            </p>
          </div>
          <button
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`w-11 h-6 rounded-md p-1 transition flex items-center border ${
              maintenanceMode ? "bg-[#1DBF73] border-[#1DBF73]" : "bg-[#F0F2F5] border-[#E4E5E7]"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-md bg-white transition-transform ${
                maintenanceMode ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Maintenance Message */}
        <div className="space-y-1.5">
          <label className="block text-xs font-normal text-[#74767E]">Maintenance Notice Message</label>
          <input
            type="text"
            value={maintenanceMessage}
            onChange={(e) => setMaintenanceMessage(e.target.value)}
            placeholder="e.g. Labto AI is undergoing scheduled maintenance. Back online shortly."
            className="w-full px-3.5 py-2.5 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
          />
        </div>

        {/* Announcement Banner */}
        <div className="space-y-1.5">
          <label className="block text-xs font-normal text-[#74767E]">Platform Announcement Banner (Optional)</label>
          <input
            type="text"
            value={announcementBanner}
            onChange={(e) => setAnnouncementBanner(e.target.value)}
            placeholder="e.g. 🚀 Welcome to Labto AI v2 with multi-tier subscription engine!"
            className="w-full px-3.5 py-2.5 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
          />
        </div>

        {/* Default Signup Credits */}
        <div className="space-y-1.5">
          <label className="block text-xs font-normal text-[#74767E]">Default Signup Free AI Credits</label>
          <input
            type="number"
            value={defaultSignupCredits}
            onChange={(e) => setDefaultSignupCredits(parseInt(e.target.value, 10) || 0)}
            placeholder="1500"
            className="w-full px-3.5 py-2.5 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
          />
        </div>

        <div className="pt-3 border-t border-[#E4E5E7] flex justify-end">
          <Button
            variant="primary"
            onClick={handleSaveAll}
            disabled={updateSettingMutation.isPending}
            className="px-5 py-2 text-xs !font-normal flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{updateSettingMutation.isPending ? "Saving..." : "Save Platform Settings"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
