

const managerModel=require("../model/config")

const manager={
    username:"admin@gmail.com",
    password:"admin@123"
}

const managerGet=(req,res)=>{
    try {
        res.render("manager/managerLogin")
       
    } catch (error) {
       console.log(error) 
    }
}
const managerDash=(req,res)=>{
    try {
        res.render("manager/dash")
    } catch (error) {
        
    }
}
const managerPost=(req,res)=>{
    try {
        if(manager.username===req.body.email&&manager.password===req.body.password){
            res.redirect("/manager/managerFront")
        }
        else{
            res.redirect("/manager")
        }
    } catch (error) {
        console.log(error)
    }
}
const managerFront=(req,res)=>{
    try {
        res.render("manager/managerFront")
    } catch (error) {
       console.log(error) 
    }
}

const dash = async (req, res) => {
    try {
        const search = req.query.search || ""; // we use query instead of body because we use get method on the form
        const user = await managerModel.find({
            name: { $regex: search, $options: 'i' } // regex is used for search, option: caseInsensitive
        });
        res.render("manager/dash", { user, search });
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports={
    managerGet,managerDash,managerPost,dash,managerFront
}