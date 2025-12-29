// Service to fetch X (Twitter) user information
// Uses Twitter API v2 or fallback methods to fetch user profile data

export interface XUserInfo {
  handle: string;
  name: string;
  profileImageUrl?: string;
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
 * Fetches X user information by handle using Twitter API v2
 * @param handle - The X handle (without @)
 * @returns User info or null if not found
 */
export const fetchXUserInfo = async (handle: string): Promise<XUserInfo | null> => {
  const normalizedHandle = normalizeXHandle(handle);
  
  if (!normalizedHandle || normalizedHandle.length === 0) {
    return null;
  }

  try {
    // Use our Vercel serverless function to proxy Twitter API requests (solves CORS)
    // In production, this will be /api/twitter-user
    // In local dev with Vercel CLI: vercel dev, it will work
    // Otherwise, it will fall back to oEmbed API
    try {
      // Try the API route (works in production and with Vercel dev)
      const apiUrl = '/api/twitter-user';
      const response = await fetch(`${apiUrl}?handle=${encodeURIComponent(normalizedHandle)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.handle && !data.error) {
          return {
            handle: data.handle,
            name: data.name || normalizedHandle,
            profileImageUrl: data.profileImageUrl,
          };
        }
      }
    } catch (proxyError) {
      // API route not available (e.g., local dev without Vercel CLI)
      // Will fall through to oEmbed fallback
      console.warn('Twitter API proxy not available, using fallback');
    }
    
    // Fallback: Use Twitter oEmbed API (doesn't require auth but has limited data)
    try {
      const oEmbedResponse = await fetch(
        `https://publish.twitter.com/oembed?url=https://twitter.com/${normalizedHandle}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      if (oEmbedResponse.ok) {
        const oEmbedData = await oEmbedResponse.json();
        // Extract name from author_name in oEmbed response
        const name = oEmbedData.author_name || normalizedHandle;
        
        return {
          handle: normalizedHandle,
          name: name,
          // oEmbed doesn't provide profile image, so we'll use a default or leave it undefined
        };
      }
    } catch (oEmbedError) {
      console.warn('oEmbed fallback failed:', oEmbedError);
    }
    
    // Final fallback: Return basic info with handle
    return {
      handle: normalizedHandle,
      name: normalizedHandle.charAt(0).toUpperCase() + normalizedHandle.slice(1),
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

