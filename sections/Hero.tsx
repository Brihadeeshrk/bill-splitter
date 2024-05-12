import React from "react";

const Hero: React.FC = () => {
  const today = new Date();

  let greeting = "";

  switch (today.getHours()) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      greeting = "Good Morning";
      break;
    case 12:
    case 13:
    case 14:
    case 15:
      greeting = "Good Afternoon";
      break;
    case 16:
    case 17:
    case 18:
    case 19:
      greeting = "Good Evening";
      break;
    case 20:
    case 21:
    case 22:
    case 23:
      greeting = "Good Night";
      break;
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
