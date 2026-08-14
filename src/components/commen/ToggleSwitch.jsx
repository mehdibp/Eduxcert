import { green, border } from "../../styles/colors";

// On/Off switch
export default function ToggleSwitch({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative w-10 h-5 rounded-full transition-colors shrink-0"
      style={{ backgroundColor: on ? green : border }}
    >
      <span
        className="absolute top-[1.5px] w-4 h-4 rounded-full bg-white shadow transition-transform"
        style={{ transform: on ? "translateX(2px)" : "translateX(-18px)" }}
      />
    </button>
  );
}

