// Funciones de conversión
function decimalHastaBinario(numero) {
    return numero.toString(2);
}

function decimalHastaOctal(numero) {
    return numero.toString(8);
}

function decimalHastaBCD(decimal) {
    const bcdMapping = {
        "0": "0000",
        "1": "0001",
        "2": "0010",
        "3": "0011",
        "4": "0100",
        "5": "0101",
        "6": "0110",
        "7": "0111",
        "8": "1000",
        "9": "1001"
    };

    const decimalString = decimal.toString();
    let bcdString = '';

    for (let i = 0; i < decimalString.length; i++) {
        const digit = decimalString[i];

        if (bcdMapping.hasOwnProperty(digit)) {
            bcdString += bcdMapping[digit];
        } else {
            return null;
        }
    }

    return bcdString;
}

function BCDHastaDecimal(bcdNumber) {
    const bcdMapping = {
        "0000": 0,
        "0001": 1,
        "0010": 2,
        "0011": 3,
        "0100": 4,
        "0101": 5,
        "0110": 6,
        "0111": 7,
        "1000": 8,
        "1001": 9
    };

    let decimal = 0;
    let multiplier = 1;
    let bcdString = bcdNumber.toString();

    if (bcdString.length % 4 !== 0) {
        alert("El número BCD debe tener una cantidad exacta de grupos completos de 4 dígitos.");
        return null;
    }

    while (bcdNumber > 0) {
        const digitGroup = bcdNumber % 10000;
        const bcdString = digitGroup.toString().padStart(4, '0');

        if (!bcdMapping.hasOwnProperty(bcdString)) {
            alert("Ingrese un número BCD válido.");
            return null;
        }

        const decimalValue = bcdMapping[bcdString];

        decimal += decimalValue * multiplier;
        multiplier *= 10;
        bcdNumber = Math.floor(bcdNumber / 10000);
    }

    return decimal;
}

function binaryHastaDecimal(binary) {
    if (!/^[01]+$/.test(binary)) {
        return null;
    }

    const decimal = parseInt(binary, 2);

    return decimal;
}

function octalHastaDecimal(octal) {
    if (!/^[0-7]+$/.test(octal)) {
        return null;
    }

    const decimal = parseInt(octal, 8);

    return decimal;
}

document.addEventListener('DOMContentLoaded', function() {
    const aceptarBtn = document.getElementById('aceptar');
    const convertirBtn = document.getElementById('convertir');
    const regresarBtn = document.getElementById('regresar');
    const entradaInput = document.getElementById('entrada');
    const ingresoDiv = document.getElementById('ingreso');
    const conversionDiv = document.getElementById('conversion');
    const respuestaDiv = document.getElementById('respuesta');
    const pantallaDiv = document.getElementById('pantalla');

    let conversionRealizada = false; // Variable de estado para controlar si se ha realizado una conversión

    aceptarBtn.addEventListener('click', function() {
        if (!conversionRealizada) { // Verificar si ya se ha realizado una conversión
            const numero = parseFloat(entradaInput.value);
            const tipoBase = document.querySelector('input[name="tipo"]:checked').value;

            if (!isNaN(numero)) {
                switch (tipoBase) {
                    case 'decimal':
                        pantallaDiv.textContent = numero;
                        break;
                    case 'binario':
                        pantallaDiv.textContent = binaryHastaDecimal(numero);
                        break;
                    case 'octal':
                        pantallaDiv.textContent = octalHastaDecimal(numero);
                        break;
                    case 'bcd':
                        pantallaDiv.textContent = BCDHastaDecimal(numero);
                        break;
                    default:
                        pantallaDiv.textContent = "Seleccione un tipo de número válido.";
                }
                ingresoDiv.style.display = 'none';
                conversionDiv.style.display = 'grid';
                conversionRealizada = true; // Marcar que se ha realizado una conversión
            } else {
                alert("Por favor, ingrese un número válido.");
            }
        } else {
            alert("Solo se permite realizar una conversión a la vez. Presione 'Regresar' para continuar.");
        }
    });

    convertirBtn.addEventListener('click', function() {
        const numero = parseFloat(pantallaDiv.textContent);
        const tipoConversion = document.querySelector('input[name="conversion"]:checked').value;

        switch (tipoConversion) {
            case 'decimal-cam':
                break;
            case 'binario-cam':
                pantallaDiv.textContent = decimalHastaBinario(numero);
                break;
            case 'octal-cam':
                pantallaDiv.textContent = decimalHastaOctal(numero);
                break;
            case 'bcd-cam':
                pantallaDiv.textContent = decimalHastaBCD(numero);
                break;
            default:
                pantallaDiv.textContent = "Seleccione un tipo de número válido.";
        }

        conversionDiv.style.display = 'none';
        respuestaDiv.style.display = 'block';
    })

    regresarBtn.addEventListener('click', function() {
        respuestaDiv.style.display = 'none';
        pantallaDiv.textContent = '';
        ingresoDiv.style.display = 'block';
        entradaInput.value = '';
        conversionRealizada = false;
    })


});



