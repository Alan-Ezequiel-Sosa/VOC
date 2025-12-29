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
const axios = require('axios'); // Necesitarás instalar axios: npm install axios

app.post('/webhook', async (req, res) => {
    console.log('Mensaje de WhatsApp recibido!');
    
    try {
        // PEGA AQUÍ TU PRODUCTION URL DE n8n
        const n8nUrl = 'http://localhost:5678/webhook/whatsapp-data'; 
        
        await axios.post(n8nUrl, req.body);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error enviando a n8n:', error);
        res.sendStatus(500);
    }
});
    console.log('Mensaje recibido:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
