import { IoClose } from "react-icons/io5";
import "./Toast.css";
import type { IconType } from "react-icons/lib";

type Props = {
  title: string;
  message: string;
  icon: IconType;
  color: string;
  onClose: () => void;
};

export default function Toast({
  title,
  message,
  icon: Icon,
  color,
  onClose,
}: Props) {
  return (
    <div className="toast">
      <div className="toast-icon" style={{ color }}>
        <Icon size={26} />
      </div>

      <div className="toast-content">
        <div className="toast-title">{title}</div>
        <div className="toast-message">{message}</div>
      </div>

      <button className="toast-close" onClick={onClose}>
        <IoClose />
      </button>
    </div>
  );
}
