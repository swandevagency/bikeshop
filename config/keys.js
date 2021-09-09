const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

module.exports = {
    port: process.env.PORT || 5000,
    dbName: process.env.DB_NAME || "market",
    corsOpts: process.env.CORS_OPTS || {
        origin: '*',
        methods: '*',
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'index'
        ]
    },
    adminToken: process.env.JWT_ADMIN_SECRET || 'admin-token',
    userToken: process.env.JWT_USER_SECRET || 'user-token',
    adminCheck: async () => {
        const Admin = mongoose.model('Admin')
        const isAdmin = (await Admin.find()).length
        if (isAdmin <= 0) {
            const password = await bcrypt.hash('admin', 10)
            const admin = new Admin({ userName: 'admin', password })
            admin.save()
            return console.log('admin created.');
        }
    }
}