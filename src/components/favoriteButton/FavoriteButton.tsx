import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState, useEffect } from "react";

import "./FavoriteButton.css";
import { useToast } from "@/context/ToastContext";

interface FavoriteButtonProps {
  /** kezdeti állapot - backendből jön majd */
  initialFavorite?: boolean;

  /** később API-hoz */
  productId?: string | number;
}

export default function FavoriteButton({
  initialFavorite = false,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);
  const { showToast } = useToast();

  // ha a backendből jövő érték változik
  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const newValue = !isFavorite;
    setIsFavorite(newValue);
    showToast(
      "Feature unavailable",
      "Saving favorites is not supported yet.\nThe product won’t be stored or visible in your favorites.",
      "system",
    );

    //  KÉSŐBB IDE JÖN AZ API HÍVÁS (ki/be kedvelés metése)
    /*
    bla bla bla
    */
  };

  return (
    <button
      className={`favorite-btn ${isFavorite ? "active" : ""}`}
      onClick={toggleFavorite}
      aria-label="Favorite"
    >
      {isFavorite ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
    </button>
  );
}
