import React from "react";
import { useState } from "react";
import CalendarEmb from "react-calendar";
import "./Calendar.css";

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <CalendarEmb onChange={onChange} value={date} />
    </div>
  );
}
