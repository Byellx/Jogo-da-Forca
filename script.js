var start = document.getElementById("comecar");
var input = document.getElementsByTagName("input");
var palavra_secreta = document.getElementById("palavra_secreta");
var enviar_palavra_secreta = document.getElementById("enviar_palavra_secreta");
var secreta = [];
var letra = document.getElementById("letra");
var tentar_letra = document.getElementById("tentar_letra");
var comparaLetra = [1];
var comparaPalavra = [];
var conteiner_letras_adivinhadas = document.getElementById("conteiner_letras_adivinhadas");
var conteiner_desenho = document.getElementById("conteiner_desenho");
var letras_informadas = document.getElementById("letras_informadas");
var letras_erradas = document.getElementById("letras_erradas");
var tentativas = document.getElementById("tentativas_restantes");
var palavra = document.getElementById("palavra");
var responder_palavra = document.getElementById("responder_palavra");

function iniciarJogo()
{
    input[0].removeAttribute("disabled");
    tentativas.innerText = 6;

    start.innerText = "Terminar";
    start.removeEventListener("click", iniciarJogo);
    start.addEventListener("click", terminarJogo);

    enviar_palavra_secreta.addEventListener("click", guardarPalavra);
}

function terminarJogo()
{
    for(let i = 0; i < input.length; i++)
    {
        input[i].setAttribute("disabled", "true");
    }

    start.innerText = "Começar";
    start.removeEventListener("click", terminarJogo);
    start.addEventListener("click", iniciarJogo);

    enviar_palavra_secreta.innerText = "Enviar";

    letras_informadas.innerText = "";
    letras_erradas.innerText = "";
    conteiner_letras_adivinhadas.innerHTML = "";
    secreta = [];
    comparaPalavra = [];

}

function guardarPalavra()
{
    secreta = palavra_secreta.value;
    secreta = secreta.trim().toUpperCase();
    console.log(secreta);
    comparaPalavra.length = secreta.length;

    palavra_secreta.value = "";
    enviar_palavra_secreta.removeEventListener("click", guardarPalavra);

    var caixa_letra;

    for(let i = 0; i < secreta.length; i++)
    {
        caixa_letra = document.createElement("div");
        caixa_letra.classList.add("letras");
        conteiner_letras_adivinhadas.appendChild(caixa_letra);
    }

    enviar_palavra_secreta.innerText = "Já informada!";

    for(let i = 0; i < input.length; i++)
    {
        if(input[i].disabled == false)
        {
            input[i].setAttribute("disabled", "true");
        }else{
            input[i].removeAttribute("disabled");
        }
    }

    tentar_letra.addEventListener("click", tentarLetra);
    responder_palavra.addEventListener("click", adivinharPalavra);
}

function tentarLetra()
{
    comparaLetra = letra.value.charAt(0);
    comparaLetra = comparaLetra.trim().toUpperCase();
    var letra_regex = new RegExp(comparaLetra, "ig");
    var letras = document.getElementsByClassName("letras");

    for(let i = 0; i < secreta.length; i++)
    {
        if(comparaLetra == secreta[i])
        {
            comparaPalavra[i] = comparaLetra;
            letras[i].innerText = comparaLetra;
        }
    }

    if(secreta.match(letra_regex))
    {
        if(!(letras_informadas.innerText.match(letra_regex)))
        {
            letras_informadas.innerText += " " + comparaLetra;
        }
    }else{

        var texto_informadas = letras_informadas.innerText.match(letra_regex);
        var texto_erradas = letras_erradas.innerText.match(letra_regex);

        if(
            (!(texto_informadas)) || (!(texto_erradas))
        )
        {
            letras_informadas.innerText += " " + comparaLetra;
            letras_erradas.innerText += " " + comparaLetra;
            tentativas.innerText--;
        }else{
            window.alert("A letra " + comparaLetra + " já foi informada!");
        }
    }

    letra.value = "";

    setTimeout(function(){

        resultado(comparaPalavra.join(""));

        if(tentativas.innerText < 1)
        {
            window.alert("Você perdeu!");
            letra.setAttribute("disabled", "true");
            tentar_letra.removeEventListener("click", tentarLetra);
            palavra.setAttribute("disabled", "true");
            responder_palavra.removeEventListener("click", adivinharPalavra);
        }
    }, 1000)

}

function adivinharPalavra()
{
    comparaPalavra = palavra.value;
    comparaPalavra = comparaPalavra.trim().toUpperCase();

    resultado(comparaPalavra);

    palavra.value = "";
}

function resultado(comparador)
{
    var letras = document.getElementsByClassName("letras");
    
    if(!(comparador.localeCompare(secreta)))
    {
        for(let i = 0; i < secreta.length; i++)
        {
            letras[i].innerText = secreta[i];
        }

        window.alert("Você venceu!");
    }
}

start.addEventListener("click", iniciarJogo);