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

  // useEffect(function () {
  //   const timeInterval = setInterval(function () {
  //     const rightNow = new Date();
  //     setTime(
  //       rightNow.toLocaleTimeString("en-US", {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       })
  //     );
  //   }, 1000);
  //   return () => clearInterval(timeInterval);
  // }, []);

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
      setTimeout(updateDate, timeUntilMidnight);
    };
    updateDate();
  }, []);
  // setInterval(function () {
  //   const currentTime = new Date();
  //   const date = currentTime.toLocaleDateString("us-EN", {
  //     month: "short",
  //     day: "numeric",
  //   });
  //   setCurrentDate(date);
  // }, 1000 * 60 * 60 * 24);

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
