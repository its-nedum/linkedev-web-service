import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    skills: String,
    yearsOfExperience: Number,
    bio: String,
    status: Number,
},
{
    timestamps: true,
});

const Users = mongoose.model("users", UserSchema);

export default Users;