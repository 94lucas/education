//Seleciona os elementos do Formulário:
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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
// Captura o evento de submit para obter os valores 
form.onsubmit = (event) => {
    //Previne o comportamento padrão de recarregar o navegador
    event.preventDefault()

    // Cria um obj com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        create_at: new Date(),
    }

    //fazendo o teste
    // console.log(newExpense);

    //Chamando a função que irá adicionar o item na lista.
    expenseAdd(newExpense)

}
// Adiciona um novo item na lista
function expenseAdd (newExpense) {
    try {
        // Criar o elemento  para adicionar o item (li) na lista (ul)
        const expenseItem = document.createElement("li")
        //add a classe de estilização
        expenseItem.classList.add("expense")

        //Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        //Criando os atributos da tag img 
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a div info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Criando o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona o name e category na div das info das despesas
        expenseInfo.append(expenseName, expenseCategory)

        //Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$<small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Cria o incone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        //Adiciona as informações no item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        //adiciona o item na lista
        expenseList.append(expenseItem)
        
        // Atualiza os totais
        updateTotals(expenseItem)

    } catch (error) {
        alert("Não foi possivel atualizar a lista de despesas.")
        console.log(error);
        
    }
}

// Altualizar os totais
function updateTotals() {
    try {
        //Recupera todos os itens(li) da lista (ul)
        const items = expenseList.children
        console.log(items);

        // Atualiza a quantiodade de itens na lista - If ternario, se quantidade de itens da lista miaor que 1 usa despesas se nao usa despesa
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        //variável para incrementar o total.
        let total = 0
        //Percorre cada item (li ) da lista (ul)
        for (let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            //remove caracteres não numericos e substitui a virgula pelo ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")
            //Converte o valor para float
            value = parseFloat(value)

            // VRF se é um numero valido.
            if(isNaN(value)){
                return alert("Não foi possível calcular o total. O valor nao arece ser um numero")
            }   

            //Incrmentar o valor total
            total += Number(value)
        }
        
        // Criar a span para add o R$ formatado 
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        // eu to formatando valor e removo o R$ que sera exibido pela smal, usei o toUpperCase para garantir que ele vai ta maiusculo
        total = formatCurrencyBRL(total).toUpperCase().replace("R$","")

        //Limpa o conteudo do elemento
        expensesTotal.innerHTML = ""

        //Adiciona o simboloe da moeda eo valor total formatado
        expensesTotal.append(symbolBRL, total)
        
    } catch (error) {
        console.log(error);
        alert("Não foi possivel atualiza os totais")
        
    }    
}

// Eventod e captura clique nos itens da lista.
expenseList.addEventListener("click", function (event) {
    //Verifica se o elemento clicado é o ícone de remover
    if (event.target.classList.contains("remove-icon")) {
        // Obtendo a li pai do elemnto clicado
        const item = event.target.closest(".expense")
        //remove o item da lista.
        item.remove()
    }

    // atualiza os totais 
    updateTotals()
    
})