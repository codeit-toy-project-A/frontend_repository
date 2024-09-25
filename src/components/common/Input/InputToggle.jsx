import "./InputToggle.css";
import { useState } from "react";

const InputToggle = ({ label, toggleName, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue); // 부모 컴포넌트에 새로운 상태 전달
  };

  return (
    <div className="input-toggle-container">
      <label className="toggle-title">{label}</label>
      <div className="toggle-row">
        <span className="toggle-name">{toggleName}</span>
        <div className="toggle-switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggleChange}
            className="toggle-checkbox"
            id={toggleName}
          />
          <label className="toggle-slider" htmlFor={toggleName}></label>
        </div>
      </div>
    </div>
  );
};

export default InputToggle;
