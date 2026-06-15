package com.tienda.inventario_tienda_tecnologica.dto;

public class CategoriaReporteDTO {

    private String categoria;
    private Long cantidad;

    public CategoriaReporteDTO(
            String categoria,
            Long cantidad
    ) {
        this.categoria = categoria;
        this.cantidad = cantidad;
    }

    public String getCategoria() {
        return categoria;
    }

    public Long getCantidad() {
        return cantidad;
    }
}