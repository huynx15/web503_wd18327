import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: "member"
    }
}, {
    collection: 'users',
    versionKey: false,
    timestamps: true
});
const Users = mongoose.model('Users', userSchema);
export default Users;