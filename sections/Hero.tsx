import React from "react";

const Hero: React.FC = () => {
  const today = new Date();

  let greeting = "Good Morning";

  if (today.getHours() < 12) {
    greeting = "Good Morning";
  } else if (today.getHours() < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="flex-col">
      <div className="flex items-end space-x-2">
        <p>yo </p>
        <p className="font-bold text-2xl lg:text-4xl text-gray-600">
          {greeting},
        </p>
      </div>
    </div>
  );
};
export default Hero;
