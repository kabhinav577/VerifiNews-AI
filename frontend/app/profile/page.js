'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Camera, RefreshCw, CheckCircle2, User as UserIcon } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        router.push('/login');
        return;
      }
      
      setUser(session.user);
      setFullName(session.user.user_metadata?.full_name || '');
      setAvatarUrl(session.user.user_metadata?.avatar_url || '');
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: fullName, avatar_url: avatarUrl }
      });

      if (error) throw error;
      
      setUser(data.user);
      setMessage('Profile updated successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
      
      router.refresh(); // Refresh to update header
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    setUploading(true);
    setError('');
    setMessage('');

    try {
      // Upload to 'avatars' bucket
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      if (data && data.publicUrl) {
        setAvatarUrl(data.publicUrl);
        
        // Auto-save the new avatar URL
        const { error: updateError } = await supabase.auth.updateUser({
          data: { avatar_url: data.publicUrl }
        });
        
        if (updateError) throw updateError;
        setMessage('Avatar uploaded successfully!');
        router.refresh();
      }
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError('Failed to upload image. Make sure an "avatars" storage bucket exists and is public.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-brand-card rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 dark:border-brand-border">
        <div className="flex flex-col gap-2 mb-8 border-b border-slate-100 dark:border-brand-border pb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
             <UserIcon className="w-8 h-8 text-blue-500" /> My Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your personal information and account settings.</p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium text-sm">{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 rounded-xl text-sm font-medium animate-in fade-in">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-12 mt-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-slate-50 dark:border-brand-card shadow-md overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="Profile Avatar" width={128} height={128} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-5xl font-bold text-white">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              
              <button 
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 disabled:opacity-50"
                title="Upload new image"
              >
                {uploading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            <p className="text-xs text-slate-400 font-medium text-center">
              Click the camera icon to<br/>upload a new photo
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleUpdateProfile} className="flex-1 flex flex-col gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={user?.email || ''} 
                  disabled
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-brand-dark border border-slate-200 dark:border-brand-border rounded-xl text-slate-500 dark:text-slate-400 font-medium cursor-not-allowed"
                />
                <p className="text-xs text-slate-400 mt-2">Your email address cannot be changed.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 bg-white dark:bg-brand-dark border border-slate-200 dark:border-brand-border rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Avatar URL (Optional)</label>
                <input 
                  type="url" 
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/my-image.jpg"
                  className="w-full px-4 py-3 bg-white dark:bg-brand-dark border border-slate-200 dark:border-brand-border rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <p className="text-xs text-slate-400 mt-2">You can paste an external image URL if you prefer not to upload.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-brand-border mt-2 flex justify-end">
               <button
                 type="submit"
                 disabled={saving}
                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-70 flex items-center gap-2"
               >
                 {saving ? (
                   <><RefreshCw className="w-4 h-4 animate-spin" /> Saving Changes...</>
                 ) : (
                   'Save Changes'
                 )}
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
