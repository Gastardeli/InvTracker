
function atualizarGraficos() {
    var idEstoque = selectEstoque.value;
    idEstoque.value = idEstoque;
    obterDadosGrafico2(idEstoque);
    obterDadosGrafico1(idEstoque);

    const kpi1 = document.getElementById("kpiMostrar1");
    const kpi2 = document.getElementById("kpiMostrar2");
    const Voltar = document.getElementById("selectVoltar");
    const kpi0 = document.getElementById("kpi0")
    const modal = document.getElementById("modalGrande");



    kpi1.style.display = "block";
    kpi2.style.display = "block";
    selectEstoque.style.display = "none";
    Voltar.style.display = "block";
    kpi0.style.display = "none";
    modal.style.display = "none";
}


function obterDadosGrafico1(idEstoque, idEmpresa) {
    fetch(`/dashEstoque/graficoDoisEstadoCritico/${idEstoque}/${sessionStorage.ID_EMPRESA}`, { cache: 'no-store' })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar dados');
            return response.json();
        })
        .then(data => {
            var arrayProdutos = data.graficoEstoque;

            console.log("Dados para gráfico 1 (críticos):", arrayProdutos);

            plotarGrafico(arrayProdutos, 1);
        })
        .catch(error => {
            console.error("Erro na obtenção dos dados p/ gráfico 1:", error.message);
        });
}


function obterDadosGrafico2(idEstoque, idEmpresa) {
    fetch(`/dashEstoque/graficoOcupacaoLotes/${idEstoque}/${sessionStorage.ID_EMPRESA}`, { cache: 'no-store' })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar dados');
            return response.json();
        })
        .then(data => {
            var arrayProdutos = data.graficoEstoque;

            console.log("Dados para gráfico 2 (ocupação):", arrayProdutos);


            plotarGrafico(arrayProdutos, 2);
        })
        .catch(error => {
            console.error("Erro na obtenção dos dados p/ gráfico 2:", error.message);
        });
}

function plotarGrafico(resposta, idItem) {
    console.log('iniciando plotagem do gráfico...');

    let labels = [];
    let dados = {
        labels: labels,
        datasets: [{
            label: idItem === 1 ? 'Percentual Ocupado (Crítico)' : 'Percentual de ocupação',
            data: [],
            fill: false,
            borderColor: idItem === 1 ? 'red' : 'blue',
            tension: 0.1,
            borderWidth: 5
        }]
    };

    for (let i = 0; i < resposta.length; i++) {
        const registro = resposta[i];
        labels.push(registro.nomeProduto);
        dados.datasets[0].data.push(registro.percentualOcupado);
    }

    const config = {
        type: 'bar',
        data: {
            labels: dados.labels,
            datasets: [{
                label: 'Ocupação (%)',
                data: dados.datasets[0].data,
                backgroundColor: '#ff8c00',
                borderColor: '#ff8c00',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: idItem === 1 ? 'Lotes em estado crítico' : 'Ocupação dos lotes',
                    font: {
                        size: 20,
                        weight: 'bold'
                    },
                    color: '#000'
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#000000',
                        font: {
                            size: 14
                        }
                    }
                },
                annotation: {
                    annotations: {
                        linhaHorizontal: {
                            type: 'line',
                            yMin: 20,
                            yMax: 20,
                            borderColor: 'red',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                display: true,
                                content: 'ZONA DE RISCO',
                                position: 'start'
                            }
                        },
                        linhaHorizonta2: {
                            type: 'line',
                            yMin: 99,
                            yMax: 99,
                            borderColor: 'green',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                display: true,
                                content: 'LOTE CHEIO',
                                position: 'start'
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Ocupação (%)',
                        color: '#000000',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#000000',
                        font: {
                            size: 16
                        },
                        callback: function (value) {
                            if (value % 1 === 0) return value;
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: idItem === 1 ? 'Produtos em Estado Crítico' : 'Produtos',
                        color: '#000000',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#000000',
                        font: {
                            size: 20
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    };


    let myChart = new Chart(
        document.getElementById(`dashboard${idItem}`),
        config
    );

    setTimeout(() => atualizarGrafico(idItem, dados, myChart), 2000);
}


function atualizarGrafico(idItem, dados, myChart) {
    const url = `/graficos/grafico-${idItem === 1 ? 'dois-estados-critico' : 'ocupacao-lotes'}`;

    fetch(url, { cache: 'no-store' })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar dados');
            return response.json();
        })
        .then(data => {
            var arrayProdutos = data.graficoEstoque;

            if (arrayProdutos.length === 0) {
                console.log("Array de produtos vazio, não é possível atualizar o gráfico.");
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idItem, dados, myChart), 2000);
                return;
            }

            const novoRegistro = arrayProdutos[arrayProdutos.length - 1];

            if (novoRegistro.nomeProduto !== dados.labels[dados.labels.length - 1]) {
                dados.labels.shift();
                dados.labels.push(novoRegistro.nomeProduto);

                dados.datasets[0].data.shift();
                dados.datasets[0].data.push(novoRegistro.percentualOcupado);

                myChart.update();
            }

            proximaAtualizacao = setTimeout(() => atualizarGrafico(idItem, dados, myChart), 2000);
        })
        .catch(error => {
            console.error("Erro na obtenção dos dados p/ gráfico:", error.message);
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idItem, dados, myChart), 2000);
        });
}





