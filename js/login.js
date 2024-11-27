document.getElementById('loginForm').addEventListener('submit',function(event){
    event.preventDefault()

// pegando valores do formulario
const nome = document.getElementById('nome').value
const senha = document.getElementById('senha').value

// cria objeto com dados a serem enviados
const credenciais = {nome,senha}

// enviando dados pro back end
fetch('http://localhost:3000/api/login',{
    method:'POST',
    headers:{
        'Content-type':'application/json'
    },
    body: JSON.stringify(credenciais)
})
.then(response =>{
    if(response.ok){
        return response.json()
    }else if(response.status===401){
        throw new Error("Usuario e Senha invalidos!!!\nTente Novamente")
    }else{
        throw new Error("Erro interno no servidor")

    }
})
.then(data=>{
    document.getElementById('mensagem').textContent = data.message
    alert("Redirecionando para pagina principal")
    document.getElementById('mensagem').className = "mensagem_sucesso"
    location.href= "./principal.html"
})
.catch(error =>{
    document.getElementById('mensagem').textContent = error.message
    document.getElementById('mensagem').className = "mensagem_erro"
})
})