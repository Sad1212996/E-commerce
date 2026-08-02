import UserModel from "../models/user.model.js";

const admin = async (request, response, next) => {
    try {
        const userId = request.userId;

        if (!userId) {
            return response.status(401).json({
                message: "Unauthorized access. User ID not found.",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return response.status(404).json({
                message: "User not found.",
                error: true,
                success: false
            });
        }

        if (user.role !== "ADMIN") {
            return response.status(403).json({
                message: "Permission denied. Only Admin can perform this action.",
                error: true,
                success: false
            });
        }

        next();
    } catch (error) {
        return response.status(500).json({
            message: error.message || "Admin authorization error.",
            error: true,
            success: false
        });
    }
};

export default admin;
