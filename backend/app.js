const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const path = require("path");


const Client = require("./models/client");
const Ao = require("./models/ao");
const Devis = require("./models/devis");
const { async } = require('rxjs/internal/scheduler/async');
const { findOne } = require('./models/client'); 



const app = express();

const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

mongoose.connect('mongodb://localhost:27017/marchesprives', { useNewUrlParser: true });


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json()) 

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});



app.post("/clients/login", async (req, res) =>{
console.log("here email and password for login");
const user = await Client.findOne({email: req.body.email});
if (!user) {
  res.status(200).json({
    message: "0",
  });
}else{
  const correctPwd = await bcrypt.compare(req.body.password, user.password);
  if (!correctPwd) {
    res.status(200).json({
      message: "1",
    });
  } else {
    let userForBD = {
      id: user._id, 
      adresse:user.adresse,
      cp:user.cp,
      email:user.email,
      lastcnx:new Date(),
      listdevis:user.listdevis,
      listefav:user.listefav,
      password:user.password,
      region:user.region,
      role:user.role,
      rs:user.rs,
      sa:user.sa,
      tel:user.tel,
      aos:user.aos,
    };
  
    console.log("user fo bdddddddddddddddd", userForBD);
   await Client.updateOne({_id:user._id}, userForBD).then(()=>{res.status(200).json({
      message: "2",
      user: user,
    });})
    
  }
}

}
);

app.post("/clients", (req, res) => {
  console.log("here into adding Client", req.body);
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    if (err) {
      console.log(err);
    } else {
      let client = new Client({
        rs: req.body.rs,
        adresse: req.body.adresse,
        region: req.body.region,
        password: hash,
        sa: req.body.sa,
        email: req.body.email,
        cp: req.body.cp,
        tel: req.body.tel,
        role: req.body.role,
        lastcnx: new Date(),
        listdevis: [],
        listefav: [],
        nbrAo: 1,
        nbrDevis: 1,
      })

     await client.save((err, doc) => {
        if (err) {
          console.log("here error", err);
        } else {
          res.status(200).json({ message: "Client added with success" });
        }
      })
    }


  });
});



app.post("/aos", async (req, res) => {
  console.log("here into adding AO", req.body);
  let C = await Client.findOne({_id: req.body.idLauncher})
  let reff = "AO" + req.body.idLauncher.slice(-4) + "00" + C.nbrAo

  let ao = new Ao({
    rectifs:"",
    state: "inprogress",
    place: req.body.place,
    placeVendor: req.body.placeVendor,
    sa: req.body.sa,
    text: req.body.text,
    title: req.body.title,
    budget: req.body.budget,
    delivery: req.body.delivery,
    launchDate: new Date(),
    limitDate: req.body.limitDate,
    idLauncher: req.body.idLauncher,
    ref: reff,
  })

 
  await ao.save(async (err,doc)=>{
    if (err) {
      console.log("here error", err);
    } else {
      res.status(200).json({ message: "AO added with success", ao : doc });
      C.nbrAo += 1;
      await Client.updateOne({_id: C._id}, C)
    }
  })
  
   
}
);

app.post("/aos/actu", async (req, res)=>{
console.log("here get ao by sa Actu", req.body);
await Ao.find({sa: req.body.sa, _id: {$nin: req.body.listefav}}).populate('idLauncher').then((doc)=>{res.status(200).json({message: "get AOS ACTU", listAos : doc})})
});

app.post("/aos/fav", async (req, res)=>{
  console.log("here get ao by sa Fav", req.body);
  await Ao.find({sa: req.body.sa, _id: {$in: req.body.listefav}}).populate('idLauncher').then((doc)=>{res.status(200).json({message: "get AOS FAV", listAosFav : doc})})
  }
  
  );


app.get("/aos/mesAO/:id", async (req, res)=>{
  console.log("here into get aos by idluncher******", req.params.id);
  await Ao.find({idLauncher: req.params.id}).then((doc)=>{res.status(200).json({message: "get mesAOS with success", listAos : doc})})
  
});

