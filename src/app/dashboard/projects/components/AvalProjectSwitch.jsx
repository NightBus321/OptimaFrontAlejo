import { Switch } from "@material-tailwind/react";
import { useState } from "react";
export default function AvalProjectSwitch({ onSelectChange }) {
  const [selectedValue, setSelectedValue] = useState(true);
  const handleChange = () => {
    setSelectedValue(!selectedValue);
    onSelectChange(selectedValue);
  };
  return (
    <Switch
      id="custom-switch-component"
      value={selectedValue}
      onChange={handleChange}
      ripple={false}
      className="h-full p-2 mt-3 w-full checked:bg-[#2ec946]"
      containerProps={{
        className: "w-11 h-6",
      }}
      circleProps={{
        className: "before:hidden mt-3 left-0.5 border-none",
      }}
    />
  );
}
