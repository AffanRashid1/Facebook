import React from "react";

const Story = ({ image, name }) => {
  const stories = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };
  return (
    <>
      <div className="stories">
        <div className="flex-column story" style={stories}></div>
        <p>
          <small>{name}</small>
        </p>
      </div>
    </>
  );
};

export default Story;
