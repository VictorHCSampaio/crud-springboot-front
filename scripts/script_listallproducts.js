function clearLoading(){
    document.getElementById("loading").style.display = "none";
}

function showProducts(products){
    let tab = ` <thread>
        <th class="cor">id</th>
        <th class="cor">Descrição</th>
        <th class="cor">Preço</th>
        <th class="cor">Categoria</th>
        <th class="cor">Quantidade de estoque</th>
        <th class="cor">Fornecedor</th>
        <th class="cor">Tipo</th>
        <th class="cor">Quantidade de entrada</th>
        <th class="cor">Marca</th>
        <th class="cor">Cor</th>
        <th class="cor">Editar</th>
        <th class="cor">Remover</th>
    </thread>`;

console.log(products)

    for(let product of products){
        let link="confirmarDelete("+product.id+")"
        tab += `
            <tr>
                <td class="cor">${product.id}</td>
                <td class="cor">${product.descricao}</td>
                <td class="cor">${product.preco}</td>
                <td class="cor">${product.categoria}</td>
                <td class="cor">${product.qtd_estoque}</td>
                <td class="cor">${product.fornecedor}</td>
                <td class="cor">${product.tipo}</td>
                <td class="cor">${product.qtd_entrada}</td>
                <td class="cor">${product.marca}</td>
                <td class="cor">${product.cor}</td>
                <td class="center-img"><a href=${"edit.html?id="+product.id}><img src="images/edit01.png" width="30" height="30" class="img"></a></td>          
                <td class="center-img"><button onclick=${link}><img src="images/trash01.jpg" width="30" height="30" class="img"></button></td>
            </tr>
        `;
    }
    document.getElementById("products").innerHTML = tab;
}

async function confirmarDelete(id) {
    var confirmacao = confirm("Você tem certeza que deseja continuar?");
    if (confirmacao) {
        const url = "https://crud-springboot-7s6y.onrender.com/produto/delete/"+id;
        const dados = await fetch(url, {method: "DELETE"});
        alert("Você deletou o produto de id: "+id);
        listAllProducts();
    } else {
        alert("Você cancelou a ação.");
    }
}

async function listAllProducts(){
    const url = "https://crud-springboot-7s6y.onrender.com/produto/listall";
    const dados = await fetch(url, {method: "GET"});
    if(dados.status === 200){
        const products = await dados.json();
        if(products){
            clearLoading();
        }
        showProducts(products);
    }
}
async function consultarId(){
    const form = document.getElementById("consultarId");
    const data = new FormData(form);
        const id = data.get("id");
        const url = "https://crud-springboot-7s6y.onrender.com/produto/list/"+id;
        const dados = await fetch(url, {method: "GET"});
        if(dados.status === 200){
                const product = await dados.json();
                showProducts([product]);
        }
}

listAllProducts();