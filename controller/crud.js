const collection=require("../model/config")

//get

const del=async(req,res)=>{
    try {
       const remove=req.params.id;  //crud operations exclude read
       await collection.findByIdAndDelete(remove)
       res.redirect("/manager/managerDash")
        
    } catch (error) {
        console.log(error)
    }
}

const edit=async(req,res)=>{   // create a page ejs for update
    try {
        const update=req.params.id;
        const user=await collection.findById(update)
        res.render("manager/adminupdate",{user})
                                  
    } catch (error) {
        console.log(error)
    }
}

//post

const editUpdate=async(req,res)=>{
    try {
      const updateEdit=req.params.id
      const user=await collection.findById(updateEdit)
      user.name=req.body.name
      user.email=req.body.email
      user.password=req.body.password
      user.save()
      res.redirect("/manager/managerDash")

    } catch (error) {
        console.log(error)
    }
}


 module.exports={
    del,edit,editUpdate
 }