app.get("/aos/monAO/:id", async (req, res)=>{
  console.log("here into get ao info******", req.params.id); 
  await Ao.findOne({_id: req.params.id}).populate('idLauncher').then((doc)=>{res.status(200).json({message: "get monAO with success", ao : doc})})
  
});

app.put("/aos",async (req, res) => {
  const d = new Date();
  console.log("rectif AO", req.body.txt);
  const newAO = await Ao.findOne({_id: req.body.id})
  
  if (req.body.newDate) {
    newAO.limitDate = req.body.newDate;
    newAO.rectifs = newAO.rectifs + "rectificatif le :" + d + " Nouvelle date limite de remise des offres : " + req.body.newDate + req.body.txt + " // ";
  } else {
    newAO.rectifs = newAO.rectifs + "rectificatif le :" + d + "   " + req.body.txt + " // ";
  }
 
  await Ao.updateOne({_id: req.body.id}, newAO).then(()=>{res.status(200).json({
    message: "success update",
    
  });})

});

app.delete("/aos/:id", async (req, res) => {
  await Ao.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({ message: "deleted" });
  });
});

app.post("/clients/addFav", async (req, res) => {
 let oldC =  await Client.findOne({_id: req.body._id})
 console.log("alooooo1111111111111111111", oldC);
 let newC = {
  rs: oldC.rs,
  adresse: oldC.adresse,
  region: oldC.region,
  password: oldC.password,
  sa: oldC.sa,
  email: oldC.email,
  cp: oldC.cp,
  tel: oldC.tel,
  role: oldC.role,
  lastcnx: oldC.lastcnx,
  listdevis: oldC.listdevis,
  listefav: req.body.listefav,
  aos: oldC.aos,
}

console.log("alooooo22222222222222222", newC);
await Client.updateOne({_id:oldC._id}, newC).then(()=>{res.status(200).json({
  message: "update liste faaaaaav",
  user: newC,

  });
  console.log("allllllooooooooo333333333", user);
});

})

app.post("/clients/notFav", async (req, res) => {
  let oldC =  await Client.findOne({_id: req.body._id})
  console.log("alooooo1111111111111111111", oldC);
  let newC = {
   rs: oldC.rs,
   adresse: oldC.adresse,
   region: oldC.region,
   password: oldC.password,
   sa: oldC.sa,
   email: oldC.email,
   cp: oldC.cp,
   tel: oldC.tel,
   role: oldC.role,
   lastcnx: oldC.lastcnx,
   listdevis: oldC.listdevis,
   listefav: req.body.listefav,
   aos: oldC.aos,
 }
 
 console.log("alooooo22222222222222222", newC);
 await Client.updateOne({_id:oldC._id}, newC).then(()=>{res.status(200).json({
   message: "update liste faaaaaav",
   user: newC,
 
   });
   console.log("allllllooooooooo333333333", user);
 });
 
 });



 app.post("/devis", async (req, res) => {
  console.log("here into adding DEvis", req.body);
  let C = await Client.findOne({_id: req.body.idCandidate})
  let reff = "D" + req.body.idCandidate.slice(-4) + "00" + C.nbrDevis

  let devis = new Devis({
    
    statu: "inprogress",
    
    idCandidate: req.body.idCandidate,
    idAo: req.body.idAo,
    text: req.body.text,
    prix: req.body.prix,
    launchDate: new Date(),
    ref: reff,
  })

 
  await devis.save(async (err,doc)=>{
    if (err) {
      console.log("here error", err);
    } else {
      res.status(200).json({ message: "AO added with success", dev : doc });
      C.nbrDevis += 1;
      await Client.updateOne({_id: C._id}, C)
    }
  })
  
   
}
);
 

 
app.post("/devis/devao", async (req, res) => {
  console.log(req.body);
  let ao = await Ao.findOne({ref: req.body.ref, idLauncher: req.body.me})
  console.log("22222222222222222222222222", ao.ref, ao.idLauncher);
  await Devis.find({idAo: ao._id}).populate('idCandidate').then((doc)=>{
    
    if (doc.length == 0) {
      console.log("gggggggggggggggggggg",doc);
      res.status(200).json({
        
        message :  "0",
        listdev: doc,
        });
        
    } else {
      if (!req.body.nbrAfich) {
        doc.sort((a, b) => a.prix - b.prix);
        
          res.status(200).json({
            message: doc.length.toString(),
            listdev: doc,
            });
      } else {
        
      
      switch (req.body.nbrAfich) {
        case "Les 10 meilleurs prix":
  
        doc.sort((a, b) => a.prix - b.prix);
        let tab = doc.slice(0, 10)
          res.status(200).json({
            message: doc.length.toString(),
            listdev: tab,
            });
          break;
      
        case "Les 5 meilleurs prix":
          doc.sort((a, b) => a.prix - b.prix);
        let tab1 = doc.slice(0, 5)
          res.status(200).json({
            message: doc.length.toString(),
            listdev: tab1,
            });
          break;
  
          case "Tous les Offres":
            doc.sort((a, b) => a.prix - b.prix);
        
          res.status(200).json({
            message: doc.length.toString(),
            listdev: doc,
            });
            break; 
  
      }
      
    }  
  }
    
    
  })
  
   
}
);

