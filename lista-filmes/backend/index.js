import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "banco_filmes"
	
});

app.use(express.json());
app.use(cors());

//CRUD COM JAVASCRIPT

app.get('/', function (req, res) {
res.send('Bom dia')
})

//SELECIONAR TODOS OS FILMES DO BANCO
//localhost:3000/filmes
app.get("/filmes", (req,res) => {
	const q = "SELECT * FROM filmes"
	db.query(q,(err, data) =>{
		if (err) return res.json(err)
		return res.json(data)
	})
})

//CRIAR UM FILME NO BANCO
app.post("/addfilmes",(req,res) => {
	const q = "INSERT INTO filmes ( `nome`, `capa`, `descricao`, `incremento`, `criado_por`) VALUES (?)"
	const values = [
		req.body.nome,
		req.body.capa,
		req.body.descricao,
		req.body.incremento,
		req.body.criado_por,
		
	]

	db.query(q,[values], (err, data)=>{
		if(err) return res.json(err)
		return res.json("Seu filme foi adicionado com sucesso!")
})
})

//DELETAR UM FILME DO BANCO
app.delete("/filmes/:id", (req,res)=>{
	const filmesId = req.params.id;
	const q = "DELETE FROM filmes WHERE id =?"

	db.query(q,[filmesId],(err, data) =>{
		if(err) return res.json(err)
		return res.json("Seu filme foi deletado com sucesso!")
	})             
})

//ATUALIZAR UM FILME NO BANCO 
app.put("/filmes/:id", (req,res)=>{
	const filmesId = req.params.id;
	const q = "UPDATE filmes SET 'nome' = ?, 'capa' = ? , 'descricao'= ? , 'incremento' = ? , 'criado_por' = ? , WHERE id = ?"

	const values = [
		req.body.nome,
		req.body.capa,
		req.body.descricao,
		req.body.incremento,
		req.body.criado_por,
	]

	db.query(q,[...values,filmesId],(err, data) =>{
		if(err) return res.json(err)
		return res.json("Seu filme foi atualizado com sucesso!")
	})             
})

app.listen(8809, () =>{
	console.log("A API está rodando em http://localhost:8809");
});

