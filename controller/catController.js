// const category = require("../model/category")

// const getCat = (req, res) => {
//     try {
//         res.render("admin/addCat")
//     } catch (error) {
//         console.log(error)
//     }
// }

// const postCat = async (req, res) => {
//     try {
//         const { name, description } = req.body
//         const check = await category.findOne({ name: name }) // Use findOne to get a single document

//         if (!check) {
//             const newCategory = new category({ name, description })
//             await newCategory.save() // Save the new category to the database
//             res.redirect("/category")
//             console.log("Category added successfully")
//         } else {
//             console.log("Category already exists")
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = {
//     getCat,
//     postCat
// }


const category = require("../model/category")

const getCat = (req, res) => {
    try {
        res.render("admin/addCat")
    } catch (error) {
        console.log(error)
    }
}

const postCat = async (req, res) => {
    try {
        const { name, description } = req.body
        const check = await category.findOne({ name: name }) // Use findOne to get a single document

        if (!check) {
            const newCategory = new category({ name, description })
            await newCategory.save() // Save the new category to the database
            res.redirect("/category")
            console.log("Category added successfully")
        } else {
            console.log("Category already exists")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCat,
    postCat
}
