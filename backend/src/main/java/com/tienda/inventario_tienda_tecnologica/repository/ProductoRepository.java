package com.tienda.inventario_tienda_tecnologica.repository;

import com.tienda.inventario_tienda_tecnologica.dto.CategoriaReporteDTO;
import com.tienda.inventario_tienda_tecnologica.model.Producto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository //indica que esta interfaz es un componente de acceso a datos y será gestionada por spring
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    @Query("""
    SELECT COALESCE(SUM(p.stock),0)
    FROM Producto p
    """)
    Long obtenerStockTotal();

    @Query("""
    SELECT COALESCE(SUM(p.stock * p.precio),0)
    FROM Producto p
    """)
    Double obtenerValorInventario();

    @Query("""
    SELECT p
    FROM Producto p
    WHERE p.stock <= 5
    ORDER BY p.stock ASC
    """)
    List<Producto> obtenerProductosBajoStock();

    @Query("""
    SELECT new com.tienda.inventario_tienda_tecnologica.dto.CategoriaReporteDTO(
        p.categoria,
        COUNT(p)
    )
    FROM Producto p
    GROUP BY p.categoria
    ORDER BY COUNT(p) DESC
    """)
    List<CategoriaReporteDTO> obtenerProductosPorCategoria();
}
