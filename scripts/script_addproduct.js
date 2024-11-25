function clearTextFields(){
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("qtd_estoque").value = "";
    document.getElementById("fornecedor").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("qtd_entrada").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("cor").value = "";
}


async function addProduct(){
    const formE1 = document.querySelector("#formadd");
    const formData = new FormData(formE1);
    const product = Object.fromEntries(formData);
    const url = "http://localhost:8080/produto/add";
    const option = {
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(product)
    }
    const result = await fetch(url, option);
    if(result.status === 201){
        clearTextFields();
        alert('Cadastrado com sucesso');
        document.location.href = "listallproducts.html";
    }
    else{
        alert('Erro ao cadastrar')
    }
}
