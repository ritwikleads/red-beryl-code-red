"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format, parse, set } from "date-fns"

interface MeetingFormProps {
  trackingId: string
  onSubmit: (formData: any) => void
}

export default function MeetingForm({ trackingId, onSubmit }: MeetingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime) {
      alert("Please select a meeting date and time")
      return
    }

    const selectedDateTime = set(selectedDate, {
      hours: parseInt(selectedTime.split(':')[0]),
      minutes: parseInt(selectedTime.split(':')[1]),
      seconds: 0,
      milliseconds: 0
    })

    const formData = {
      trackingId,
      dateTime: selectedDateTime.toISOString(),
      submittedAt: new Date().toISOString(),
    }

    onSubmit(formData)
  }

  const generateTimeOptions = () => {
    const options = []
    for (let hour = 9; hour <= 20; hour++) {
      options.push(`${hour.toString().padStart(2, '0')}:00`)
      if (hour < 20) {
        options.push(`${hour.toString().padStart(2, '0')}:30`)
      }
    }
    return options
  }

    return (
    <form id="meetingForm" onSubmit={handleSubmit} className="bg-[#FDFBEF] p-2 sm:p-6 md:p-8 rounded-xl shadow-xl border border-[#B2021F]/10 w-[95%] sm:w-full max-w-[450px] mx-auto hover:shadow-2xl transition-shadow duration-300">
      <input type="hidden" id="trackingId" name="trackingId" value={trackingId} />

      <div className="mb-6 bg-[#FDFBEF] p-2 sm:p-4 rounded-lg shadow-sm border border-[#B2021F]/5 overflow-hidden">
        <label className="block mb-3 font-bold text-gray-700 text-center">Preferred Meeting Date:</label>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="w-full max-w-[320px] rounded-md border mx-auto"
            classNames={{
              months: "flex flex-col space-y-4",
              month: "space-y-4 w-full",
              caption: "flex justify-center pt-1 relative items-center text-[#B2021F]",
              caption_label: "text-lg font-medium",
              nav: "space-x-1 flex items-center",
              table: "w-full border-collapse space-y-1",
              head_row: "flex justify-center",
              head_cell: "text-muted-foreground rounded-md w-9 sm:w-11 font-normal text-[0.9rem] text-center",
              row: "flex justify-center w-full mt-2",
              cell: "h-9 w-9 sm:h-11 sm:w-11 text-center text-sm p-0 relative hover:bg-[#F5E6E8] rounded-full",
              day: "h-9 w-9 sm:h-11 sm:w-11 p-0 font-normal hover:bg-[#F5E6E8] rounded-full",
              day_selected: "bg-[#B2021F] text-white hover:bg-[#B2021F] rounded-full",
              day_today: "bg-[#F5E6E8] text-[#B2021F] font-bold",
              nav_button: "text-[#B2021F] hover:bg-[#F5E6E8] rounded-full h-7 w-7",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1"
            }}
          />
        </div>
      </div>

      {selectedDate && (
        <div className="mb-6 bg-[#FDFBEF] p-4 rounded-lg shadow-sm border border-[#B2021F]/5">
          <label className="block mb-3 font-bold text-gray-700 text-center">Preferred Meeting Time:</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-3 border rounded-md text-center bg-[#FDFBEF] hover:border-[#B2021F] focus:border-[#B2021F] focus:outline-none transition-colors"
          >
            <option value="">Select a time</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-[#B2021F] text-white py-3 px-4 rounded-md font-medium hover:bg-[#a00018] transition-colors text-lg"
      >
        Schedule Meeting
      </button>
    </form>
  )
}
