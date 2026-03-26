import { deleteProduct } from "@/api/productsApi";
import { useToast } from "@/context/ToastContext";
import { CgTrash } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

type DeleteButtonProps = {
  productId: number;
};

export default function DeleteButton({ productId }: DeleteButtonProps) {
  const { showToast } = useToast();

  const deleteProd = async () => {
    try {
      await deleteProduct(productId);
      showToast(
        "Feature unavailable",
        "Sorry, deleting products is not available yet.",
        "system",
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      className="favorite-btn delete"
      onClick={() => {
        deleteProd();
      }}
      aria-label="Delete product"
      style={{ position: "relative" }}
    >
      <CgTrash size={18} />
    </button>
  );
}
