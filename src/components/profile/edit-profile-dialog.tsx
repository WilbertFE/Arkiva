"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Camera, Loader2, AlertCircle, X, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import Cropper, { Point, Area } from "react-easy-crop";
import { 
  checkUsernameAvailability, 
  updateUserUsername, 
  uploadAvatar 
} from "@/lib/db";
import { getCroppedImg } from "@/lib/image";
import type { User } from "@/lib/types";

interface EditProfileDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileDialog({
  user,
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const { update } = useSession();
  const [username, setUsername] = useState(user.username);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user.avatar_url || null);
  const [selectedFile, setSelectedFile] = useState<File | Blob | null>(null);
  
  // Cropping state
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingCrop, setIsProcessingCrop] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    avatar?: string;
  }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update local state when user prop changes
  useEffect(() => {
    if (open) {
      setUsername(user.username);
      setPreviewUrl(user.avatar_url || null);
      setSelectedFile(null);
      setImageToCrop(null);
      setError(null);
      setFieldErrors({});
    }
  }, [user, open]);

  const onCropComplete = useCallback((_extendedArea: Area, _pixelArea: Area) => {
    setCroppedAreaPixels(_pixelArea);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFieldErrors(prev => ({ ...prev, avatar: "Only JPG, PNG, and WebP are allowed." }));
      return;
    }

    if (file.size > 500 * 1024) {
      setFieldErrors(prev => ({ ...prev, avatar: "File size must be less than 500KB." }));
      return;
    }

    setFieldErrors(prev => ({ ...prev, avatar: undefined }));
    const url = URL.createObjectURL(file);
    setImageToCrop(url);
  };

  const handleApplyCrop = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;
    
    setIsProcessingCrop(true);
    try {
      const croppedImageBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
      
      // Convert Blob to File so it has a name (required by uploadAvatar to get extension)
      const croppedFile = new File([croppedImageBlob], "avatar.jpg", { type: "image/jpeg" });
      
      const url = URL.createObjectURL(croppedFile);
      setPreviewUrl(url);
      setSelectedFile(croppedFile);
      setImageToCrop(null); // Close crop interface
    } catch (err) {
      console.error("Error cropping image:", err);
      setError("Failed to crop image. Please try again.");
    } finally {
      setIsProcessingCrop(false);
    }
  };

  const validateUsername = (name: string) => {
    const regex = /^[a-z0-9_]{3,20}$/;
    if (!regex.test(name)) {
      return "Username must be 3-20 characters and only contain lowercase letters, numbers, and underscores.";
    }
    return null;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      // 1. Validate Username Format
      const usernameError = validateUsername(username);
      if (usernameError) {
        setFieldErrors(prev => ({ ...prev, username: usernameError }));
        setIsLoading(false);
        return;
      }

      // 2. Check Username Availability (if changed)
      if (username !== user.username) {
        const { available, error: checkError } = await checkUsernameAvailability(username, user.email);
        if (checkError) throw checkError;
        if (!available) {
          setFieldErrors(prev => ({ ...prev, username: "This username is already taken." }));
          setIsLoading(false);
          return;
        }
      }

      let updatedAvatarUrl = user.avatar_url;

      // 3. Upload Avatar if selected
      if (selectedFile) {
        const { url, error: uploadError } = await uploadAvatar(user.id, user.email, selectedFile as File);
        if (uploadError) throw uploadError;
        updatedAvatarUrl = url || undefined;
      }

      // 4. Update Username in DB if changed
      if (username !== user.username) {
        const { error: updateError } = await updateUserUsername(user.email, username);
        if (updateError) throw updateError;
      }

      // 5. Update NextAuth Session
      await update({
        user: {
          ...user,
          username,
          avatar_url: updatedAvatarUrl
        }
      });

      onOpenChange(false);
    } catch (err: any) {
      console.error("Error saving profile:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const initials = user.full_name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[425px] overflow-hidden transition-all duration-300 ${imageToCrop ? 'sm:max-w-[500px]' : ''}`}>
        <DialogHeader>
          <DialogTitle>{imageToCrop ? 'Crop Image' : 'Edit Profile'}</DialogTitle>
          <DialogDescription>
            {imageToCrop 
              ? 'Adjust your image to fit the square crop area.' 
              : "Make changes to your profile here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        
        {error && !imageToCrop && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {imageToCrop ? (
          /* Cropping User Interface */
          <div className="flex flex-col gap-6 py-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-64 w-full bg-slate-900 rounded-lg overflow-hidden ring-1 ring-slate-200">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
                showGrid={false}
              />
            </div>
            
            <div className="space-y-3 px-1">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
                className="w-full"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setImageToCrop(null)}
                disabled={isProcessingCrop}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleApplyCrop}
                disabled={isProcessingCrop}
              >
                {isProcessingCrop ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                Apply Crop
              </Button>
            </div>
          </div>
        ) : (
          /* Main Form Interface */
          <form onSubmit={handleSave} className="flex flex-col items-center gap-6 py-4 animate-in fade-in duration-200">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group">
                <Avatar className="h-24 w-24 ring-4 ring-slate-100 group-hover:opacity-80 transition-opacity overflow-hidden">
                  {previewUrl ? (
                    <AvatarImage src={previewUrl} alt="Profile preview" className="object-cover" />
                  ) : (
                    <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  type="button"
                  disabled={isLoading}
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />
              </div>
              {fieldErrors.avatar && (
                <p className="text-xs font-medium text-red-600 text-center">{fieldErrors.avatar}</p>
              )}
              <p className="text-xs text-slate-500">JPG, PNG or WebP. Max 500KB</p>
            </div>

            {/* Username Input */}
            <div className="w-full space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  @
                </span>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  className={`pl-7 ${fieldErrors.username ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  placeholder="Enter username"
                  disabled={isLoading}
                />
              </div>
              {fieldErrors.username && (
                <p className="text-xs font-medium text-red-600">{fieldErrors.username}</p>
              )}
            </div>

            <DialogFooter className="w-full pt-2">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                disabled={isLoading}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
