import React, { useState } from "react";

const Toggle = ({ initial = false, onToggle }) => {
  const [isToggled, setIsToggled] = useState(initial);

  const toggle = () => {
    setIsToggled(!isToggled);
    if (onToggle) {
      onToggle(!isToggled);
    }
  };

  return <button onClick={toggle}>{isToggled ? "ON" : "OFF"}</button>;
};

export default Toggle;
