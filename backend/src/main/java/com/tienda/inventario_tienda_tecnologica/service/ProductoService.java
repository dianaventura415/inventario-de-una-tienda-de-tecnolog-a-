package com.tienda.inventario_tienda_tecnologica.service;

import com.tienda.inventario_tienda_tecnologica.dto.ProductoDTO;
import com.tienda.inventario_tienda_tecnologica.model.Producto;
import com.tienda.inventario_tienda_tecnologica.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import com.tienda.inventario_tienda_tecnologica.dto.DashboardDTO;

import java.util.List;
import java.util.stream.Collectors;

@Service // Indica que esta clase es un servicio de spring y contiene la lógica de negocio (Rúbrica N-Capas)
public class ProductoService {

    private final ProductoRepository productoRepository; // Repositorio para acceder a la base de datos

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // Convierte entidad producto a DTO para enviar datos limpios al cliente (Patrón DTO obligatorio)
    private ProductoDTO toDTO(Producto producto) {
        return new ProductoDTO(
            producto.getId(), 
            producto.getNombre(), 
            producto.getMarca(),
            producto.getModelo(),
            producto.getPrecio(),
            producto.getStock(),
            producto.getCategoria()
        );
    }

    // Convierte DTO a entidad producto para guardar datos en la base de datos
    private Producto toEntity(ProductoDTO dto) {
        return Producto.builder()
                .id(dto.getId()) // Se agrega el ID para evitar duplicaciones innecesarias en operaciones avanzadas
                .nombre(dto.getNombre())
                .precio(dto.getPrecio())
                .modelo(dto.getModelo())
                .marca(dto.getMarca() != null ? dto.getMarca() : "Sin marca") 
                .stock(dto.getStock() != null ? dto.getStock() : 0) 
                .categoria(dto.getCategoria() != null ? dto.getCategoria() : "Sin categoría") 
                .build();
    }

    // Devuelve una lista de todos los productos en formato DTO
    public List<ProductoDTO> listarProductos() {
        return productoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Guarda un producto nuevo en la base de datos y devuelve su DTO
    public ProductoDTO guardarProducto(ProductoDTO dto) {
        Producto producto = toEntity(dto);
        Producto guardado = productoRepository.save(producto);
        return toDTO(guardado);
    }

    // Actualiza un producto existente localizándolo por su ID
    public ProductoDTO actualizarProducto(Long id, ProductoDTO dto) {
        // Busca el producto por id, si no existe lanza una excepción para evitar corrupción de datos
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con el ID: " + id));

        // Actualiza de forma segura los campos con los nuevos valores recibidos del frontend
        producto.setNombre(dto.getNombre());
        producto.setMarca(dto.getMarca() != null ? dto.getMarca() : "Sin marca");
        producto.setModelo(dto.getModelo());
        producto.setPrecio(dto.getPrecio());
        producto.setStock(dto.getStock() != null ? dto.getStock() : 0);
        producto.setCategoria(dto.getCategoria() != null ? dto.getCategoria() : "Sin categoría");

        // Guarda los cambios actualizados en PostgreSQL
        Producto actualizado = productoRepository.save(producto);
        return toDTO(actualizado);
    }

    // Eliminar un producto por id
    public void eliminarProducto(Long id) {
        // Verifica si existe en la base de datos antes de mandar a borrar
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado con el ID: " + id);
        }
        productoRepository.deleteById(id);
    }
    
    // Genera estadísticas personalizadas para las tarjetas informativas del frontend
    public DashboardDTO obtenerDashboard() {
        Long totalProductos = productoRepository.count();

        Long stockTotal = productoRepository.obtenerStockTotal();

        Double valorInventario = productoRepository.obtenerValorInventario();

        return new DashboardDTO(
            totalProductos,
            stockTotal,
            valorInventario
        );
    }

    /**
     * ¡REQUISITO OBLIGATORIO DE LA TEMÁTICA DEL PROYECTO!
     * Filtra y obtiene los productos que están listos para reabastecimiento.
     * Un producto de tecnología entra en alerta si tiene menos de 5 unidades en bodega.
     */
    public List<ProductoDTO> listarAlertasReabastecimiento() {
        int limiteStockCritico = 5; 
        return productoRepository.findAll()
                .stream()
                .filter(producto -> producto.getStock() != null && producto.getStock() < limiteStockCritico)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}