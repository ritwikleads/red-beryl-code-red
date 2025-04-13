"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface DateOption {
  dateStr: string
  time: string
  fullDateTime: string
}

interface MeetingFormProps {
  trackingId: string
  onSubmit: (formData: any) => void
}

export default function MeetingForm({ trackingId, onSubmit }: MeetingFormProps) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedDateTime, setSelectedDateTime] = useState("")
  const [dateOptions, setDateOptions] = useState<DateOption[]>([])

  useEffect(() => {
    // Generate date options for the next 5 days
    const options: DateOption[] = []
    const today = new Date()

    for (let i = 1; i <= 5; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const dateStr = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })

      // Morning option
      options.push({
        dateStr,
        time: "10:00 AM",
        fullDateTime: `${dateStr} 10:00 AM`,
      })

      // Afternoon option
      options.push({
        dateStr,
        time: "2:00 PM",
        fullDateTime: `${dateStr} 2:00 PM`,
      })
    }

    setDateOptions(options)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDateTime) {
      alert("Please select a meeting date and time")
      return
    }

    const formData = {
      trackingId,
      email,
      phone,
      dateTime: selectedDateTime,
      submittedAt: new Date().toISOString(),
    }

    onSubmit(formData)
  }

  return (
    <form id="meetingForm" onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <input type="hidden" id="trackingId" name="trackingId" value={trackingId} />

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
          Email Address:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B2021F]"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2 font-bold text-gray-700">
          Phone Number:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B2021F]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">Preferred Meeting Date & Time:</label>
        <div className="flex flex-wrap gap-2 mb-4" id="dateOptions">
          {dateOptions.map((option, index) => (
            <div
              key={index}
              className={`
                border rounded p-3 cursor-pointer transition-colors
                ${
                  selectedDateTime === option.fullDateTime
                    ? "bg-[#FDFBEF] border-[#B2021F] text-[#B2021F]"
                    : "border-gray-300 hover:bg-gray-50"
                }
              `}
              onClick={() => setSelectedDateTime(option.fullDateTime)}
            >
              {option.dateStr}, {option.time}
            </div>
          ))}
        </div>
        <input type="hidden" id="selectedDateTime" name="selectedDateTime" value={selectedDateTime} />
      </div>

      <button
        type="submit"
        className="w-full bg-[#B2021F] text-white py-3 px-4 rounded font-medium hover:bg-[#a00018] transition-colors"
      >
        Schedule Meeting
      </button>
    </form>
  )
}