app.get("/devis/:id", async (req, res) => {
  
  await Devis.find({idCandidate: req.params.id }).populate('idAo').then((doc)=>{
    
    
      
      res.status(200).json({
        
        message :  "0",
        listdev: doc,
        });
      }
  )}
     
);

app.delete("/devis/:id", async (req, res) => {
  await Devis.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({ message: "deleted" });
  });
});

app.put("/devis", async (req, res) => {

  console.log(req.body._id);
  let D = await Devis.findOne({_id: req.body._id});
  D.statu = "Accepted" 

  await Devis.updateOne({_id: D._id}, D).then(() => {
    res.status(200).json({ message: "Accepted" });
})
});


app.put("/devis/msgDevis", async (req, res) => {
  let m = new Date();
  let dateString =
    m.getUTCFullYear() + "/" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + m.getUTCDate()).slice(-2) + " " +
    ("0" + m.getUTCHours()).slice(-2) + ":" +
    ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    ("0" + m.getUTCSeconds()).slice(-2);
  let dMsg = await Devis.findOne({_id: req.body.id})
  console.log("devis trouve");
  dMsg.msg += "(" + dateString + ")" + req.body.content;
  dMsg.notifCandidat = "1"
  await Devis.updateOne({_id: req.body.id}, dMsg).then(() => {
    res.status(200).json({ message: "msg envoyer" });
});
});

app.post("/devis/anc/:id", async (req, res) => {
 console.log("here into anul notif candidat");
  let dMsg = await Devis.findOne({_id: req.params.id})
  console.log("devis trouve", dMsg);
  dMsg.notifCandidat = "0";
  await Devis.updateOne({_id: req.params.id}, dMsg).then(() => {
    res.status(200).json({ message: "notification annulée" });
});
});

app.put("/devis/msgDevisC", async (req, res) => {
  let m = new Date();
  let dateString =
    m.getUTCFullYear() + "/" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + m.getUTCDate()).slice(-2) + " " +
    ("0" + m.getUTCHours()).slice(-2) + ":" +
    ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    ("0" + m.getUTCSeconds()).slice(-2);
  let dMsg = await Devis.findOne({_id: req.body.id})
  console.log("devis trouve");
  dMsg.msg += "(" + dateString + ")" + req.body.content;
  dMsg.notifDO = "1"
  await Devis.updateOne({_id: req.body.id}, dMsg).then(() => {
    res.status(200).json({ message: "msg envoyer" });
});
});

app.post("/devis/ando/:id", async (req, res) => {
  console.log("here into anul notif DO");
   let dMsg = await Devis.findOne({_id: req.params.id})
   console.log("devis trouve", dMsg);
   dMsg.notifDO = "0";
   await Devis.updateOne({_id: req.params.id}, dMsg).then(() => {
     res.status(200).json({ message: "notification annulée" });
 });
 });

module.exports = app;