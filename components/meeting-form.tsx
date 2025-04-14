"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format, parse, set } from "date-fns"
import "@/app/animations.css"

interface MeetingFormProps {
  trackingId: string
  onSubmit: (formData: any) => void
}

export default function MeetingForm({ trackingId, onSubmit }: MeetingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [showTimeSelect, setShowTimeSelect] = useState<boolean>(false)

  useEffect(() => {
    if (selectedDate) {
      setShowTimeSelect(true)
    }
  }, [selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime) {
      alert("Please select a meeting date and time")
      return
    }

    const [time, period] = selectedTime.split(' ')
    const [hours, minutes] = time.split(':')
    let hour = parseInt(hours)
    if (period === 'PM' && hour !== 12) hour += 12
    if (period === 'AM' && hour === 12) hour = 0

    const selectedDateTime = set(selectedDate, {
      hours: hour,
      minutes: parseInt(minutes),
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
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour > 12 ? hour - 12 : hour
      options.push(`${displayHour}:00 ${ampm}`)
      if (hour < 20) {
        options.push(`${displayHour}:30 ${ampm}`)
      }
    }
    return options
  }

    return (
      <div className="space-y-4 md:space-y-6 w-full max-w-[450px] mx-auto px-4 sm:px-3 md:px-0">
        <input type="hidden" id="trackingId" name="trackingId" value={trackingId} />

        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            fromMonth={new Date()}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            className="w-full max-w-[400px] rounded-md mx-auto"
            classNames={{
              months: "flex flex-col space-y-4",
              month: "space-y-4 w-full",
              caption: "flex justify-center pt-1 relative items-center text-[#B2021F]",
              caption_label: "text-base sm:text-xl font-medium",
              nav: "space-x-1 flex items-center",
              table: "w-full border-collapse space-y-1",
              head_row: "flex justify-center",
              head_cell: "text-muted-foreground rounded-md w-7 sm:w-11 md:w-14 font-normal text-[10px] sm:text-sm md:text-[1rem] text-center",
              row: "flex justify-center w-full mt-1 sm:mt-2",
              cell: "h-9 w-9 sm:h-11 sm:w-11 md:h-14 md:w-14 text-center text-xs sm:text-sm p-0 relative hover:bg-[#F5E6E8] rounded-full",
              day: "h-9 w-9 sm:h-11 sm:w-11 md:h-14 md:w-14 p-0 font-normal hover:bg-[#F5E6E8] rounded-full text-xs sm:text-sm md:text-base",
              day_selected: "bg-[#B2021F] text-white hover:bg-[#B2021F] rounded-full",
              day_today: "bg-[#F5E6E8] text-[#B2021F] font-bold",
              nav_button: "text-[#B2021F] hover:bg-[#F5E6E8] rounded-full h-9 w-9",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1"
            }}
          />
        </div>

        <div className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${showTimeSelect ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {showTimeSelect && (
            <div className="animate-fadeIn">
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-3 border rounded-md text-center text-base hover:border-[#B2021F] focus:border-[#B2021F] focus:outline-none transition-colors"
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
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#B2021F] text-white py-3 px-4 rounded-md font-medium hover:bg-[#a00018] transition-colors text-base sm:text-lg mt-6 sm:mt-4"
        >
          Schedule Meeting
        </button>
      </div>
    )
}
