let linebar = document.querySelector('.linebar');
let text = document.querySelector('input');
let res = document.querySelector('.res');
let number = document.querySelectorAll('.num');

document.querySelectorAll('.num').forEach(element => {
    element.addEventListener('click', function () {
        console.log(element.value);
        text.value += element.value;
        // si poteva usare anche textContent per l'element senza usare il value
    });
});
document.querySelectorAll('.opp').forEach(element => {
    element.addEventListener('click', function () {
        if (element.value == 'AC') {
            text.value = '';
        }else{
            text.value += element.value;
        }
    })
})
res.addEventListener('click', function () {
    let espressione = text.value;
    let numeri = [];
    let operatori = [];
    let numeroCorrente = '';

    // Ciclo attraverso la stringa espressione per separare numeri e operatori
    for (let index = 0; index < espressione.length; index++) {
        let char = espressione[index];

        // Se è un numero, aggiungilo al numero corrente
        if (char >= '0' && char <= '9' || char === '.') {
            numeroCorrente += char;
        } else if (['+', '-', 'x', '÷'].includes(char)) {
            // Quando trovi un operatore, aggiungi il numero corrente e l'operatore agli array
            if (numeroCorrente !== '') {
                numeri.push(numeroCorrente);
                numeroCorrente = ''; // Pulisci il numero corrente per il prossimo numero
            }
            operatori.push(char); // Aggiungi l'operatore all'array operatori
        }
    }

    // Dopo il ciclo, aggiungi l'ultimo numero corrente all'array (se esiste)
    if (numeroCorrente !== '') {
        console.log(numeri)
        numeri.push(numeroCorrente);
        console.log(numeri)
    }

    // Ora esegui il calcolo con gli array numeri e operatori
    let result = calcola(numeri, operatori);
    text.value = result; // Mostra il risultato nell'input
})


// Assicurati che gli operatori e i numeri siano correttamente separati.
// Gestisci correttamente gli array di numeri e operatori: Durante il ciclo, devi fare in modo che vengano correttamente elaborati il primo numero e gli operatori successivi.
// Ecco la versione corretta della funzione calcola:


function calcola(numeri, operatori) {
    let result = numeri[0];  // Iniziamo con il primo numero

    // Cicla attraverso gli operatori e applica le operazioni
    for (let index = 0; index < operatori.length; index++) {
        let operatore = operatori[index];
        let prossimoNumero = numeri[index + 1];  // Numero successivo

        // Assicurati che il prossimoNumero sia correttamente convertito a float
        prossimoNumero = parseFloat(prossimoNumero);
        switch (operatore) {
            case 'ABS':
                result = Math.abs(result);  // Assoluto
                break;
            case '%':
                result = result % prossimoNumero;  // Modulo
                break;
            case '÷':
                // Controlla se il prossimo numero è 0 per evitare la divisione per zero
                if (prossimoNumero !== 0) {
                    result = numeri[0]  /prossimoNumero;  // Divisione
                } else {
                    result = "Errore";  // Gestisci la divisione per zero
                }
                break;
            case 'x':  // Moltiplicazione
                result *= prossimoNumero;
                break;
            case '-':
                result -= prossimoNumero;  // Sottrazione
                break;
            case '+':
                result =parseInt(result) + parseInt(prossimoNumero);  // Somma
                break;
            default:
                break;
        }
    }

    // Limita la precisione decimale a due cifre
      // Arrotonda a 2 decimali
    
    return result;
}