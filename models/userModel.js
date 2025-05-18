import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Provide Name"]
    },
    password : {
        type: String,
        required: [true, "Provide Password"]
    },
    avatar : {
        type: String,
        default : ""
    },
    phone : {
        type: String,
        required : [true, "Provide Phone"],
        unique : true
    },
    refresh_token : {
        type: String,
        default : ""
    },
    role : {
        type: String,
        enum : ['ADMIN', 'USER'],
        default : "USER"
    }
}, {
    timestamps : true
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel