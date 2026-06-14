package com.tienda.inventario_tienda_tecnologica.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardDTO {

    private Long totalProductos;

    private Long stockTotal;

    private Double valorInventario;
}