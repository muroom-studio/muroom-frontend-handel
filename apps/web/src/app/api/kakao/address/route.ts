import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Coordinates required' },
      { status: 400 },
    );
  }

  const apiKey = process.env.KAKAO_REST_API_KEY;

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
        cache: 'force-cache',
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Kakao API Error' },
        { status: response.status },
      );
    }

    const data = await response.json();

    const regionName =
      data.documents && data.documents.length > 0
        ? data.documents[0].address.region_2depth_name
        : '';

    return NextResponse.json({ regionName });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
