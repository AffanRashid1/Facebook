import React, { useEffect, useState } from "react";
import moment from "moment";

const TimeAgo = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateRelativeTime = () => {
      const now = moment();
      const postTime = moment(createdAt);
      const diffInMinutes = now.diff(postTime, "minutes");

      if (diffInMinutes < 1) {
        setTimeAgo("Just Now");
      } else if (diffInMinutes < 60) {
        setTimeAgo(
          `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`
        );
      } else {
        setTimeAgo(postTime.fromNow());
      }
    };

    // Initial update
    updateRelativeTime();

    // Set up interval to update every minute
    const intervalId = setInterval(updateRelativeTime, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [createdAt]);

  return <p>{timeAgo}</p>;
};

export default TimeAgo;
