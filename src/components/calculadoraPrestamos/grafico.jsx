import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, Filler, Title, LineElement } from "chart.js";


const LineChartPrestamo = ({ datos }) => {

    ChartJS.register(ArcElement, Tooltip, Legend, Filler, Title, LineElement, CategoryScale, LinearScale, PointElement);

    const data = {
        labels: datos?.map(d => d.cuota),
        datasets: [
            {
                label: 'totalCuota',
                data: datos?.map(d => d.totalcuota),
                fill: false,
                borderColor: 'rgba(75,192,192,1)', // Color verde
            },
            {
                label: 'intereses',
                data: datos?.map(d => d.interes),
                fill: false,
                borderColor: 'rgba(255,165,0,1)', // Color naranja
            },
            {
                label: 'amortizacion',
                data: datos?.map(d => d.amortizacion),
                fill: false,
                borderColor: 'rgba(0,128,0,1)', // Color verde oscuro
            },
            {
                label: 'iva',
                data: datos?.map(d => d.ivacalculado),
                fill: false,
                borderColor: 'rgba(128,0,128,1)', // Color morado
            }
        ],
    };

    const options = {
        scales: {
            x: {
                position: 'bottom',
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Gráfico:</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChartPrestamo;
