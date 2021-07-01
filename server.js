const express = require('express');
const app = express(); 

app.use(express.urlencoded({ extended: false }));

app.use(express.json()); 

//  Bussines proccess
function processText(option) {
    let result = "";

    const values = option.split("*");

    if (values[0] == "") {
        result += "CON Calculadora USSD \n";
        result += "Insira o primeiro número:";
    } else if (values.length == 1){
        result += "CON Calculadora USSD \n";
        result += "Seleccione a operação:";
        result += "\n1- Soma";
        result += "\n2- Multiplicação";
        result += "\n3- Divisão";
        result += "\n4- Subtração"
    } else if (values.length == 2) {
        result += "CON Calculadora USSD \n";
        result += "Insira o segundo número:";
    } else {
        let p1 = parseInt(values[0]);
        let p2 = parseInt(values[2]);
        let resultOperation;

        switch (values[1]) {
            case "1":
                resultOperation = p1 + p2;
            break;
            case "2":
                resultOperation = p1 * p2;
            break;
            case "3":
                resultOperation = p1 / p2;
            break;
            case "4":
                resultOperation = p1 - p2;
            break;
            default:
            break;
        }

        result += "END Calculadora USSD \n";
        result += "Resultado da operação: ";
        result += resultOperation;
        result += "\nObrigado.";
    }

    return result;
}

app.post('/', (req, res) => { 
    let result = processText( req.body.text );
    res.header('Content-Type', 'text/plain');
    res.send(result);
});

app.listen(process.env.PORT || 8086)//listen(8086, () => console.log("Connected")) 