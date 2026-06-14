import "./Home.css";

import { 
  FaBox, 
  FaPlusCircle, 
  FaChartBar, 
  FaCog,
  FaBoxes,
  FaDollarSign,
  FaBoxOpen } from "react-icons/fa";
  
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import api from "../../api/api";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import StatCard from "../../components/StatCard/StatCard";

function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/productos/dashboard")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error(
          "Error cargando dashboard:",
          error
        );
      });
  }, []);

  const [stats, setStats] = useState({
    totalProductos: 0,
    stockTotal: 0,
    valorInventario: 0
  });


  return (
    <div className="home">

      <div className="home-header">
        <h1>Inventario NawiTech</h1>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={<FaBox />}
          title="Total Productos"
          value={stats.totalProductos}
        />

        <StatCard
          icon={<FaBoxes />}
          title="Stock Total"
          value={stats.stockTotal}
        />

        <StatCard
          icon={<FaDollarSign />}
          title="Valor Inventario"
          value={`$${stats.valorInventario.toLocaleString()}`}
        />
      </div>

      <div className="dashboard-grid">

        <DashboardCard
          icon={<FaBoxOpen />}
          title="Productos"
          description="Ver productos"
          onClick={() => navigate("/productos")}
        />

        <DashboardCard
          icon={<FaPlusCircle />}
          title="Agregar"
          description="Agregar productos"
          onClick={() => navigate("/agregar")}
        />

        <DashboardCard
          icon={<FaChartBar />}
          title="Reportes"
          description="Ver estadísticas"
          onClick={() => navigate("/reportes")}
        />

        <DashboardCard
          icon={<FaCog />}
          title="Opciones"
          description="Configuración"
          onClick={() => navigate("/configuracion")}
        />

      </div>
    </div>
  );
}

export default Home;