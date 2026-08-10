'use client';

import { useState, useRef, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { User, Upload, Sparkles, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setImage(session.user.image || null);
    }
  }, [session]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (limit to 4MB)
    if (file.size > 4 * 1024 * 1024) {
      toast.error('Image size should be less than 4MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      await authClient.updateUser({
        name,
        image: image || undefined,
      });
      toast.success('Profile updated successfully!');
      
      // Reload session manually to immediately reflect across all components (like navbar)
      await authClient.getSession({
        fetchOptions: {
          cache: "no-store",
        }
      });
      router.refresh(); 
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null; // Will be handled by layout or middleware
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-400" />
          My Profile
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account information and preferences.</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800/80">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center border-4 border-slate-900 shadow-xl">
                {image ? (
                  <img src={image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-slate-500" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
              >
                <Upload className="w-6 h-6 text-white" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-semibold text-white">Profile Picture</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Upload a professional photo. Recommended size is 256x256px. Max 4MB.
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Choose new image
              </button>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={session.user.email}
                disabled
                className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
              />
              <p className="text-[10px] text-slate-500 mt-1.5">Email address cannot be changed currently.</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-end">
            <Button
              type="submit"
              disabled={isSaving}
              variant="filled"
              className="min-w-[140px]"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  SAVING...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  SAVE CHANGES
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
