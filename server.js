import sqlite3 from "sqlite3";                                                                                  
import { open } from "sqlite";                                                                                
import express from "express";

const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());
app.use(express.static('public/')); //acessa os arquivos da pasta public apresentando o (HTML, CSS, JS)

//SQLITE INICIALIZANDO O BANCO DE DADOS
let db;

async function initDB() {
    db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });

    await db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            completed INTEGER DEFAULT 0
        )`);
}

//API ENDPOINTS

app.get('/tasks', async(req, res) => {
    const tasks = await db.all(`SELECT * FROM tasks`);
    res.json(tasks);
});

app.post('/tasks', async(req, res) => {
    const { description } = req.body
    const stmt = await db.prepare(`INSERT INTO tasks (description) VALUES (?)`);
    await stmt.run(description);
    await stmt.finalize();
    res.status(201).json({message: 'Task Added'});
})


