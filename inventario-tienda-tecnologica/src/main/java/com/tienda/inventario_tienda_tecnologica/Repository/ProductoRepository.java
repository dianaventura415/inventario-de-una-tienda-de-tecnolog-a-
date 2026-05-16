package com.tienda.inventario_tienda_tecnologica.Repository;

import com.tienda.inventario_tienda_tecnologica.Model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Define que este componente es un repositorio de acceso a datos 
public interface ProductoRepository extends JpaRepository<Producto, Long> {
   
}