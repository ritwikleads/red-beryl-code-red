import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { trackingId } = await request.json()

    if (!trackingId) {
      return NextResponse.json({ error: "Tracking ID is required" }, { status: 400 })
    }

    console.log("Recording page view for tracking ID:", trackingId)

    // In production, this would call your n8n webhook to update CTR field
    // const response = await fetch('https://your-n8n-webhook-url/record-view', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({trackingId})
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error recording page view:", error)
    return NextResponse.json({ error: "Failed to record page view" }, { status: 500 })
  }
}
