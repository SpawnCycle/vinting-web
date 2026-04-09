import { deleteProduct } from "@/api/productsApi";
import { useToast } from "@/context/ToastContext";
import { CgTrash } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

type DeleteButtonProps = {
  productId: number;
};

export default function DeleteButton({ productId }: DeleteButtonProps) {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const deleteProd = async () => {
    try {
      await deleteProduct(productId);

      await showToast(
        "Product deleted",
        "The product was successfully deleted.",
        "success",
      );
      await navigate(-1);
    } catch (err) {
      console.error(err);

      showToast(
        "Delete failed",
        "We couldn’t delete the product. Please try again.",
        "error",
      );
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
