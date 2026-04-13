const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("📡 Connected to MongoDB...");

        // Find the user with role Admin
        const admin = await User.findOne({ role: 'Admin' });

        if (!admin) {
            console.log("❌ No Admin user found in the database.");
            process.exit();
        }

        console.log(`👤 Found Admin: ${admin.email}`);
        
        // Update password
        const newPassword = 'Admin@123'; // Aap ise change kar sakte hain
        admin.password = newPassword;
        
        await admin.save();
        
        console.log("✅ Admin password has been reset successfully!");
        console.log("📧 Email:", admin.email);
        console.log("🔑 New Password:", newPassword);
        
        process.exit();
    } catch (err) {
        console.error("❌ Error resetting password:", err);
        process.exit(1);
    }
};

resetAdmin();
