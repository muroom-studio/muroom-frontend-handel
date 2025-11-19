import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  // 네이버 검색 API 호출 (지역 검색)
  const encodedQuery = encodeURIComponent(query);
  const apiUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodedQuery}&display=5&sort=random`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': process.env
          .NEXT_PUBLIC_NAVER_SEARCH_CLIENT_ID as string,
        'X-Naver-Client-Secret': process.env
          .NEXT_PUBLIC_NAVER_SEARCH_CLIENT_SECRET as string,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Naver API Error' },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
