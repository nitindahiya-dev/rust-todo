import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Import Popover from shadcn
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar"; // Import Calendar from shadcn
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";

export const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("12:00");

  const handleDateChange = (date?: Date) => {
    setSelectedDate(date); // Handle undefined as well
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Date and Time Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-2 border border-gray-300 rounded-md p-2 hover:bg-gray-100">
            <CalendarIcon />
            <ClockIcon /> {/* Clock icon opens the calendar */}
            <span>
              {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-2 bg-white border shadow-md rounded-md">
          <ShadcnCalendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
          />
        </PopoverContent>
      </Popover>

      {/* Time Picker */}
      <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2 hover:bg-gray-100">
        <ClockIcon />
        <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="outline-none"
        />
      </div>
    </div>
  );
};
