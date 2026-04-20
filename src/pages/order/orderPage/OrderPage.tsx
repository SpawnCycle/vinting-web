import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/api/productsApi";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import { IoArrowBack } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

import type { ProductUI } from "@/types/Product/ProductUI";

import "./OrderPage.css";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";
import { orderProduct } from "@/api/orderApi";

export default function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { showToast } = useToast();

  const [product, setProduct] = useState<ProductUI | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [openShipping, setOpenShipping] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getProductById(Number(id!));
        if (res?.sellerId === user?.id) {
          showToast("You cannot order your own product", "", "system");
          navigate("/");
          return;
        }
        setProduct(res);
        setQuantity(1);
      } catch {
        showToast("Failed to load product", "Try again later.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return null;

  const maxQty = product.stockAvailable ?? 1;
  const total = product.price * quantity;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      await orderProduct(product.id, quantity);

      showToast(
        "Order placed",
        "Your order has been successfully submitted.",
        "success",
      );

      navigate(-1);
    } catch (err) {
      showToast(
        "Order failed",
        "Something went wrong while placing your order. Please try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increase = () => {
    if (quantity < maxQty) setQuantity(quantity + 1);
  };

  return (
    <div className="order-page">
      <div className="order-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IoArrowBack size={22} />
        </button>

        <h1>Confirm Your Order</h1>
      </div>

      <div className="order-layout">
        <div className="order-left">
          <div className="card product-card">
            <img src={product.images?.[0]} alt="" />

            <div className="product-info">
              <h2>{product.title}</h2>
              <p className="brand">{product.brand}</p>

              <div className="tags">
                <span>Size: {product.size}</span>
                <span>Condition: {product.condition}</span>
              </div>

              <div className="price">{product.price} Ft</div>

              <div className="quantity">
                <span>Quantity</span>

                <div className="qty-control">
                  <button
                    onClick={decrease}
                    className={quantity <= 1 ? "disabled" : ""}
                  >
                    -
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={increase}
                    className={quantity >= maxQty ? "disabled" : ""}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="total-row">
                <span>Total</span>
                <strong>{total} Ft</strong>
              </div>
            </div>
          </div>

          <div className="card accordion">
            <div
              className="accordion-header"
              onClick={() => setOpenShipping(!openShipping)}
            >
              <span>Shipping</span>
              <span>{openShipping ? <LuChevronUp /> : <LuChevronDown />}</span>
            </div>

            {openShipping && (
              <div className="accordion-content">
                <p>
                  Shipping is currently unavailable. You cannot enter an address
                  or select delivery options.
                </p>
                <p>
                  This page is only a preview. No actual shipping process will
                  occur after confirming the order.
                </p>
                <p>
                  Future updates will include real delivery handling and address
                  management.
                </p>
              </div>
            )}
          </div>

          <div className="card accordion">
            <div
              className="accordion-header"
              onClick={() => setOpenPayment(!openPayment)}
            >
              <span>Payment Method</span>
              <span>{openPayment ? <LuChevronUp /> : <LuChevronDown />}</span>
            </div>

            {openPayment && (
              <div className="accordion-content">
                <p>
                  Payment is currently disabled. No payment method can be
                  selected or processed.
                </p>
                <p>No transaction will happen after confirming.</p>
                <p>
                  Later you will be able to pay via card or other online
                  solutions.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="order-right">
          <div className="card seller-card">
            <div className="avatar">
              <FiUser size={18} />
            </div>

            <div className="seller-info">
              <span className="label">Seller</span>
              <span className="name">{product?.sellerName}</span>
            </div>
          </div>

          <div className="card summary-card">
            <div className="row">
              <span>Items total</span>
              <span>{total} Ft</span>
            </div>

            <div className="row">
              <span>Shipping</span>
              <span>0 Ft</span>
            </div>

            <div className="row total">
              <span>Total</span>
              <strong>{total} Ft</strong>
            </div>

            <button className="confirm" onClick={handleConfirm}>
              Confirm Order
            </button>

            <button className="cancel" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
