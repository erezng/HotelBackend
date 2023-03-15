import { Router } from 'express';
import _, { filter, result } from "underscore";
import { Taxi } from '../db/models/taxiModel.js';
const router=Router();
router.post("/addtaxi",(req,res)=>{
    const body=_.pick(
        req.body,
        "from",
        "dts",
        "price"
    )
    new Taxi(body)
    .save()
    .then((result)=>res.json({meddage:JSON.stringify(result)}))
    .catch((e)=>res.json({error:`${e}`}))
})
router.get("/search:key",async(req,res)=>{
    const result=await Taxi.find({
        $or:[{name:{$regex:req.params.key,$options:"i"}}]
    })
    res.json(result)
})
router.get("/taxi:_id",(req,res)=>{
    const id=req.params._id;
    Taxi.findOne({_id:id})
    .then((result)=>res.json(result))
    .catch((e)=>res.json({error:`${e}`}))
})
router.put("/update/:id",async(req,res)=>{
    const result=await Taxi.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
})
export {router as taxiRouter}