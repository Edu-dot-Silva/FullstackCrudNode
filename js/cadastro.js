const form = document.getElementById('formCadastro')

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    fetch('http://localhost:3000/api/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id, titulo, descricao })
    })
    .then(response => response.json())
    .then(() => {
        carregarTarefas();
        formTarefa.reset();
    })
    .catch(error => console.error('Erro ao adicionar tarefa:', error));
});