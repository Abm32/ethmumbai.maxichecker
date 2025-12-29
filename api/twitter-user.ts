// Vercel serverless function to proxy Twitter API requests
// This solves CORS issues by making the request server-side

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Enable CORS
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  const { handle } = request.query;

  if (!handle || typeof handle !== 'string') {
    response.status(400).json({ error: 'Handle parameter is required' });
    return;
  }

  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    response.status(500).json({ error: 'Twitter Bearer Token not configured' });
    return;
  }

  try {
    const twitterResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${encodeURIComponent(handle)}?user.fields=name,profile_image_url`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      }
    );

    if (!twitterResponse.ok) {
      const errorText = await twitterResponse.text();
      response.status(twitterResponse.status).json({ 
        error: 'Twitter API error',
        details: errorText 
      });
      return;
    }

    const data = await twitterResponse.json();
    
    if (data.data) {
      // Handle profile image URL - convert to higher resolution
      let profileImageUrl = data.data.profile_image_url;
      if (profileImageUrl) {
        // Replace _normal with _400x400 for better quality
        if (profileImageUrl.includes('_normal')) {
          profileImageUrl = profileImageUrl.replace('_normal', '_400x400');
        } else if (profileImageUrl.includes('_200x200')) {
          profileImageUrl = profileImageUrl.replace('_200x200', '_400x400');
        }
        // Ensure HTTPS
        profileImageUrl = profileImageUrl.replace('http://', 'https://');
      }
      
      console.log('Twitter user data:', {
        handle: handle.toLowerCase(),
        name: data.data.name,
        profileImageUrl: profileImageUrl
      });
      
      response.status(200).json({
        handle: handle.toLowerCase(),
        name: data.data.name || handle,
        profileImageUrl: profileImageUrl || undefined,
      });
    } else {
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching Twitter user:', error);
    response.status(500).json({ error: 'Failed to fetch user data' });
  }
}

