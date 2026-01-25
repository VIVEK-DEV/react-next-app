import { NextResponse } from 'next/server';
export const runtime = 'nodejs'

export async function GET() {
  try {
    // Call external JSON API (JSONPlaceholder)
    const usersUrl = process.env.users_url;
    if (!usersUrl) {
      throw new Error("USERS_URL environment variable is not defined");
    }
    console.log("Fetching users from:", usersUrl);
    const response = await fetch(usersUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch from external API');
    }

    const data = await response.json();

    // Transform the data to match our format
    const users = data.slice(0, 4).map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.company?.name ? 'Employee' : 'User',
      status: user.id % 2 === 0 ? 'Active' : 'Active',
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users from external API' },
      { status: 500 }
    );
  }
}
