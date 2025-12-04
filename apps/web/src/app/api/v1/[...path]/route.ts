import { NextRequest, NextResponse } from 'next/server';

import { BE_BASE_URL } from '@/config/constants';

const getTargetUrl = (path: string[], searchParams: string) => {
  const pathString = path.join('/');
  const queryString = searchParams ? `?${searchParams}` : '';
  return `${BE_BASE_URL}/api/v1/${pathString}${queryString}`;
};

async function proxy(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;

  const targetUrl = getTargetUrl(path, request.nextUrl.searchParams.toString());

  const headers = new Headers();

  const authHeader = request.headers.get('Authorization');
  if (authHeader) {
    headers.set('Authorization', authHeader);
  }

  const contentType = request.headers.get('Content-Type');
  if (contentType) {
    headers.set('Content-Type', contentType);
  }

  try {
    const body =
      request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.blob()
        : null;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: headers, // Origin이 없는 헤더 전송
      body: body,
      cache: 'no-store',
      redirect: 'manual',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🚨 [Proxy Error] Status: ${response.status}`);
      console.error(`🚨 [Proxy Error] Body: ${errorText}`);

      return new NextResponse(errorText, {
        status: response.status,
        statusText: response.statusText,
      });
    }

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error('🔥 [Proxy Internal Error]:', error);
    return NextResponse.json(
      { message: 'Internal Proxy Error' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest, ctx: any) {
  return proxy(req, ctx);
}
export async function POST(req: NextRequest, ctx: any) {
  return proxy(req, ctx);
}
export async function PUT(req: NextRequest, ctx: any) {
  return proxy(req, ctx);
}
export async function DELETE(req: NextRequest, ctx: any) {
  return proxy(req, ctx);
}
export async function PATCH(req: NextRequest, ctx: any) {
  return proxy(req, ctx);
}
