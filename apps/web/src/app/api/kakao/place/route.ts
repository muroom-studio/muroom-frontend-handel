import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const category = searchParams.get('category');
  const keyword = searchParams.get('keyword');

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Latitude and Longitude are required' },
      { status: 400 },
    );
  }

  const apiKey = process.env.KAKAO_REST_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server Configuration Error: API Key missing' },
      { status: 500 },
    );
  }

  let apiUrl = '';

  if (category) {
    apiUrl = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${category}&y=${lat}&x=${lng}&radius=50&sort=distance`;
  } else if (keyword) {
    apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}&y=${lat}&x=${lng}&radius=50&sort=distance`;
  } else {
    return NextResponse.json(
      { error: 'Either category or keyword must be provided' },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Kakao API Error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Kakao API Error' },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
