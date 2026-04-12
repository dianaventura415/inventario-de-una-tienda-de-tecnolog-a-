package inventario.tienda.tecnologica.model;

import jakarta.persistence.*; // CORRECTO
import lombok.Data;

@Entity
@Table(name = "productos") // sin espacio
@Data
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nombre;
    private String marca;
    private double precio;
    private int stock; // corregido
}