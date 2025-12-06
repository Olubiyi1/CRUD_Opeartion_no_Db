import express from "express"
import foodRouter from "./food/food.route.js"
const app = express()

const port = 3030

app.use(express.json())
app.use("/v1/foods",foodRouter)

app.listen(port,(req,res)=>{
    console.log(`app listening on port ${port}`);
    console.log(`localhost:${port}`);
})