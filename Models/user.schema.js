import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user'],
        default: "user"
    },
    activationStatus: {
        type: Boolean,
        default: false
    },
    verificationString: {
        type: String,
        default: null
    },
    expiryTime: {
        type: Number,
        default: undefined // or specify a default timestamp if needed
    },
    goals: [{  // Array of objects
        createdDate: {
            type: Date,
            default: Date.now  // Default to the current date and time
        },
        description: {
            type: String,
            required: true
        },
        dueDate: {
            type: String,  // Format: MM/DD/YY
            required: true
        },
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'completed','not_started'],
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }]
});

// Create a Mongoose model named 'Users' based on the userSchema
const Users = mongoose.model("Users", userSchema);

export default Users;
