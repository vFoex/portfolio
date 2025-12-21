import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Webhook endpoint for Sanity to trigger revalidation
// Configure this webhook in your Sanity project settings
export async function POST(request: NextRequest) {
  try {
    // Verify the secret to ensure the request is from Sanity
    const secret = request.nextUrl.searchParams.get('secret')
    
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Parse the webhook payload
    const body = await request.json()
    
    // Log for debugging (optional)
    console.log('Revalidation triggered for:', body._type)

    // Revalidate all paths that might show this content
    revalidatePath('/')
    
    // If it's a project update, also revalidate the project page
    if (body._type === 'project' && body.slug?.current) {
      revalidatePath(`/project/${body.slug.current}`)
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      type: body._type 
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

// Allow GET requests to test the endpoint
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    message: 'Revalidation endpoint is working',
    timestamp: Date.now()
  })
}
