import express from "express";

let food = [{ id: 1, name: "jide" }];

const router = express.Router();

router.get("/", (req, res) => {
  res.send(food);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const item = food.find((item) => {
    return item.id === parseInt(id);
  });

  if (!item) {
    return res.status(404).json({ message: "item not found" });
  }
  res.send(item);
});

router.post("/", (req, res) => {
  res.send("post route active");
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const index = food.findIndex(item=> item.id === parseInt(id))

  if(index === -1){
    return res.status(404).json({message: "item not found"})
  }
  const updatedItem = {...food[index],...body}
  food[index] = updatedItem
  res.status(200).json({
    message : "item updated successfully",
    data:food[index]
  })
});

router.delete("/:id", (req, res) => {
  const {id} = req.params

  const index = food.findIndex(item => item.id === parseInt(id))

  if(index === -1){
    return res.status(404).json({
      message:"item not found"
    })
  }
     const deletedItem = food.splice(index,1)
     res.status(200).json({
      message:"item deleted successfully",
      deleted:deletedItem[0]
     })

})

export default router;
