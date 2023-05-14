const mongoose = require('mongoose'); // import mongoose


const devisSchema=mongoose.Schema({
   

    text:String,
    statu: String,
    prix:Number,
    launchDate:Date,
    idCandidate:{type: mongoose.Schema.Types.ObjectId , ref:"Client"},
    idAo:{type: mongoose.Schema.Types.ObjectId , ref:"Ao"},
    ref:String,
    msg:String, 
    notifDO:String, 
    notifCandidat:String, 

});

const devis = mongoose.model("Devis",devisSchema)

module.exports=devis