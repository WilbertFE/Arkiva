import supabase from "./supabase";

/**
 * Updates the user's personal information in the database.
 * 
 * @param email - The email of the user to update (unique identifier).
 * @param data - The profile data to update.
 * @returns An object containing the result or an error.
 */
export async function updateUserProfile(
  email: string,
  data: {
    full_name: string;
    school: string;
    class: string;
    avatar_url?: string;
  }
) {
  try {
    const updateData: any = {
      full_name: data.full_name,
      school: data.school,
      class: data.class,
      updated_at: new Date().toISOString(),
    };

    if (data.avatar_url !== undefined) {
      updateData.avatar_url = data.avatar_url;
    }

    const { data: updatedData, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("email", email)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: updatedData, error: null };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { data: null, error };
  }
}

/**
 * Fetches a user by their email from the database.
 * 
 * @param email - The email of the user to fetch.
 * @returns An object containing the user data or an error.
 */
export async function getUserByEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("uuid, username, email, role, full_name, school, class, avatar_url, created_at, updated_at")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      throw error;
    }

    // Map uuid to id for frontend consistency
    const result = data ? { ...data, id: data.uuid } : null;
    return { data: result, error: null };
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return { data: null, error };
  }
}

/**
 * Checks if a username is already taken by another user (case-insensitive).
 */
export async function checkUsernameAvailability(username: string, currentEmail: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .ilike("username", username)
      .neq("email", currentEmail)
      .maybeSingle();

    if (error) throw error;
    return { available: !data, error: null };
  } catch (error) {
    console.error("Error checking username availability:", error);
    return { available: false, error };
  }
}

/**
 * Updates the user's username.
 */
export async function updateUserUsername(email: string, username: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        username,
        updated_at: new Date().toISOString()
      })
      .eq("email", email)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error updating username:", error);
    return { data: null, error };
  }
}

/**
 * Deletes a file from the avatars bucket.
 */
export async function deleteAvatar(path: string) {
  try {
    const { error } = await supabase.storage.from("avatars").remove([path]);
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting avatar:", error);
    return { success: false, error };
  }
}

/**
 * Uploads a new avatar and replaces the old one if it exists.
 */
export async function uploadAvatar(userId: string, email: string, file: File) {
  try {
    // 1. Get current avatar path to delete if exists
    const { data: user } = await getUserByEmail(email);
    if (user?.avatar_url) {
      // Extract path from URL - assumes URL format like .../avatars/uuid/filename
      const url = new URL(user.avatar_url);
      const pathParts = url.pathname.split("avatars/");
      if (pathParts.length > 1) {
        await deleteAvatar(pathParts[1]);
      }
    }

    // 2. Upload new file
    const fileExt = file.name.split(".").pop();
    // Use timestamp to prevent caching, but in the userId folder
    const fileName = `avatar-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true
      });

    if (uploadError) throw uploadError;

    // 3. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    // 4. Update database
    await updateAvatarUrl(email, publicUrl);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return { url: null, error };
  }
}

/**
 * Updates the avatar URL in the user profile.
 */
export async function updateAvatarUrl(email: string, avatarUrl: string) {
  try {
    const { error } = await supabase
      .from("users")
      .update({
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      })
      .eq("email", email);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error("Error updating avatar URL:", error);
    return { success: false, error };
  }
}
