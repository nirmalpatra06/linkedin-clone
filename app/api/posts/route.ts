import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Your API logic here
    return NextResponse.json({ message: 'Hello, World!' });
}
