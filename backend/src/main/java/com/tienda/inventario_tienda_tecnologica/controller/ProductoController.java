package com.tienda.inventario_tienda_tecnologica.controller;

import com.tienda.inventario_tienda_tecnologica.dto.ProductoDTO;
import com.tienda.inventario_tienda_tecnologica.dto.DashboardDTO;
import com.tienda.inventario_tienda_tecnologica.service.ProductoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Permite solicitudes desde el frontend en Vite
@RestController // Controlador REST que expone endpoints HTTP
@RequestMapping("/api/productos") // Ruta base para todos los métodos de producto
@Tag(name = "Productos", description = "Endpoints para la gestión del inventario de productos tecnológicos") // Swagger
public class ProductoController {

    private final ProductoService productoService; // Servicio que contiene la lógica de negocio

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping // Endpoint GET para listar productos
    @Operation(summary = "Listar todos los productos", description = "Retorna una lista de todos los productos en formato DTO")
    public ResponseEntity<List<ProductoDTO>> listar() {
        List<ProductoDTO> productos = productoService.listarProductos();
        return ResponseEntity.ok(productos); // Retorna 200 OK con la lista
    }

    @PostMapping // Endpoint POST para crear un producto nuevo (Retorna 201 Created)
    @Operation(summary = "Crear un nuevo producto", description = "Registra un producto en el inventario y retorna el código 201 Created")
    public ResponseEntity<ProductoDTO> crear(@RequestBody ProductoDTO dto) {
        ProductoDTO nuevoProducto = productoService.guardarProducto(dto);
        return new ResponseEntity<>(nuevoProducto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}") // Endpoint PUT para actualizar un producto existente
    @Operation(summary = "Actualizar un producto", description = "Modifica los datos de un producto existente localizándolo por su ID")
    public ResponseEntity<ProductoDTO> actualizar(@PathVariable Long id, @RequestBody ProductoDTO dto) {
        ProductoDTO actualizado = productoService.actualizarProducto(id, dto);
        return ResponseEntity.ok(actualizado); // Retorna 200 OK con el producto editado
    }

    @DeleteMapping("/{id}") // Endpoint DELETE para eliminar un producto (Retorna 204 No Content)
    @Operation(summary = "Eliminar un producto", description = "Elimina físicamente un producto de la base de datos y retorna 204 No Content")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/dashboard")
    @Operation(summary = "Obtener datos del Dashboard", description = "Retorna estadísticas generales del inventario como stock total y valor monetario")
    public ResponseEntity<DashboardDTO> dashboard() {
        DashboardDTO datosDashboard = productoService.obtenerDashboard();
        return ResponseEntity.ok(datosDashboard);
    }

    @GetMapping("/alertas") // Endpoint para cumplir con la temática obligatoria de alertas
    @Operation(summary = "Obtener alertas de reabastecimiento", description = "Retorna una lista de productos cuyo stock es crítico (menor a 5 unidades)")
    public ResponseEntity<List<ProductoDTO>> obtenerAlertas() {
        List<ProductoDTO> alertas = productoService.listarAlertasReabastecimiento();
        return ResponseEntity.ok(alertas);
    }
}