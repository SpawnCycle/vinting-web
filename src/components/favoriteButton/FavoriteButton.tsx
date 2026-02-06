import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState, useEffect } from "react";

import "./FavoriteButton.css";

interface FavoriteButtonProps {
  /** kezdeti állapot - backendből jön majd */
  initialFavorite?: boolean;

  /** később API-hoz */
  productId?: string | number;
}

export default function FavoriteButton({
  initialFavorite = false,
  //productId,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);

  // ha a backendből jövő érték változik
  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const toggleFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const newValue = !isFavorite;
    setIsFavorite(newValue);


    //  KÉSŐBB IDE JÖN AZ API HÍVÁS
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
      {isFavorite ? (
        <AiFillHeart size={20} />
      ) : (
        <AiOutlineHeart size={20} />
      )}
    </button>
  );
}