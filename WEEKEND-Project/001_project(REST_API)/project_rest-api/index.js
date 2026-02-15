const x = require("express");
const server = x();

server.use(x.json());

let notes = [];
let idCounter = 1;

server.post("/notes", (req, res) => {
    const {title, content} = req.body;
    if (!title || !content) {
       return res.status(400).json({"message" : "Title and content must be require"}); 
    }

    const titleAndContent = {
        id : idCounter++,
        title,
        content
    };

    notes.push(titleAndContent);

    res.status(201).json({"message" : "Succesfully added notes"});
});


server.get("/notes/:id", (req, res) => {
    const reqId = req.params.id;

    const note = notes.find(item => item.id === parseInt(reqId));

    if (note) {
        res.status(200).json({
           note 
        })
    } else {
        res.status(404).json({
            "message" : "Can't found note"
        })
    }
});

server.put("/notes/:id", (req, res) => {
    const id = req.params.id
    const note = notes.find(item => item.id === parseInt(id));

    if (note) {
        if (req.body.title) {
            note.title = req.body.title;
        }
        if (req.body.content) {
            note.content = req.body.content;
        }
        res.status(200).json({
            "message" : "Succesfully updated",
            note
        });

    } else {
        return res.status(404).json({"message" : "Can't found note"});
    }  
});


server.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    const idCheck = notes.find(item => item.id === parseInt(id));

    if (idCheck) {
        notes = notes.filter(item => item.id !== parseInt(id));
        return res.status(200).json({
            "message" : "Succesfully delete",
            notes
        });
    } else {
        return res.status(404).json({"message" : "Can't found note"});
    }
});


server.listen(3000, () => {
    console.log("Server is running");
});