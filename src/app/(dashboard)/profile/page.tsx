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
        <Loader2 className="w-8 h-8 text-[#1DBF73] animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null; // Will be handled by layout or middleware
  }

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight flex items-center gap-2.5">
          <span>My Profile</span>
        </h1>
        <p className="text-[#62646A] text-xs sm:text-sm mt-1">Manage your account information and preferences.</p>
      </div>

      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 md:p-6">
        <form onSubmit={handleSave} className="space-y-4">
          {/* Profile Picture Section */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-[#E4E5E7]">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border-2 border-slate-200">
                {image ? (
                  <img src={image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-[#74767E]" strokeWidth={1.5} />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
              >
                <Upload className="w-5 h-5 text-white" strokeWidth={1.5} />
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
              <h3 className="text-xs font-medium text-[#222325]">Profile Picture</h3>
              <p className="text-[11px] text-[#62646A] mt-1 max-w-xs">
                Upload a professional photo. Recommended size is 256x256px. Max 4MB.
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-xs font-normal text-[#1DBF73] hover:underline transition-colors cursor-pointer"
              >
                Choose new image
              </button>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-xs font-normal text-[#404145] mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-[#E4E5E7] rounded-md px-3 py-2 text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73] transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs font-normal text-[#404145] mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={session.user.email}
                disabled
                className="w-full bg-[#F7F7F7] border border-[#E4E5E7] rounded-md px-3 py-2 text-xs text-[#74767E] cursor-not-allowed"
              />
              <p className="text-[10px] text-[#74767E] mt-1">Email address cannot be changed currently.</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3 flex items-center justify-end">
            <Button
              type="submit"
              disabled={isSaving}
              variant="primary"
              className="!font-normal text-xs"
            >
              {isSaving ? (
                <>
                  Saving...
                </>
              ) : (
                <>
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
