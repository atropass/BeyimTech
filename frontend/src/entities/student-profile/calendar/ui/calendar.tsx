import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/en-gb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui/button/button";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs.locale("en-gb");

const Calendar = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startDay = currentMonth.startOf("month").weekday(0); // Make sure the week starts on Monday

  const navigateMonth = (direction: number) => {
    setCurrentMonth(currentMonth.add(direction, "month"));
  };

  const navigateYear = (direction: number) => {
    setCurrentMonth(currentMonth.add(direction, "year"));
  };

  const daysMatrix = () => {
    const matrix: dayjs.Dayjs[][] = [];
    let day = startDay.clone();

    for (let i = 0; i < 6; i++) {
      matrix[i] = [];
      for (let j = 0; j < 7; j++) {
        matrix[i][j] = day.clone();
        day = day.add(1, "day");
      }
    }
    return matrix;
  };

  const handleDayClick = (day: dayjs.Dayjs) => {
    navigate(`create-entry`);
  };

  return (
    <div className="bg-white w-full p-4 shadow-sm rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => navigateYear(-1)}>Previous Year</Button>
        <Button onClick={() => navigateMonth(-1)}>Prev Month</Button>
        <span className="w-24 h-16 flex justify-center text-center items-center">
          <p>{currentMonth.format("MMMM YYYY")}</p>
        </span>
        <Button onClick={() => navigateMonth(1)}>Next Month</Button>
        <Button onClick={() => navigateYear(1)}>Next Year</Button>
      </div>
      <div>
        <div className="flex w-full justify-between  py-1 border-b border-blue-200">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-blue-500 w-full text-center">
              {day}
            </div>
          ))}
        </div>
        {daysMatrix().map((week, wi) => (
          <div key={wi} className="flex w-full h-16 justify-between">
            {week.map((day, di) => (
              <div
                key={di}
                className="w-full hover:text-white hover:bg-blue duration-75 cursor-pointer border py-4 flex justify-center items-center"
                onClick={() => handleDayClick(day)}
              >
                {day.format("D")}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
