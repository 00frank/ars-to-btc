//funcion fetch()
//permite ejecutar servicios HTTP (consultar a una api)
var USD_OFICIAL = 78;
var USD_BLUE = 169;
var form = document.querySelector("form").addEventListener('submit', preventDefault);

var rep = 0;

function convertirBitcoin() {
    var labelBitcoins = document.querySelector("label#bitcoins");
    var pesos = document.querySelector("input#monto").value;

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


let actualizarDolar = () => {
    const pathDOLAR= "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

    fetch(pathDOLAR).then(c =>{
        
        return c.json();
    }).then(dolar => {
        USD_BLUE = parseFloat(dolar[1].casa.venta);
        console.log("1 USD BLUE EQUIVALE A: "+ USD_BLUE+ " ARS");
    })

    fetch(pathDOLAR).then(c =>{
        return c.json();
    }).then(dolar => {
        USD_OFICIAL = parseFloat(dolar[0].casa.venta);
        console.log("1 USD OFICIAL EQUIVALE A: "+ USD_OFICIAL+ " ARS");
    })
}

function preventDefault(event) {
    event.preventDefault();
}

actualizarDolar();
