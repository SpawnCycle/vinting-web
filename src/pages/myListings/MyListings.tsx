import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgArrowLeft } from "react-icons/cg";

import ProductGrid from "../../components/productGrid/ProductGrid";
import { getProducts } from "../../api/productsApi";
import type { Product, ProductStatus } from "../../types/Product";

import "./MyListings.css";

//code

const MY_USER_ID = 101;
    
export default function MyListings() {
	const [products, setProducts] = useState<Product[]>([]);
	const [filterStatus, setFilterStatus] = useState<ProductStatus>("active");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadMyListings() {
			const data = await getProducts({ sellerId: MY_USER_ID });
			setProducts(data);
			setLoading(false);
		}

		loadMyListings();
	}, []);

	const myProducts = products.filter(
		p => p.status === filterStatus
	);

	//visszalépéshez
	const navigate = useNavigate();

	const navigateBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate("/");
		}
	};

	//biztos ami tuti
	if (loading) {
		return <p>Betöltés...</p>;
	}

	return (
		<div>
			<div className="header-div">
				<button onClick={navigateBack}>
					<CgArrowLeft />
				</button>
				<h1>My Listings</h1>
			</div>

			<div className="status-buttons">
				<button
					style={{
						backgroundColor:
							filterStatus === "active" ? "var(--button-bg-main)" : "var(--button-bg-secondary)",
						color:
							filterStatus === "active" ? "var(--button-text-main)" : "var(--button-text-secondary)",
					}}
					onClick={() => setFilterStatus("active")}
				>
					Active
				</button>

				<button
					style={{
						backgroundColor:
							filterStatus === "sold" ? "var(--button-bg-main)" : "var(--button-bg-secondary)",
						color:
							filterStatus === "sold" ? "var(--button-text-main)" : "var(--button-text-secondary)",
					}}
					onClick={() => setFilterStatus("sold")}
				>
					Sold
				</button>
			</div>

			<ProductGrid
				products={myProducts}
				showFavoriteButton={false}
			/>
		</div>
	);
}