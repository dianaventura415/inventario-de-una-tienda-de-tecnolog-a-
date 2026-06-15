import "./Reports.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import { useEffect, useState } from "react";
import api from "../../api/api";

function Reports() {

    const [lowStockProducts, setLowStockProducts] = useState([]);

    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        api.get("/productos/bajo-stock")
            .then((response) => {
            setLowStockProducts(
                response.data
            );
            })
            .catch((error) => {
                console.error(error);
            });

        api.get("/productos/reporte-categorias")
            .then((response) => {

            setCategoryData(
                response.data
            );
            });
    }, []);

    return (
        <div className="reports-page">

        <h1>Reportes</h1>

        <section className="low-stock-section">
            <h2>
                Productos con bajo stock
            </h2>

            {lowStockProducts.length === 0 ? (
                <p>
                    No hay productos en alerta.
                </p>
            ) : (
                lowStockProducts.map(
                (product) => (
                    <div
                        key={product.id}
                        className="low-stock-card"
                    >
                    <h3>
                        {product.nombre}
                    </h3>

                    <p>
                        Stock:
                        {" "}
                        {product.stock}
                    </p>

                    </div>
                )
                )
            )}
        </section>

        <section className="chart-section">
            <h2>
                Productos por categoría
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <BarChart
                data={categoryData}
                >

                <CartesianGrid
                    strokeDasharray="3 3"
                />

                <XAxis
                    dataKey="categoria"
                />
                <YAxis />
                <Tooltip 
                    cursor={{ fill: "rgba(37,99,235,0.1)" }}
                    position={{ y: 0 }}
                />

                <Bar
                    dataKey="cantidad"
                    fill="#2563eb"
                />
                </BarChart>

            </ResponsiveContainer>

        </section>

        </div>
    );
}

export default Reports;