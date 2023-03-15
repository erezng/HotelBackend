import { Router } from 'express';
import _, { filter, result } from "underscore";
import { Flight } from '../db/models/flightModel.js';

const router=Router()
router.post("/addflight",(req,res)=>{
    const body=_.pick(
        req.body,
        "from",
        "dst",
        "price"
    )
    new Flight(body)
    .save()
    .then((result)=>res.json({message:JSON. stringify(result)}))
    .catch((e)=>res.json({error:`${e}`}))
})
router.get("/search:key",async(req,res)=>{
    const result=await Flight.find({
        $or: [{ name: { $regex: req.params.key, $options: "i" } }],
    })
    res.json(result)
})

router.get("/flight:_id",(req,res)=>{
    const id=req.params._id;
    Flight.findOne({_id:id})
    .then((result)=>res.json(result))
    .catch((e)=>res.json({error:`${e}`}))
})
router.delete("/delete/:id",(req,res)=>{
    Flight.deleteOne({_id: req.params.id})
    .then((result)=>res.json(result))
    .catch((e)=>res.json({error:`${e}`}));
})
router.put("/update/:id",async(req,res)=>{
    const result=await Flight.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
})
export {router as flightRouter}