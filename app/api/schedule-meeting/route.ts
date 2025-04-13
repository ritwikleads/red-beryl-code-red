import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    console.log("Meeting scheduled:", formData)

    // In production, this would send data to your n8n webhook or other backend service
    // const response = await fetch('https://your-n8n-webhook-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })

    // Record form submission (for CTR tracking)
    if (formData.trackingId) {
      console.log("Form submitted with tracking ID:", formData.trackingId)
      // In production, you would send this to your backend
      // to update the Form_Submitted field to "yes"
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing meeting request:", error)
    return NextResponse.json({ error: "Failed to schedule meeting" }, { status: 500 })
  }
}
