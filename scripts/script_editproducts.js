async function editProduct(){
    const form = document.getElementById("edit");
    const data = new FormData(form);

    const formObject = {};
    data.forEach((value, key) => {
        formObject[key] = value;
    });

    const apiUrl = "https://crud-springboot-7s6y.onrender.com/produto/update";

    async function sendFormData() {
        try {
            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObject)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log("Response Data:", responseData);
            document.location.href = "index.html";

        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Call the function to send the data
    sendFormData();
}

async function showForm(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log(params)
    const url = "https://crud-springboot-7s6y.onrender.com/produto/list/"+id;
    const dados = await fetch(url, {method: "GET"});
    if(dados.status === 200){
            const product = await dados.json();
            let form = `
            <form id = "edit" onSubmit = "editProduct(); return false">
                        ID........: ${product.id} <input type="hidden" name="id" value=${product.id} class="txt">  <BR>
                     <div class="form-container">
                        <div class="form-group">
                            <label for="descricao">Descrição:</label>
                            <input placeholder= "Digite a descricão" class="txt" type="text" name="descricao" value="${product.descricao}">  <BR>
                        </div>
                        <div class="form-group">
                            <label for="preco">Preço:</label>
                            <input placeholder= "Digite o preço" class="txt" type="number" name="preco" value= ${product.preco}> <BR>
                        </div>
                        <div class="form-group">
                            <label for="categoria">Categoria:</label>
                            <input placeholder= "Digite a categoria" class="txt" type="text" name="categoria" value= "${product.categoria}"> <BR>
                        </div>
                        <div class="form-group">
                            <label for="qtd_estoque">Quantidade de Estoque:</label>
                            <input placeholder= "Digite a Quantidade de estoque" class="txt" type="number" name="qtd_estoque" value= ${product.qtd_estoque}> <BR>
                        </div>
                        <div class="form-group">
                            <label for="fornecedor">Fornecedor:</label>
                            <input placeholder= "Digite o Fornecedor" class="txt" type="text" name="fornecedor" value= "${product.fornecedor}"> <BR>
                        </div>
                        <div class="form-group">
                            <label for="tipo">Tipo:</label>
                            <input placeholder= "Digite o Tipo" class="txt" type="text" name="tipo" value= "${product.tipo}"> <BR>
                        </div>
                        <div class="form-group">
                            <label for="qtd_entrada">Quantidade de entrada:</label>
                            <input placeholder= "Digite a quantidade" class="txt" type="number" name="qtd_entrada" value= ${product.qtd_entrada}> <BR>
                        </div>
                        <div class="form-group">
                            <label for="marca">Marca:</label>
                            <input placeholder= "Digite a marca" class="txt" type="txt" name="marca" value= "${product.marca}"> <BR>
                        </div>
                        <div class="form-group">
                            <label for="cor">Cor:</label>
                            <input placeholder= "Digite a cor" class="txt" type="txt" name="cor" value= "${product.cor}"> <BR>
                        </div>
                        <input type="submit" name="op" value="ATUALIZAR" class="botao" >
                        <BR>
                        <input type="submit" name="op" value="CANCELAR" class="botao" onclick="document.location.href = 'index.html'; return false;">
                    </div>
                    </form>
            `
           document.getElementById("MainEditDiv").innerHTML = form;
        }

}
showForm();