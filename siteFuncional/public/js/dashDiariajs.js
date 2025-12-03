
function obterDadosGrafico() {

    var idEmpresa = sessionStorage.ID_EMPRESA;

    if (!idEmpresa) {
        console.error("ID_EMPRESA não existe no sessionStorage.");
        return;
    }

    fetch(`/dashDiaria/graficoLotesDefasados/${idEmpresa}`, { cache: 'no-store' })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar dados do gráfico");
            return response.json();
        })
        .then(data => {

            console.log("Dados recebidos:", data);

            if (!data || !data.lista) {
                console.error("A propriedade 'lista' não existe no JSON.");
                return;
            }

            const dados = data.lista;

            if (dados.length === 0) {
                console.warn("Nenhum registro recebido.");
                return;
            }

            plotarGrafico(dados);
        })
        .catch(error => {
            console.error("Erro ao obter dados:", error.message);
        });
}

let grafico;

function plotarGrafico(dadosRecebidos) {

    let labels = [];
    let valores = [];

    for (let i = 0; i < dadosRecebidos.length; i++) {
        labels.push(dadosRecebidos[i].identificacao);
        valores.push(dadosRecebidos[i].taxa_ocupacao);
    }

    const ctx = document.getElementById("dashboard1");

    grafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Ocupação (%)",
                data: valores,
                backgroundColor: "#ff8c00",
                borderColor: "#ff8c00",
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Ocupação dos Lotes"
                },
                legend: { display: true },
                annotation: {
                    annotations: {
                        risco: {
                            type: "line",
                            yMin: 20,
                            yMax: 20,
                            borderColor: "red",
                            borderWidth: 2,
                            borderDash: [4, 4],
                            label: { display: true, content: "ZONA DE RISCO" }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    setTimeout(() => atualizarGrafico(), 3000);
}



function atualizarGrafico() {

    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/dashDiaria/graficoLotesDefasados/${idEmpresa}`, { cache: 'no-store' })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao atualizar gráfico");
            return response.json();
        })
        .then(data => {

            if (!data || !data.lista) {
                console.error("A propriedade 'lista' não existe no JSON.");
                return;
            }

            const novos = data.lista;

            if (novos.length === 0) {
                console.warn("Nenhum novo registro.");
                return;
            }

            grafico.data.labels = [];
            grafico.data.datasets[0].data = [];

            for (let i = 0; i < novos.length; i++) {
                grafico.data.labels.push(novos[i].identificacao);
                grafico.data.datasets[0].data.push(novos[i].taxa_ocupacao);
            }

            grafico.update();

            setTimeout(() => atualizarGrafico(), 3000);
        })
        .catch(error => {
            console.error("Erro na atualização:", error.message);
            setTimeout(() => atualizarGrafico(), 3000);
        });
}


window.onload = () => {
    obterDadosGrafico();
};