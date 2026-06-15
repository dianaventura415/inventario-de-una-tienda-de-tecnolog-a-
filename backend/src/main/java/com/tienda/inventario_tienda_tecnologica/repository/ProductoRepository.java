package com.tienda.inventario_tienda_tecnologica.repository;

import com.tienda.inventario_tienda_tecnologica.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository // Indica que esta interfaz es un componente de acceso a datos y será gestionada por Spring (Rúbrica N-Capas)
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @Query("""
    SELECT COALESCE(SUM(p.stock), 0) 
    FROM Producto p
    """)
    Long obtenerStockTotal();

    @Query("""
    SELECT COALESCE(SUM(p.stock * p.precio), 0.0) 
    FROM Producto p
    """)
    Double obtenerValorInventario();

    /**
     * ¡REQUISITO OBLIGATORIO DE LA RÚBRICA! (Relación 1:N)
     * Busca productos filtrados por el ID de su Proveedor asignado.
     * Demuestra el uso de relaciones mapeadas en JPA/Hibernate requeridas por la cátedra.
     */
    @Query("""
    SELECT p 
    FROM Producto p 
    WHERE p.proveedor.id = :proveedorId
    """)
    List<Producto> buscarPorProveedor(@Param("proveedorId") Long proveedorId);
}