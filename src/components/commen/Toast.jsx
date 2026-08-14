import { CheckIcon, XIcon, AlertIcon } from "../icons/icons";
import { ink, red } from "../../styles/colors";


// Small notification at the bottom of the page (success/failure)
export default function Toast({ message, type="check" }) {
  const icons = {
    true:  <CheckIcon/>,
    check: <CheckIcon/>,
    false: <XIcon color={red} />,
    X:     <XIcon color={red} />,
    alert: <AlertIcon/>,
  };
  
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl shadow-xl text-sm font-medium text-white flex items-center gap-2 z-50"
      style={{ backgroundColor: type ? ink : "#475569" }}
    >
      { icons[type] }
      {message}
    </div>
  );
}
