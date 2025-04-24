"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import MeetingForm, { getGreeting } from "@/components/meeting-form"
import LogoAnimation from "@/components/logo-animation"

export default function Home() {
  const searchParams = useSearchParams()
  const trackingId = searchParams.get("id")
  const firstName = searchParams.get("firstName")
  const lastName = searchParams.get("lastName")
  const salutation = searchParams.get("salutation")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showLogo, setShowLogo] = useState(true)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    // Record page view when page loads with valid tracking ID
    if (trackingId) {
      console.log("Page viewed with tracking ID:", trackingId)
      fetch('https://auto.nubizdigital.com/webhook/87b17109-6a1f-4a4c-9a70-a6a8a856502f', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          trackingId,
          firstName: firstName || '',
          lastName: lastName || '',
          salutation: salutation || '',
          timestamp: new Date().toISOString(),
          event: 'page_view'
        })
      })
      .catch(error => console.error('Error sending tracking data:', error))
    }
  }, [trackingId, firstName, lastName])

  const handleFormSubmit = async (formData: any) => {
    console.log("Form submitted:", formData)

    try {
      const response = await fetch('https://primary-production-058e.up.railway.app/webhook/78e243ef-7220-4f55-89fc-c9d25bd23d29', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackingId: formData.trackingId,
          firstName: firstName || '',
          lastName: lastName || '',
          salutation: salutation || '',
          dateTime: formData.dateTime,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timestamp: new Date().toISOString(),
          event: 'meeting_scheduled'
        })
      })

      if (!response.ok) throw new Error('Failed to submit form')
      setShowConfirmation(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert('Failed to schedule meeting. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-[#FDFBEF] py-12 px-4 transition-all duration-300 ease-in-out relative">
      {showLogo && (
        <>
          <div className="fixed inset-0 bg-[#FDFBEF] z-40" />
          <LogoAnimation />
        </>
      )}
      <div className={`max-w-2xl mx-auto transition-all duration-500 ${showLogo ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#B2021F]/10 to-transparent pointer-events-none" />
        {!showConfirmation ? (
          <>
            <div id="personalGreeting" className="mb-8 animate-fadeIn">
              <h1 className="text-4xl font-bold text-[#B2021F] mb-4 tracking-tight">
                {greeting} {salutation && <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B2021F]/20">{salutation}.</span>} <span id="firstName" className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B2021F]/20">{firstName || "there"}</span> <span id="lastName" className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B2021F]/20">{lastName || ""}</span>!
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Thank you for scanning the QR code. Please us with your preffered date and time of meeting.
                
              </p>
            </div>

            <MeetingForm trackingId={trackingId || ""} onSubmit={handleFormSubmit} />
          </>
        ) : (
          <div id="confirmation" className="mt-8 p-8 bg-[#FDFBEF] border-2 border-[#B2021F] rounded-xl shadow-lg transform transition-all duration-500 animate-slideUp">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-[#B2021F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h2 className="text-3xl font-bold text-[#B2021F]">Thank you{salutation ? `, ${salutation}` : ''}{lastName ? ` ${lastName}` : ''}!</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">Your meeting has been scheduled. We'll be in touch soon!</p>
          </div>
        )}
      </div>
    </main>
  )
}
