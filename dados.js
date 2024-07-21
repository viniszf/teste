
document.addEventListener('DOMContentLoaded', (event) => {
    const areaSelect = document.getElementById('area');
    const ctx = document.getElementById('performanceChart').getContext('2d');
    let performanceChart;

    const fetchData = (area = '') => {
        let url = 'dados.php';
        if (area) {
            url += `?area=${area}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const chartData = {
                    labels: ['Certas', 'Erradas'],
                    datasets: [
                        {
                            label: 'Certos',
                            data: [data.certo, 0], // Apenas o valor de "certo" para a primeira barra
                            backgroundColor: ['#4caf50'],
                            borderColor: ['#388e3c'],
                            borderWidth: 1
                        },
                        {
                            label: 'Errados',
                            data: [0, data.errado], // Apenas o valor de "errado" para a segunda barra
                            backgroundColor: ['#f44336'],
                            borderColor: ['#d32f2f'],
                            borderWidth: 1
                        }
                    ]
                };

                if (performanceChart) {
                    performanceChart.data = chartData;
                    performanceChart.update();
                } else {
                    performanceChart = new Chart(ctx, {
                        type: 'bar',
                        data: chartData,
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };


    // Carregar dados iniciais
    fetchData();

    // Atualizar dados quando a área for selecionada
    areaSelect.addEventListener('change', (event) => {
        fetchData(event.target.value);
    });
});
