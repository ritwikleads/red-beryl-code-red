"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format, parse, set } from "date-fns"
import "@/app/animations.css"
 import { useToast } from "@/components/ui/use-toast"

interface MeetingFormProps {
  trackingId: string
  onSubmit: (formData: any) => void
}

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export default function MeetingForm({ trackingId, onSubmit }: MeetingFormProps) {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setMounted(true);
    setGreeting(getGreeting());
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [showTimeSelect, setShowTimeSelect] = useState<boolean>(false)
  const [showTimeError, setShowTimeError] = useState<boolean>(false)

  useEffect(() => {
    if (selectedDate) {
      setShowTimeSelect(true)
    }
  }, [selectedDate])

  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime) {
      setShowTimeError(true)
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
            className="w-full max-w-lg rounded-md mx-auto" // Increased max-width from 400px to lg (512px)
            classNames={{
              months: "flex flex-col space-y-4",
              month: "space-y-4 w-full",
              caption: "flex justify-center pt-1 relative items-center text-[#B2021F]",
              caption_label: "text-base sm:text-xl font-medium",
              nav: "space-x-1 flex items-center",
              table: "w-full border-collapse space-y-1",
              head_row: "flex justify-center",
              head_cell: "text-muted-foreground rounded-md w-9 sm:w-11 md:w-14 font-normal text-[11px] sm:text-sm md:text-[1rem] text-center",
              row: "flex justify-center w-full mt-2 sm:mt-2",
              cell: "h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 text-center text-sm sm:text-base p-0 relative hover:bg-[#F5E6E8] rounded-full",
              day: "h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 p-0 font-normal hover:bg-[#F5E6E8] rounded-full text-sm sm:text-base md:text-base",
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
                onChange={(e) => {
                  setSelectedTime(e.target.value)
                  setShowTimeError(false)
                }}
                className={`w-full p-3 border rounded-md text-center text-base hover:border-[#B2021F] focus:border-[#B2021F] focus:outline-none transition-colors ${showTimeError ? 'border-red-500' : ''}`}
              >
                <option value="">Select a time</option>
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            {showTimeError && (
              <p className="text-red-500 text-sm mt-2">Please select a time</p>
            )}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#B2021F] text-white py-3 px-4 rounded-md font-medium hover:bg-[#a00018] transition-colors text-base sm:text-lg mt-6 sm:mt-4 active:scale-95 transform transition-transform duration-100"
        >
          Schedule Meeting
        </button>
      </div>
    )
}
