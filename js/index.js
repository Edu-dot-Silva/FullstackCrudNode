const formTarefa = document.getElementById('formTarefa');
        const listaTarefas = document.getElementById('listaTarefas');
        const usuario_id = document.getElementById('usuario_id').value;

        // Função para carregar as tarefas
        function carregarTarefas() {
            fetch(`http://localhost:3000/api/tarefas/${usuario_id}`)
                .then(response => response.json())
                .then(data => {
                    listaTarefas.innerHTML = '';
                    data.forEach(tarefa => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <span><strong>${tarefa.titulo}</strong>: ${tarefa.descricao}</span>
                            <button class="excluir" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
                        `;
                        listaTarefas.appendChild(li);
                    });
                })
                .catch(error => console.error('Erro ao carregar tarefas:', error));
        }

        // Função para adicionar uma nova tarefa
        formTarefa.addEventListener('submit', function(event) {
            event.preventDefault();
            const titulo = document.getElementById('titulo').value;
            const descricao = document.getElementById('descricao').value;

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

        // Função para excluir uma tarefa
        function excluirTarefa(id) {
            fetch(`http://localhost:3000/api/tarefas/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(() => {
                carregarTarefas();
            })
            .catch(error => console.error('Erro ao excluir tarefa:', error));
        }

        // Carrega as tarefas ao carregar a página
        window.onload = carregarTarefas;

