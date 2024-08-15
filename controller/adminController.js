// const adminCollection = require("../model/config");

// //get
// const admin = (req, res) => {
//     try {
//         res.render("login");
//     } catch (error) {
//         console.log(error);
//     }
// };

// const register = (req, res) => {
//     try {
//         res.render("signup");
//     } catch (error) {
//         console.log(error);
//     }
// };
// //post

// const signup=async(req,res)=>{ // use async to connect with db
//     try {
//         const data={
//             name:req.body.name,
//             email:req.body.email,
//             password:req.body.password
//         };
//         //to check if the user user exists or not
//         const existUser=await adminCollection.findOne({email:data.email});
//         if (existUser){
//             res.send("user already exists");
//         }else{
//             await adminCollection.insertMany(data);
//             res.redirect("/")
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
// //post for login/signin
// const adminPost = async (req, res) => {
//     try {
//         const check = await adminCollection.findOne({ email: req.body.email });
//         if (check) {
//             if (check.password == req.body.password) {
//                 res.redirect('/adminFront');
//             } 
//         } else {
//             res.send("wrong username or password");
//         }
//     } catch (error) {
//         console.log(error);
//     }
    
// };
// const adminFront=(req,res)=>{
//     try {
//         res.render("adminFront")
//     } catch (error) {
//         console.log(error)
//     }
// }
// // search for data


// module.exports={
//     admin,register,signup,adminPost,adminFront
// }



const adminCollection = require("../model/config");

//get
const admin = (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
    }
};

const register = (req, res) => {
    try {
        res.render("signup");
    } catch (error) {
        console.log(error);
    }
};
//post

const signup=async(req,res)=>{ // use async to connect with db
    try {
        const data={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        };
        //to check if the user user exists or not
        const existUser=await adminCollection.findOne({email:data.email});
        if (existUser){
            res.send("user already exists");
        }else{
            await adminCollection.insertMany(data);
            res.redirect("/")
        }
    } catch (error) {
        console.log(error);
    }
}
//post for login/signin
const adminPost = async (req, res) => {
    try {
        const check = await adminCollection.findOne({ email: req.body.email });
        if (check) {
            if (check.password == req.body.password) {
                res.redirect('/sales-report');
            } 
        } else {
            res.send("wrong username or password");
        }
    } catch (error) {
        console.log(error);
    }
    
};
const adminFront=(req,res)=>{
    try {
        res.render("adminFront")
    } catch (error) {
        console.log(error)
    }
}
// search for data


module.exports={
    admin,register,signup,adminPost,adminFront
}