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
      response.status(200).json({
        handle: handle.toLowerCase(),
        name: data.data.name || handle,
        profileImageUrl: data.data.profile_image_url?.replace('_normal', '_400x400') || undefined,
      });
    } else {
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching Twitter user:', error);
    response.status(500).json({ error: 'Failed to fetch user data' });
  }
}

