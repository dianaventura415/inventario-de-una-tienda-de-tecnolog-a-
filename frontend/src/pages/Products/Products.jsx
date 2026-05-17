import "./Products.css";

import { useRef, useState } from "react";

import ProductCard from "../../components/ProductCard/ProductCard";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import initialProducts from "../../data/products";

function Products({ products = [], setProducts, showToast }) {

  // Creacion de estados modal
  const [showModal, setShowModal] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  //Referencia timer
  const deleteTimer = useRef(null);

  // Eliminar productos (Abre Modal)
  const handleDelete = (product) => {

    setSelectedProduct(product);

    setShowModal(true);
  };

  // Confirmacion de delete
  const confirmDelete = () => {

    const deletedProduct = selectedProduct;

    const updatedProducts = products.filter((p) => p.id !== deletedProduct.id);

    setProducts(updatedProducts);

    setShowModal(false);

    // TIMER
    deleteTimer.current = setTimeout(() => {
      console.log(
        "Eliminación definitiva"
      );

    }, 5000);

    // TOAST
    showToast({
      message: "Producto eliminado",
      type: "error",
      actionText: "DESHACER",

      onAction: () => {
        clearTimeout(deleteTimer.current);

        setProducts((prev) => [
          ...prev,
          deletedProduct
        ]);

        showToast({
          message: "Producto restaurado",
          type: "success"
        });
      }
    });
  };


  // Temporal para restaurar los datos
  //-----------------------------------------
  const resetProducts = () => {
    localStorage.removeItem("products");
    setProducts(initialProducts);
  };
  //-----------------------------------------


  return (
    <div className="products-page">

      <div className="products-header">
        <h1>Productos</h1>
      </div>

      {/* GRID */}
      <div className="products-grid">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
            onDelete={() => handleDelete(product)}
          />

        ))}

      </div>
      
      {/* MODAL */}

      <ConfirmModal
        visible={showModal}
        title="Eliminar producto"
        message={`¿Seguro que deseas eliminar "${selectedProduct?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />

      {/* ---------temporal---------- */}
      <br /><br />
      <button onClick={resetProducts}>
        Restaurar Datos
      </button>
      {/* --------------------------- */}

    </div>
  );
}

export default Products;