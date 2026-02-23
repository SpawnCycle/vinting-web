import { deleteProduct } from "@/api/productsApi";
import { CgTrash } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

type DeleteButtonProps = {
  productId: number;
};

export default function DeleteButton({ productId }: DeleteButtonProps) {
  const navigate = useNavigate();

  const deleteProd = async () => {
    try {
      await deleteProduct(productId);
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      className="favorite-btn delete"
      onClick={() => {
        deleteProd();
        navigate(-1);
      }}
      aria-label="Delete product"
      style={{ position: "relative" }}
    >
      <CgTrash size={18} />
    </button>
  );
}
