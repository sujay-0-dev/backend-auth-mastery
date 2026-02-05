const bcrypt = require("bcryptjs");
const { User } = require("../models/user");

const seedAdminUser = async () => {
    try {
        try {
            const indexes = await User.collection.getIndexes();
            if (indexes.username_1) {
                await User.collection.dropIndex("username_1");
                console.log("✓ Dropped old username index");
            }
        } catch (err) {
            // Index doesn't exist, continue
        }

        const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
        const adminFullname = process.env.ADMIN_FULLNAME || "Admin User";

        const existingAdmin = await User.findOne({ email: adminEmail });

        const hashedPassword = await bcrypt.hash(adminPassword, 12);
        const admin = await User.create({
            fullname: adminFullname,
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

    } catch (error) {
        console.error("Error seeding admin user:", error.message);
    }
};

module.exports = seedAdminUser;
