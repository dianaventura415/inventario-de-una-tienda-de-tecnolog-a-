import "./Products.css";

import { useEffect, useRef, useState } from "react";

import ProductCard from "../../components/ProductCard/ProductCard";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import categories from "../../data/categories";

import api from "../../api/api"; // Importa tu instancia de Axios configurada

function Products({ setProducts, showToast }) {

  // Estado para almacenar los productos
  const [products, setProductsState] = useState([]);

  // Cargar productos desde el backend al montar el componente
  useEffect(() => {
    api.get("/productos")
      .then((response) => {
        console.log("Productos cargados:", response.data);
        setProductsState(response.data);
        setProducts(response.data); // Sincroniza con el estado global
      })
      // Manejo de errores
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        showToast({
          message: "Error al cargar productos",
          type: "error"
        });
      });
  }, []);



  // Creacion de estados modal
  const [showModal, setShowModal] = useState(false);
  // Estados para busqueda y filtro
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para filtro de categoria
  const [selectedCategory, setSelectedCategory] = useState("");
  // Estado para producto seleccionado en el modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  //Referencia timer
  const deleteTimer = useRef(null);

  // Eliminar productos (Abre Modal)
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    // filtro de búsqueda por nombre y ID del producto
    const matchesSearch =
      product.nombre.toLowerCase().includes(search) ||
      product.id.toString().includes(search);

    // filtro por categoría (si tu backend devuelve "categoria")
    const matchesCategory =
      selectedCategory === "" ||
      product.categoria === selectedCategory;

    return matchesSearch && matchesCategory;
  });


  // Confirmacion de delete
  const confirmDelete = async () => {
    const deletedProduct = selectedProduct;

    // Eliminar producto del backend
    try {
      await api.delete(`/productos/${deletedProduct.id}`);
      // Eliminar producto del estado local
      const updatedProducts = products.filter((p) => p.id !== deletedProduct.id);
      setProductsState(updatedProducts);
      setProducts(updatedProducts);

      setShowModal(false);
      // Mostrar Toast con opción de deshacer
      showToast({
        message: "Producto eliminado",
        type: "error",
        actionText: "DESHACER",
        onAction: async () => {
          // Restaurar producto en backend
          await api.post("/productos", deletedProduct);
          setProductsState((prev) => [...prev, deletedProduct]);
          setProducts((prev) => [...prev, deletedProduct]);

          showToast({
            message: "Producto restaurado",
            type: "success"
          });
        }
      });
    } catch (error) {
      console.error("Error eliminando producto:", error);
      showToast({
        message: "Error al eliminar producto",
        type: "error"
      });
    }
  };



  // Temporal para restaurar los datos
  //-----------------------------------------
  //const resetProducts = () => {
  //  localStorage.removeItem("products");
  //  setProducts(initialProducts);
  //};
  //-----------------------------------------

  return (
    <div className="products-page">

      <div className="products-header">
        <h1>Productos</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">
            Todas las categorías
          </option>
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* GRID */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
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
        message={`¿Seguro que deseas eliminar "${selectedProduct?.nombre}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />

      {/* ---------temporal---------- 
      <br /><br />
      <button onClick={resetProducts}>
        Restaurar Datos
      </button>
       --------------------------- */}

    </div>
  );
}

export default Products;