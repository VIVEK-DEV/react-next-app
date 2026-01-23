import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Call external JSON API (JSONPlaceholder)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error('Failed to fetch from external API');
    }
    
    const data = await response.json();
    
    // Transform the data to match our product format
    const products = data.slice(0, 4).map((post: any) => ({
      id: post.id,
      name: `Product ${post.id}`,
      price: (Math.random() * 1000 + 20).toFixed(2),
      category: post.userId % 2 === 0 ? 'Electronics' : 'Accessories',
      stock: Math.floor(Math.random() * 150 + 10),
      rating: (Math.random() * 2 + 3.5).toFixed(1),
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products from external API' },
      { status: 500 }
    );
  }
}
