"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import MeetingForm from "@/components/meeting-form"

export default function Home() {
  const searchParams = useSearchParams()
  const trackingId = searchParams.get("id")
  const firstName = searchParams.get("firstName")
  const lastName = searchParams.get("lastName")
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    // Record page view when page loads with valid tracking ID
    if (trackingId) {
      console.log("Page viewed with tracking ID:", trackingId)
      // In production, this would call your API to update CTR field
      // fetch('/api/record-view', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({trackingId})
      // })
    }
  }, [trackingId])

  const handleFormSubmit = async (formData: any) => {
    console.log("Form submitted:", formData)

    // In production, this would send data to your backend
    try {
      // const response = await fetch('/api/schedule-meeting', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // if (!response.ok) throw new Error('Failed to submit form')

      setShowConfirmation(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <main className="min-h-screen bg-[#FDFBEF] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {!showConfirmation ? (
          <>
            <div id="personalGreeting" className="mb-8">
              <h1 className="text-3xl font-bold text-[#B2021F] mb-4">
                Hello <span id="firstName">{firstName || "there"}</span> <span id="lastName">{lastName || ""}</span>!
              </h1>
              <p className="text-gray-700">
                Thank you for scanning the QR code. Please provide your contact information and preferred meeting time
                below.
              </p>
            </div>

            <MeetingForm trackingId={trackingId || ""} onSubmit={handleFormSubmit} />
          </>
        ) : (
          <div id="confirmation" className="mt-8 p-6 bg-[#FDFBEF] border-2 border-[#B2021F] rounded-lg">
            <h2 className="text-2xl font-bold text-[#B2021F] mb-2">Thank you!</h2>
            <p className="text-gray-700">Your meeting has been scheduled. We'll be in touch soon!</p>
          </div>
        )}
      </div>
    </main>
  )
}
