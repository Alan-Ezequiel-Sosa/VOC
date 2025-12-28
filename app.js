const express = require('express');
const app = express();
app.use(express.json());

// 1. RUTA DE VERIFICACIÓN (Para el formulario de Facebook)
app.get('/webhook', (req, res) => {
    // El "Verify Token" que tú eliges (puedes cambiarlo, pero recuérdalo)
    const VERIFY_TOKEN = "mi_token_secreto_123";

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFICADO');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// 2. RUTA PARA RECIBIR MENSAJES (Cuando alguien te escriba)
app.post('/webhook', (req, res) => {
    console.log('Mensaje recibido:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));