const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


const app=express();
const port=3000;

//Middleware para permitir cross-origin requests (CORS)
//e parsing do body
app.use(cors());
app.use(bodyParser.json());

//conexão com o BD MySQL
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'lista_tarefas_ads_a'
});

// rota para adicionar usuarios
app.post('/api/usuarios',(req,res)=>{
    const {nome,senha} = req.body;
    const sql = 'insert into usuarios (nome,senha) values ( ? , ? )'
    db.query(sql,[nome,senha],(err)=>{
        if (err){
            return res.status(500).send('Erro ao inserir usuario')
        }
        res.send({message: "Usuario inserido com sucesso"})
    })
})

//conexão com o BD mysql
db.connect(err => {
    if (err){
        console.error('Erro ao conectar ao MySQL: ',err);
        return;
    }
    console.log('Conectado ao Banco de Dados MySQL!');
});

// rota para adicionar uma tarefa(POST/api/tarefas)
app.post('/api/tarefas' , (req , res)=>{
    const {usuario_id , titulo , descricao} = req.body;
    const sql = 'insert into tarefas ( usuario_id , titulo , descricao ) values ( ? , ? , ? )'; 
    db.query(sql , [usuario_id , titulo , descricao] , (err) => {
        if (err){
            return res.status(500).send("Erro ao inserir tarefa");
        }
        res.send({message: 'Tarefa inserida com sucesso'});
    });
});


//rota para obter todas as tarefas de um usuário (GET /api/tarefas/:usuario_id)
app.get('/api/tarefas/:usuario_id',(req,res) => {
    const { usuario_id } = req.params;
    const sql = 'SELECT * FROM tarefas where usuario_id = ?';
    db.query (sql, [usuario_id], (err,results) => {
        if (err){
            return res.status(500).send('Erro ao obter tarefas');
        }
        res.send(results);
    });
});

// Rota para atualizar uma tarefa (PUT /api/tarefas/:id)
app.put('/api/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;
    const sql = 'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?';
    db.query(sql, [titulo, descricao, status, id], (err) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar tarefa');
        }
        res.send({ message: 'Tarefa atualizada com sucesso' });
    });
});

// Rota para deletar uma tarefa (DELETE /api/tarefas/:id)
app.delete('/api/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tarefas WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).send('Erro ao excluir tarefa');
        }
        res.send({ message: 'Tarefa excluída com sucesso' });
    });
});

// Rota para listar usuarios
app.get('/api/usuarios',(req,res)=>{
    const sql = 'select id,nome,senha from usuarios'
    db.query(sql,(err,results)=>{
        if(err){
            console.error('Erro ao obter usuarios', err)
            return res.status(500).send({error:'Erro ao listar Usuario'})
        }
        res.status(200).send(results)
    })
})

// rota para login/endpoint
app.post('/api/login',(req,res)=>{
    const {nome,senha} = req.body //dados enviados pelo cliente
    //querry para verificar se o usuario e senha estao corretos
    const sql = 'select * from usuarios where nome = ? and senha = ?';
    db.query(sql,[nome,senha],(err,results)=>{
        if(err){
            console.error("Erro ao verificar login", err)
            return res.status(500).send({error: "Erro interno do Servidor"})
        }
        if(results.length > 0){
            res.status(200).send({message: "Login bem sucedido"})
        }else{
            res.status(401).send({error: "Usuario ou Senha Incorretos"})
        }

    })

})



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
