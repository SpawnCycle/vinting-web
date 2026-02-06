import { useLocation, useNavigate } from "react-router-dom";
import { CgArrowLeft, CgClose } from "react-icons/cg";

type BackButtonProps = {
  variant?: "back" | "close";
  fallback?: string;
};

export default function BackButton({
  variant = "back",
  fallback = "/",
}: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateBack = () => {
    const returnTo = location.state?.returnTo;
    const parentReturnTo = location.state?.parentReturnTo;

    if (returnTo) {
      navigate(returnTo, {
        state: parentReturnTo
          ? { returnTo: parentReturnTo }
          : undefined,
        replace: true,
      });
    } else {
      navigate(fallback, { replace: true });
    }
  };

  return (
    <button onClick={navigateBack}>
      {variant === "close" ? <CgClose /> : <CgArrowLeft />}
    </button>
  );
}
