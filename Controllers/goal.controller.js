import Users from "../Models/user.schema.js";

// Add Goal
export const addGoal = async (req, res) => {
    const { title, description, dueDate } = req.body;
    const userId = req.user._id; // Assuming user is authenticated and their ID is available in `req.user`

    try {
        const user = await Users.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        const newGoal = {
            title,
            description,
            dueDate,
            status: "not_started",
            id: Date.now().toString(),
            createdDate: new Date().toISOString()
        };

        user.goals.push(newGoal);
        await user.save();

        return res.status(201).json({
            status: true,
            message: "Goal added successfully",
            goal: newGoal
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

// Update Goal
export const updateGoal = async (req, res) => {
    const { goalId } = req.params; // Get goal ID from URL params
    const { title, description, dueDate, status } = req.body; // Get goal updates from the body
    const userId = req.user._id; // Assuming user is authenticated and their ID is available in `req.user`

    try {
        const user = await Users.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        const goal = user.goals.find(goal => goal.id === goalId)
        if (!goal) {
            return res.status(404).json({
                status: false,
                message: "Goal not found"
            });
        }

        // Update the goal
        goal.title = title || goal.title;
        goal.description = description || goal.description;
        goal.dueDate = dueDate || goal.dueDate;
        goal.status = status || goal.status;

        await user.save();

        return res.status(200).json({
            status: true,
            message: "Goal updated successfully",
            goal
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

// Delete Goal
// Delete Goal
export const deleteGoal = async (req, res) => {
    const { goalId } = req.params; // Get goal ID from URL params
    const userId = req.user._id; // Assuming user is authenticated and their ID is available in `req.user`

    try {
        const user = await Users.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // Filter out the goal from the user's goals array
        const goalIndex = user.goals.findIndex(goal => goal.id === goalId);
        if (goalIndex === -1) {
            return res.status(404).json({
                status: false,
                message: "Goal not found"
            });
        }

        // Remove the goal from the array
        user.goals.splice(goalIndex, 1);
        await user.save(); // Save the updated user document

        return res.status(200).json({
            status: true,
            message: "Goal deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};


// Get All Goals
export const getAllGoals = async (req, res) => {
    const userId = req.user._id; // Assuming user is authenticated and their ID is available in `req.user`

    try {
        const user = await Users.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            status: true,
            goals: user.goals
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

// Get Goal by ID
export const getGoalById = async (req, res) => {
    const { goalId } = req.params; // Get goal ID from URL params
    const userId = req.user._id; // Assuming user is authenticated and their ID is available in `req.user`

    try {
        const user = await Users.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        const goal = user.goals.id(goalId);
        if (!goal) {
            return res.status(404).json({
                status: false,
                message: "Goal not found"
            });
        }

        return res.status(200).json({
            status: true,
            goal
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};
