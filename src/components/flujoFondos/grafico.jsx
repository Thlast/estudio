import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, Filler, Title, LineElement } from "chart.js";


const LineChart = ({ datos }) => {

  ChartJS.register(ArcElement, Tooltip, Legend, Filler, Title, LineElement, CategoryScale, LinearScale, PointElement);

  const data = {
    labels: datos?.map(d => d.tasa),
    datasets: [
      {
        label: 'proyectoConMayorTIR',
        data: datos?.map(d => d.proyectoConMayorTIR),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'proyectoConMayorVAN',
        data: datos?.map(d => d.proyectoConMayorVAN),
        fill: false,
        borderColor: 'rgba(255,0,0,1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Gráfico de dos curvas</h2>
      <Line data={data} options={options} />
      {/* <Line data={data} options={options} /> */}
    </div>
  );
};

export default LineChart;
