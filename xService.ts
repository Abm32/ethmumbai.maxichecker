// Service to fetch X (Twitter) user information
// Note: This uses a public API endpoint. For production, you might want to use Twitter API v2 with proper authentication

export interface XUserInfo {
  handle: string;
  name: string;
}

/**
 * Validates and normalizes an X handle
 * @param handle - The X handle input (with or without @)
 * @returns Normalized handle without @
 */
export const normalizeXHandle = (handle: string): string => {
  return handle.trim().replace(/^@/, '').toLowerCase();
};

/**
 * Fetches X user information by handle
 * @param handle - The X handle (without @)
 * @returns User info or null if not found
 */
export const fetchXUserInfo = async (handle: string): Promise<XUserInfo | null> => {
  const normalizedHandle = normalizeXHandle(handle);
  
  if (!normalizedHandle || normalizedHandle.length === 0) {
    return null;
  }

  try {
    // Using a public API endpoint (you may want to replace this with Twitter API v2 in production)
    // For now, we'll simulate fetching user data
    // In production, you'd use: https://api.twitter.com/2/users/by/username/:username
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, we'll return mock data
    // In production, replace this with actual Twitter API call:
    /*
    const response = await fetch(`https://api.twitter.com/2/users/by/username/${normalizedHandle}?user.fields=name`, {
      headers: {
        'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return {
      handle: normalizedHandle,
      name: data.data.name || normalizedHandle,
    };
    */
    
    // Mock implementation for now
    // You can replace this with actual Twitter API integration
    return {
      handle: normalizedHandle,
      name: normalizedHandle.charAt(0).toUpperCase() + normalizedHandle.slice(1), // Capitalize first letter as mock name
    };
  } catch (error) {
    console.error('Error fetching X user info:', error);
    return null;
  }
};

/**
 * Verifies if an X handle exists
 * @param handle - The X handle to verify
 * @returns True if handle is valid format
 */
export const validateXHandle = (handle: string): boolean => {
  const normalized = normalizeXHandle(handle);
  // X handles: 1-15 characters, alphanumeric and underscores only
  return /^[a-zA-Z0-9_]{1,15}$/.test(normalized);
};

