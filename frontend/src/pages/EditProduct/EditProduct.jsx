import "./EditProduct.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../api/api"; // Importa tu instancia de Axios configurada

import categories from "../../data/categories";

function EditProduct({ products, setProducts, showToast }) {

  const { id } = useParams();

  const navigate = useNavigate();

  // Buscar el producto por ID
  const product = products.find((p) => p.id === Number(id));

  // Estados locales para el formulario
  const [name, setName] = useState(product.nombre);
  const [brand, setBrand] = useState(product.marca);
  const [model, setModel] = useState(product.modelo);
  const [price, setPrice] = useState(product.precio);
  const [stock, setStock] = useState(product.stock);
  const [category, setCategory] = useState(product.categoria);

  // Si el producto no existe, mostrar un mensaje
  if (!product) {
    return (
      <div className="add-product-page">
        <h1>Producto no encontrado</h1>
      </div>
    );
  }
  // Manejar el envio del formulario
  const handleSubmit = async (e) => {

    e.preventDefault();

    const updatedProduct = {
      nombre: name,
      marca: brand,
      modelo: model,
      precio: parseFloat(price),
      stock: parseInt(stock),
      categoria: category
    };

    try {
      // Actualizar en backend
      const response = await api.put(`/productos/${product.id}`, updatedProduct);

      // Actualizar en estado global
      const updatedProducts = products.map((p) =>
        p.id === product.id ? response.data : p
      );
      setProducts(updatedProducts);

      showToast({
        message: "Producto actualizado",
        type: "success",
      });

      navigate("/productos");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      showToast({
        message: "Error al actualizar producto",
        type: "error",
      });
    }
  };

  return (
    <div className="add-product-page">

      <h1>Editar Producto</h1>

      <form
        className="product-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Marca"
          value={brand}
          onChange={(e) => setBrand(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Modelo"
          value={model}
          onChange={(e) => setModel(e.target.value)
          }
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)
          }
        />

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)
          }
        />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">
            Selecciona categoría
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}> {cat} </option>
          ))}
        </select>

        <button type="submit">
          Guardar Cambios
        </button>

      </form>

    </div>
  );
}

export default EditProduct;