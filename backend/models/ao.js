const mongoose = require('mongoose'); // import mongoose


const aoSchema=mongoose.Schema({
    state:String,
    place:String,
    placeVendor:String,
    sa:String,
    text:String,
    title:String,
    budget:Number,
    delivery:String,
    launchDate:Date,
    idLauncher:{type: mongoose.Schema.Types.ObjectId , ref:"Client"},
    limitDate:Date,
    rectifs:String,
    ref:String,
   
    

  
});

const ao = mongoose.model("Ao",aoSchema)

module.exports=ao