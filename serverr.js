const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = require('./backend/app')
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/doubletrade', { useNewUrlParser: true });

// Création du schéma pour les messages
const messageSchema = new mongoose.Schema({
  user: String,
  content: String,
  created_at: { type: Date, default: Date.now },
});

// Création du modèle pour les messages
const Message = mongoose.model('Message', messageSchema);

// Création du serveur HTTP
const server = http.createServer(app);

// Initialisation de Socket.io
const io = socketIO(server);

// Gestion des connexions Socket.io
io.on('connection', socket => {
  console.log('Un utilisateur s\'est connecté');

  // Récupération des derniers messages et envoi au client
  Message.find().limit(50).sort({ created_at: -1 }).exec((err, messages) => {
    if (err) {
      console.error(err);
      socket.emit('error', err);
    } else {
      socket.emit('init', messages);
    }
  });

  // Gestion des messages envoyés par le client
  socket.on('message', (data) => {
    console.log(data);

    const message = new Message({ user: data.user, content: data.content });
    message.save((err) => {
      if (err) {
        console.error(err);
        socket.emit('error', err);
      } else {
        io.emit('message', message);
      }
    });
  });

  // Gestion des déconnexions Socket.io
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
