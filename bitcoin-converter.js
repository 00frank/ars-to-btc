//funcion fetch()
//permite ejecutar servicios HTTP (consultar a una api)
const USD_OFICIAL = 78.69;
const USD_BLUE = 169;

var rep = 0;

function convertirBitcoin() {
    var labelBitcoins = document.querySelector("label#bitcoins");
    var pesos = document.querySelector("input#monto").value;
    var form = document.querySelector("form").addEventListener('submit', preventDefault);

    function preventDefault(event) {
        event.preventDefault();
    }

    const path = "https://api.coindesk.com/v1/bpi/currentprice.json";
    fetch(path).then(c => {
        //marca en consola que el fetch fue exitoso
        if (c.status == 200)
            console.log("retrieving data from coindesk api (bitcoin)...");
        return c.json();
    }).then(obj => {

        if (rep == 0) {
            console.log(obj)
        }

        let finalOFICIAL = (pesos / USD_OFICIAL) / obj.bpi.USD.rate_float;
        let finalBLUE = (pesos / USD_BLUE) / obj.bpi.USD.rate_float;
        labelBitcoins.innerHTML = `${pesos} ${pesos == 1 ? "peso" : "pesos"} equivalen a ${finalOFICIAL.toFixed(13)} ${finalOFICIAL > 1.99 ? "bitcoins" : "bitcoin"} <small>dolar oficial</small><br>
        ${pesos} ${pesos == 1 ? "peso" : "pesos"} equivalen a ${finalBLUE.toFixed(13)} ${finalBLUE > 1.99 ? "bitcoins" : "bitcoin"} <small>dolar blue</small>`

        rep++;
    })

}
