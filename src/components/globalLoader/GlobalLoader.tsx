import { useLoading } from "@/context/LoadingContext";
import "./GlobalLoader.css";

export default function GlobalLoader() {
  const { loading } = useLoading();
  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
}
