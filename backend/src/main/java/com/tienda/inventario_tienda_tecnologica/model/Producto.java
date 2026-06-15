package com.tienda.inventario_tienda_tecnologica.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@Builder
@Data // Genera getters, setters, toString, equals, hashCode
@NoArgsConstructor // Constructor vacío requerido por JPA
@AllArgsConstructor // Constructor con todos los campos requerido por @Builder
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 50)
    private String marca;

    @Column(length = 50)
    private String modelo;

    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false)
    private Integer stock;

    @Column(length = 50)
    private String categoria;

    /**
     * ¡REQUISITO OBLIGATORIO DE LA RÚBRICA! (Relación 1:N)
     * Muchos productos pueden ser surtidos por un único Proveedor.
     * 'proveedor_id' será la llave foránea (Foreign Key) en la tabla PostgreSQL.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "proveedor_id", nullable = true) // Ponemos nullable = true para evitar conflictos si inician con datos de prueba vacíos
    private Proveedor proveedor;
}