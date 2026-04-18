import { deleteProduct } from "@/api/productsApi";
import { useToast } from "@/context/ToastContext";
import { CgTrash } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";

import "./DeleteButton.css";

type DeleteButtonProps = {
  productId: number;
};

export default function DeleteButton({ productId }: DeleteButtonProps) {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteProd = async () => {
    try {
      await deleteProduct(productId);
      showToast(
        "Product deleted",
        "The product was successfully deleted.",
        "success",
      );
      navigate(-1);
    } catch (err) {
      console.error(err);
      showToast(
        "Delete failed",
        "We couldn't delete the product. Please try again.",
        "error",
      );
    }
  };

  return (
    <>
      <button
        className="favorite-btn delete"
        onClick={() => setShowConfirm(true)}
        aria-label="Delete product"
        style={{ position: "relative" }}
      >
        <CgTrash size={18} />
      </button>

      {showConfirm &&
        createPortal(
          <div className="delete-overlay" onClick={() => setShowConfirm(false)}>
            <div className="delete-popup" onClick={(e) => e.stopPropagation()}>
              <h2>Delete product?</h2>
              <p>
                This action cannot be undone. The product will be permanently
                removed.
              </p>
              <div className="delete-popup-buttons">
                <button
                  className="delete-popup-cancel"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="delete-popup-confirm"
                  onClick={() => {
                    setShowConfirm(false);
                    deleteProd();
                  }}
                >
                  Yes, delete
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
