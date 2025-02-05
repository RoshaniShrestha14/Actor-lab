// import express from "express";
// //backend app
// const app = express();

// //to make app understand the json
// app.use(express.json());

// const actorList = [
//   {
//     id: 1,
//     name: "Tom Hanks",
//   },
//   {
//     id: 2,
//     name: "Iran Khan",
//   },
// ];
// //apis
// app.get("/actor/list", (req, res)=>{
//     return res.status(200).send({message: "Success", actors:actorList});
// });
// //add actor
// app.post("/actor/add", (req, res) => {
//   const newActor = req.body;

//   // Simple validation: Check if id and name are provided
//   if (!newActor.id || !newActor.name) {
//     return res
//       .status(400)
//       .send({ message: "Please provide both 'id' and 'name'." });
//   }

//   actorList.push(newActor);
//   return res.status(201).send({ message: "Actor added successfully." });
// });


// //Update actor
// app.put("/actor/update", (req, res) => {
//     const updatedActor=req.body;
//     actorList.push(updatedActor);
//   return res.status(201).send({ message: "Updating actor....." });
// });

// //get actor by id
// app.get("/actor/detail/:id", (req, res) => {
//     // const actorId= req.body.id;
//     console.log(req.params);
//     const actorId = req.params.id;
//     const actorDetail= actorList.find((item)=>{
//         return item.id === Number (actorId);
//     });

//     if(!actorDetail) {
//        return res.status(201).send({ message: "Actor does not exist" }); 
//     }else{
//         return res.status(201).send({ message: "Success", actorData:actorDetail });
//     }
// });


// //network port
// const PORT=8080;

// app.listen(PORT,()=>{
//     console.log(`App is listening on port ${PORT}`)
// });

import express from "express";

const app = express();
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

// Get actor list with optional pagination
app.get("/actor/list", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedActors = actorList.slice(startIndex, endIndex);
  return res.status(200).send({
    message: "Success",
    actors: paginatedActors,
    total: actorList.length,
  });
});

// Add a new actor
app.post("/actor/add", (req, res) => {
  const newActor = req.body;

  if (!newActor.id || !newActor.name) {
    return res
      .status(400)
      .send({ message: "Please provide both 'id' and 'name'." });
  }

  // Check if actor with the same ID already exists
  const existingActor = actorList.find((actor) => actor.id === newActor.id);
  if (existingActor) {
    return res
      .status(400)
      .send({ message: "Actor with this ID already exists." });
  }

  actorList.push(newActor);
  return res.status(201).send({ message: "Actor added successfully." });
});

// Update an actor
app.put("/actor/update/:id", (req, res) => {
  const actorId = Number(req.params.id);
  const updatedActor = req.body;

  const actorIndex = actorList.findIndex((actor) => actor.id === actorId);

  if (actorIndex === -1) {
    return res.status(404).send({ message: "Actor not found." });
  }

  // Update actor details
  actorList[actorIndex] = { ...actorList[actorIndex], ...updatedActor };
  return res.status(200).send({ message: "Actor updated successfully." });
});

// // Get actor by ID
// app.get("/actor/detail/:id", (req, res) => {
//   const actorId = Number(req.params.id);
//   const actorDetail = actorList.find((actor) => actor.id === actorId);

//   if (!actorDetail) {
//     return res.status(404).send({ message: "Actor does not exist." });
//   } else {
//     return res.status(200).send({ message: "Success", actorData: actorDetail });
//   }
// });

// // Delete an actor by ID
// app.delete("/actor/delete/:id", (req, res) => {
//   const actorId = Number(req.params.id);

//   const actorIndex = actorList.findIndex((actor) => actor.id === actorId);

//   if (actorIndex === -1) {
//     return res.status(404).send({ message: "Actor not found." });
//   }

//   actorList.splice(actorIndex, 1);
//   return res.status(200).send({ message: "Actor deleted successfully." });
// });

// Filter actors by name substring
app.get("/actor/filter", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .send({ message: "Please provide a name to filter by." });
  }

  const filteredActors = actorList.filter((actor) =>
    actor.name.toLowerCase().includes(name.toLowerCase())
  );

  return res.status(200).send({
    message: "Success",
    actors: filteredActors,
  });
});

// Network port
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
