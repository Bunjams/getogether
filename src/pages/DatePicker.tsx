import classNames from "classnames";
import dayjs from "dayjs";
import React, { memo } from "react";

const Day = ({
  daysCount,
  weekStartDayNumber,
  selectedDate,
  onDateClick,
  isCurrentMonthDateSelected,
}: {
  daysCount: number;
  weekStartDayNumber: number;
  onDateClick: (day: number) => void;
  selectedDate?: string;
  isCurrentMonthDateSelected: boolean;
}) => {
  const totalDays = daysCount + weekStartDayNumber;

  const days = Array.from({ length: totalDays }, (_, index) =>
    weekStartDayNumber > index ? null : index - weekStartDayNumber + 1
  );

  const currentDay = dayjs(selectedDate).get("date");

  return (
    <div className="grid grid-cols-7 gap-3 justify-between">
      {days.map((day) => {
        if (day === null) {
          return <div className="bg-white p-2 h-10 w-11 text-center" />;
        }
        return (
          <button
            className={classNames(
              "all:unset p-2 h-10 w-11 text-center bg-neutral-300",
              {
                "!bg-neutral-600 text-white":
                  day === currentDay && isCurrentMonthDateSelected,
              }
            )}
            onClick={() => onDateClick(day)}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
};

const Week = () => {
  const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="grid grid-cols-7 gap-3 justify-between">
      {weekNames.map((weekName) => {
        return (
          <div className="bg-neutral-400 p-2 h-10 w-11 text-center">
            {weekName}
          </div>
        );
      })}
    </div>
  );
};

const Header = ({
  currentMonthName,
  currentYear,
  handleMonthDecrement,
  handleMonthIncrement,
}: {
  currentMonthName: string;
  currentYear: string;
  handleMonthIncrement: () => void;
  handleMonthDecrement: () => void;
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <button
        onClick={handleMonthDecrement}
        className="p-2 px-4 hover:bg-neutral-300 rounded"
      >
        {"<"}
      </button>
      <div className="text-center">
        {currentMonthName} {currentYear}
      </div>
      <button
        onClick={handleMonthIncrement}
        className="p-2 px-4 hover:bg-neutral-300 rounded"
      >
        {">"}
      </button>
    </div>
  );
};

const WeekNames = memo(Week);
const MemoHeader = memo(Header);

const DatePciker = () => {
  const [year, setYear] = React.useState(2024);
  const [month, setMonth] = React.useState(6);
  const [selectedDate, setSelectedDate] = React.useState<string>();

  const date = dayjs(`${year}-${month}`);
  const currentMonthDaysCount = dayjs(date).daysInMonth();
  const currentMonthName = dayjs(date).format("MMMM");
  const currentYear = dayjs(date).format("YYYY");
  const weekStartDayNumber = dayjs(date).startOf("month").day();

  const handleMonthIncrement = () => {
    setMonth((prev) => (prev === 12 ? 1 : prev + 1));
    if (month === 12) {
      setYear((prev) => prev + 1);
    }
  };

  const handleMonthDecrement = () => {
    setMonth((prev) => (prev === 1 ? 12 : prev - 1));
    if (month === 1) {
      setYear((prev) => prev - 1);
    }
  };

  const onDateClick = (day: number) => {
    const date = dayjs(`${year}-${month}-${day}`).format("DD-MMMM-YYYY");
    setSelectedDate(date);
  };

  const isCurrentMonthYearDateSelected =
    dayjs(date).format("M") === dayjs(selectedDate).format("M") &&
    dayjs(date).format("YYYY") === dayjs(selectedDate).format("YYYY");

  return (
    <div className="max-w-96 bg-white m-10 flex flex-col items-center p-3 gap-3">
      <MemoHeader
        {...{
          currentMonthName,
          currentYear,
          handleMonthDecrement,
          handleMonthIncrement,
        }}
      />
      <WeekNames />
      <Day
        onDateClick={onDateClick}
        daysCount={currentMonthDaysCount}
        weekStartDayNumber={weekStartDayNumber}
        selectedDate={selectedDate}
        isCurrentMonthDateSelected={isCurrentMonthYearDateSelected}
      />
      {selectedDate && (
        <span className="bg-black text-white w-full text-center p-3">
          {selectedDate}
        </span>
      )}
    </div>
  );
};

export default DatePciker;
