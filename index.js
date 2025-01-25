import express from "express";
//backend app
const app = express();

//to make app understand the json
app.use(express.json());

const actorList = [
  {
    id: 1,
    name: "Tom Hanks",
  },
  {
    id: 2,
    name: "Iran Khan",
  },
];
//apis
app.get("/actor/list", (req, res)=>{
    return res.status(200).send({message: "Success", actors:actorList});
});
//add actor
app.post("/actor/add", (req, res) => {
  const newActor = req.body;

  // Simple validation: Check if id and name are provided
  if (!newActor.id || !newActor.name) {
    return res
      .status(400)
      .send({ message: "Please provide both 'id' and 'name'." });
  }

  actorList.push(newActor);
  return res.status(201).send({ message: "Actor added successfully." });
});


//Update actor
app.put("/actor/update", (req, res) => {
    const updatedActor=req.body;
    actorList.push(updatedActor);
  return res.status(201).send({ message: "Updating actor....." });
});

//get actor by id
app.get("/actor/detail/:id", (req, res) => {
    // const actorId= req.body.id;
    console.log(req.params);
    const actorId = req.params.id;
    const actorDetail= actorList.find((item)=>{
        return item.id === Number (actorId);
    });

    if(!actorDetail) {
       return res.status(201).send({ message: "Actor does not exist" }); 
    }else{
        return res.status(201).send({ message: "Success", actorData:actorDetail });
    }
});


//network port
const PORT=8080;

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
});
