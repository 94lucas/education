//Seleciona os elementos do Formulário:
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Fica de olho se tem algum evento no input. Captura o evento de input para formatar o valor
amount.oninput = () => {
    //para remover letras, usamos o regex ( amount.value e o que eu digitei no input)
    let value = amount.value.replace(/\D/g, "")

    // transforma o valor em centavos. Pega o value e transfoma o value em number e divide por 100
    value = Number(value)/100
    // Atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    //Formatando o valor no padrão BRL 
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    //Retorna o valor formatado
    return value
}

form.onsubmit = (event) => {
    event.preventDeault()
}

