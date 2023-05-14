const mongoose = require('mongoose'); // import mongoose

const clientSchema=mongoose.Schema({
    adresse:String,
    cp:String,
    email:String,
    lastcnx:Date,
    listdevis:Array,
    listefav:Array,
    password:String,
    region:String,
    role:String,
    rs:String,
    sa:String,
    tel:String,
    nbrAo:Number,
    nbrDevis:Number,
    aos : [{type: mongoose.Schema.Types.ObjectId, ref: 'Ao'}],
});

const client = mongoose.model("Client",clientSchema)

module.exports=client