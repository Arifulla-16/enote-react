const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

const app = express();

app.use(cors())


app.use(bodyParser.urlencoded(({extended:true})));
app.use(bodyParser.json())

const Mongoose = require("mongoose");

Mongoose.connect("mongodb+srv://skarfistark:arifulla616@cluster0.ldvegku.mongodb.net/enoteDB");

const noteSchema = new Mongoose.Schema({
        id:String,
        // user:String,
        title:String,
        text:String,
        list:Array,
        checkList:Array,
        tags:Array,
        images:Array,
        bgImage:String,
        bgColor:String,
        pinned:Boolean,
        archived:Boolean
});

const tagSchema = new Mongoose.Schema({
    // user:String,
    tags:Array
});

const userSchema = new Mongoose.Schema({
    username:String,
    password:String,
});

const Notes = new Mongoose.model("Note",noteSchema);
const Trash = new Mongoose.model("Trash",noteSchema);
const Tags = new Mongoose.model("Tag",tagSchema);
const Users = new Mongoose.model("User",userSchema);



app.get("/tags",(req,res)=>{
    Tags.find({}).then(list=>{
        if(list[0].tags!=undefined)
        res.send(list[0].tags);
        else
        res.send([]);
    }).catch(e=>console.log(e))
});

app.put("/tags",(req,res)=>{
    Tags.find({}).then(list=>{
        var id = list[0]._id;
        Tags.updateOne({},{tags:req.body}).then(()=>{res.send([])}).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
});

app.get("/notes",(req,res)=>{
    Notes.find({}).then(list=>{
        // console.log(list);
        res.send(list)
    }).catch(e=>console.log(e))
});

app.put("/notes/:id",(req,res)=>{
    var id = req.params.id;
    Notes.updateOne({id:id},req.body).then(()=>{
        res.send({status:"complete"})
    }).catch(e=>console.log(e))
})


app.post("/notes",(req,res)=>{
    let note = new Notes({
        "id":req.body.id,
        "title":req.body.title,
        "text":req.body.text,
        "list":req.body.list,
            "checkList":req.body.checkList,
            "tags":req.body.tags,
            "images":req.body.images,
            "bgImage":req.body.bgImage,
            "bgColor":req.body.bgColor,
            "pinned":req.body.pinned,
            "archived":req.body.archived
        })
        note.save().catch(e=>console.log(e));
        res.send(req.body);
    });
    
app.delete("/notes/:id",(req,res)=>{
    var id=req.params.id;
    Notes.deleteOne({id:id}).then((response)=>{
        console.log(response);
        res.send({"status":"success"});
    }).catch(e=>console.log(e))
})

app.get("/trash",(req,res)=>{
    Trash.find({}).then(list=>{
        // console.log(list);
        res.send(list)
    }).catch(e=>console.log(e))
});

app.post("/trash",(req,res)=>{
    console.log(req.body);
    let tr = new Trash({
            "id":req.body.id,
            "title":req.body.title,
            "text":req.body.text,
            "list":req.body.list,
            "checkList":req.body.checkList,
            "tags":req.body.tags,
            "images":req.body.images,
            "bgImage":req.body.bgImage,
            "bgColor":req.body.bgColor,
            "pinned":req.body.pinned,
            "archived":req.body.archived
        })
    tr.save().catch(e=>console.log(e));
    res.send({"status":"success"});
});

app.delete("/trash/:id",(req,res)=>{
    var id=req.params.id;
    Trash.deleteOne({id:id}).then((response)=>{
        console.log(response);
        res.send({"status":"deleted"});
    }).catch(e=>console.log(e))
})


app.listen(3500,()=>{
    console.log("started");
},)