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
        <form id="edit" onSubmit="editProduct(); return false">
            <input type="hidden" name="id" value="${product.id}">
    
            <div class="form-grid">
                <div class="form-group">
                    <label for="descricao">Descrição:</label>
                    <input type="text" name="descricao" value="${product.descricao}" required>
                </div>
                <div class="form-group">
                    <label for="preco">Preço:</label>
                    <input type="number" name="preco" value="${product.preco}" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="categoria">Categoria:</label>
                    <input type="text" name="categoria" value="${product.categoria}">
                </div>
                <div class="form-group">
                    <label for="qtd_estoque">Estoque Atual:</label>
                    <input type="number" name="qtd_estoque" value="${product.qtd_estoque}">
                </div>
                <div class="form-group">
                    <label for="fornecedor">Fornecedor:</label>
                    <input type="text" name="fornecedor" value="${product.fornecedor}">
                </div>
                <div class="form-group">
                    <label for="tipo">Tipo:</label>
                    <input type="text" name="tipo" value="${product.tipo}">
                </div>
                <div class="form-group">
                    <label for="qtd_entrada">Quantidade de Entrada:</label>
                    <input type="number" name="qtd_entrada" value="${product.qtd_entrada}">
                </div>
                <div class="form-group">
                    <label for="marca">Marca:</label>
                    <input type="text" name="marca" value="${product.marca}">
                </div>
                <div class="form-group">
                    <label for="cor">Cor:</label>
                    <input type="text" name="cor" value="${product.cor}">
                </div>
            </div>
    
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="document.location.href='index.html';">Cancelar</button>
                <button type="submit" class="btn btn-primary">Atualizar</button>
            </div>
        </form>
`;
           document.getElementById("MainEditDiv").innerHTML = form;
        }

}
showForm();