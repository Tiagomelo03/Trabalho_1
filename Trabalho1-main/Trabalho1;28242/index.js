const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mainpage.html'));
});

// Rota para a página de resultados
app.get('/resultados', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'resultados.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});