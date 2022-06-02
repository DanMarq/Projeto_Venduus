$(function () {

// Esses são os dados de exemplo do Grafico Mensal

    var lineData = {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro" , "Novembro", "Dezembro"],
        datasets: [

            {
                label: "Atual",
                backgroundColor: 'rgba(96,47,137,0.8)',
                borderColor: "rgba(96,47,137,1)",
                pointBackgroundColor: "rgba(96,47,137,1)",
                pointBorderColor: "#fff",
                data: [28, 48, 40, 19, 86, 27, 70, 75, 42, 75, 15, 95]
            },{
                label: "Meta",
                backgroundColor: 'rgba(220, 220, 220, 0.5)',
                borderColor:"rgba(4,236,196,0.2)",
                pointBorderColor: "#fff",
                data: [65, 59, 80, 81, 56, 55, 40, 20, 32, 55, 84, 50]
            }
        ]
    };

    var lineOptions = {
        responsive: true
    };


    var ctx = document.getElementById("lineChart").getContext("2d");
    new Chart(ctx, {type: 'line', data: lineData, options:lineOptions});


// Esses são os dados de exemplo do Grafico Anual

    var barData = {
        labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        datasets: [
            {
                label: "Atual",
                backgroundColor: 'rgba(96,47,137,0.8)',
                borderColor: "rgba(96,47,137,1)",
                pointBackgroundColor: "rgba(96,47,137,1)",
                pointBorderColor: "#fff",
                data: [65, 59, 80, 81, 56, 55, 40]
                
            },
            {
                label: "Meta",
                backgroundColor: 'rgba(220, 220, 220, 0.5)',
                borderColor:"#4ecc48",
                pointBorderColor: "#4ecc48",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
            
        ]
    };

    var barOptions = {
        responsive: true
    };


    var ctx2 = document.getElementById("barChart").getContext("2d");
    new Chart(ctx2, {type: 'bar', data: barData, options:barOptions});

});