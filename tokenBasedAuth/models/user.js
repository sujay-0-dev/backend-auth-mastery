const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        email :{
            type : String,
            required : true,
            unique : true,
            trim : true,
            lowercase: true,
            minlength: 3
        },
        password :{
            type : String,
            required : true,
            minlength : 6
        },
        role :{
            type : String,
            enum : ['user', 'admin'],
            default : 'user'
        }
    },
    {
        timestamps : true
    }
)
exports.User = mongoose.model("User", userSchema);