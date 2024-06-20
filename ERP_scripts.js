export function graficoVentas() {
    const datos = {
            labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
            valores: [120, 130, 105, 90, 95, 80]
        };

        // Configuración del gráfico
        var ctx = document.getElementById('graficoLineas').getContext('2d');
        var graficoLineas = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datos.labels,
                datasets: [{
                    label: 'Venta nacional de combustibles líquidos y GLP',
                    data: datos.valores,
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgb(75, 192, 192)',
                    pointBorderColor: 'rgb(75, 192, 192)',
                    pointHoverRadius: 7,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 250  // Ajusta este valor si necesitas un máximo diferente en el eje y
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Venta nacional de combustibles líquidos y GLP',
                        align: 'start',  // Alinea el título a la izquierda
                        font: {
                            size: 18  // Tamaño de la fuente del título
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0  // Elimina la suavidad de la línea
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
}