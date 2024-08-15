const Waiter = require("../model/waiter");

const del = async (req, res) => {
    try {
        const remove = req.params.id;
        await Waiter.findByIdAndDelete(remove);
        res.redirect("/waiter/waiterDash");
    } catch (error) {
        console.log(error);
    }
};

const edit = async (req, res) => {
    try {
        const update = req.params.id;
        const user = await Waiter.findById(update);
        res.render("waiter/waiterUpdate", { user });
    } catch (error) {
        console.log(error);
    }
};

const editUpdate = async (req, res) => {
    try {
        const updateEdit = req.params.id;
        const user = await Waiter.findById(updateEdit);
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        await user.save();
        res.redirect("/waiter/waiterDash");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    del,
    edit,
    editUpdate,
};
