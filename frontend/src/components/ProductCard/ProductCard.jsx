import "./ProductCard.css";

import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onDelete }) {

  const navigate = useNavigate();

  return (
    <div className="product-card">

      <div className="product-info">

        <div className="category-badge">
          {product.categoria}
        </div>

        <h3>{product.nombre}</h3>   

        <p>
          Marca: {product.marca}
        </p>


        <p>
          Modelo: {product.modelo}
        </p>

        <p>
          Precio: ${product.precio}
        </p>

        <p>
          Stock: {product.stock}
        </p>

      </div>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => navigate(`/editar/${product.id}`)}>
          <FaEdit />
        </button>

        <button className="delete-btn" onClick={() => onDelete(product.id)}>
          <FaTrash />
        </button>
      </div>

    </div>
  );
}

export default ProductCard;