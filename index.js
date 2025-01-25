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

    const newActor=req.body;// extract bew actor from the request of the body 
    // const newActor={
    //     id: 3,
    //     name:"Tony khan",
    // };
    actorList.push(newActor);// push new actor to the actor list 
  return res.status(201).send({ message: "Actor is added successfully."});
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
