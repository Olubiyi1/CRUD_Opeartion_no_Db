import express from "express";
const food = [
  { id: 1, name: "Rice", category: "Grain", price: 200 },
  { id: 2, name: "Beans", category: "Legume", price: 150 },
  { id: 3, name: "Chicken", category: "Protein", price: 1200 },
  { id: 4, name: "Broccoli", category: "Vegetable", price: 400 },
  { id: 5, name: "Apple", category: "Fruit", price: 300 },
  { id: 6, name: "Yam", category: "Root", price: 250 },
  { id: 7, name: "Fish", category: "Protein", price: 1000 },
  { id: 8, name: "Carrot", category: "Vegetable", price: 200 },
  { id: 9, name: "Wheat", category: "Grain", price: 180 },
  { id: 10, name: "Lentils", category: "Legume", price: 220 },
];

const router = express.Router();

// all foof
router.get("/", (req, res) => {
  res.send(food);
});

// get a single food
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

// crete a new item
router.post("/", (req, res) => {
  const {name,price} = req.body;

  if(!name || !price){
    return res.status(400).json({
      message: "name and type required"
    })
  }

  const newItem = {id:food.length + 1, name,price}
  food.push(newItem)

  res.status(201).json({
    message:"item created successfully",
    data:newItem
  })
});

// to filter by category

router.get("/",(req,res)=>{
  const {category} = req.query
  let filteredFood = food
  if(category){
    filteredFood = food.filter(item=>item.category?.toLowerCase() === category.toLowerCase())
    
  }
  res.status(200).json(filteredFood)
})

// to update
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
