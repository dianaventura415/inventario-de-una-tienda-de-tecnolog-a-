package com.tienda.inventario_tienda_tecnologica.Model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity // Indica que esta clase es una tabla en la BD 
@Table(name = "productos")
public class Producto {

    @Id // Define la llave primaria 
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincremental (SERIAL en SQL) 
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 50)
    private String marca;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    private Integer stock;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    // Asigna la fecha automáticamente antes de guardar [cite: 5]
    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
        if (this.stock == null) this.stock = 0;
    }

    // Constructores (Requerido por JPA)
    public Producto() {}

    // Getters y Setters (Necesarios para el mapeo de la Fase B) [cite: 13]
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
}