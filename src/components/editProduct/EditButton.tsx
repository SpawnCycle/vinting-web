import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type EditButtonProps = {
  productId: number;
  returnTo?: string;
};


export default function EditButton({ productId, returnTo }: EditButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className="favorite-btn edit"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(`/product/${productId}/edit`, {
          state: { returnTo },
        });
      }}
      aria-label="Edit product"
    >
      <AiOutlineEdit size={18} />
    </button>
  );
}