import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */

function TimeWidget({ uplist }) {
  const now = new Date();
  const dateString = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const [time, setTime] = useState(
    now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );

  const [currentDate, setCurrentDate] = useState(dateString);

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
      const now = new Date();
      const timeUntilMidnight =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
          0,
          0,
          0
        ) - now;
      const timeout = setTimeout(updateDate, timeUntilMidnight);
      return clearTimeout(timeout);
    };
    updateDate();
  }, []);

  useEffect(
    function () {
      const setUpdateTime = () => {
        const now = new Date();
        const formattedNow = now.toLocaleTimeString("en-US");
        setTime(formattedNow);
      };
      setUpdateTime();
    },
    [uplist]
  );
  return (
    <div className="text-center my-2">
      <p>{currentDate}</p>
      <p>{time}</p>
    </div>
  );
}

export default TimeWidget;
