const {Users} = require("../model/user.model");

const handleUserDetailsController = async (req, res) => {
    try{
        const body = req.body;
        if(!body.UserName || !body.EmailId || !body.PhoneNumber){
            return res.status(400).json({Message: "Required fields are missing", Success: false});
        }

        const userAdd = await Users.insertOne(body);

        if(userAdd) {
            return res.status(201).json({Message: "Data inserted successfully", Success: true, Id: userAdd?._id});
        }

        console.log(userAdd);
        
    } catch(error){
        return res.status(500).json({Message: error.Message, Success: false});
    }
}

const handleUsersController = async (req, res) => {
    try {
        const userList = await Users.find({});
        return res.status(200).json({Message: "All books fetched successfully", Success: true, totalCount: userList.length, UserList: userList});
    } catch(err) {
        return res.status(400).json({Message: err.message, Success: false});
    }
}

const handleDeleteUserController = async (req, res) => {
    const body = req.body;
    try {
        const deleted = await Users.deleteOne({_id: body.Id})
        if(deleted?.acknowledged) {
            return res.status(200).json({Message: "Deleted successfully", Success: true});
        }
    } catch(err) {
         return res.status(400).json({Message: err.message, Success: false});
    }
}

const handleUpdateUserController = async (req, res) => {
    const body = req.body;
     try {
        const updated = await Users.updateOne({_id: body?.Id}, {$set:body});
        if(updated?.acknowledged) {
            return res.status(200).json({Message: "Updated successfully", Success: true});
        }
    } catch(err) {
         return res.status(400).json({Message: err.message, Success: false});
    }
}

module.exports = {handleUserDetailsController, handleUsersController, handleDeleteUserController, handleUpdateUserController}