// const table=require("../model/waiterTable")



// const isOccupied=async (req,res)=>{
//     try {
//         const id=req.params.id
//         const check= await table.findOne({_id:req.params.id})
//         if(check.isOccupied==true){
//             await table.findByIdAndUpdate(id,{isOccupied: false})
//             res.redirect('/waiter/dash')
//         }else{
//             await table.findByIdAndUpdate(id,{isOccupied: true})
//             res.redirect('/waiter/dash')  
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports={
//     isOccupied
// }


const table=require("../model/waiterTable")



const isOccupied=async (req,res)=>{
    try {
        const id=req.params.id
        const check= await table.findOne({_id:req.params.id})
        if(check.isOccupied==true){
            await table.findByIdAndUpdate(id,{isOccupied: false})
            res.redirect('/waiter/dash')
        }else{
            await table.findByIdAndUpdate(id,{isOccupied: true})
            res.redirect('/waiter/dash')  
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    isOccupied
}