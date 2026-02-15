require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function checkConnection() {
    const config = {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE || 'cert_db',
        port: 3306
    };

    console.log('\n🔍 CertiSafe Database Diagnostic Wrapper');
    console.log('----------------------------------------');
    console.log(`📡 Target Host: ${config.host}`);
    console.log(`👤 Target User: ${config.user}`);
    console.log(`📦 Target DB:   ${config.database}`);
    console.log(`🔌 Target Port: ${config.port}`);
    console.log('----------------------------------------');

    try {
        console.log('⏳ Attempting to establish socket connection...');
        const connection = await mysql.createConnection(config);

        console.log('✅ SUCCESS: Database is REACHABLE and authenticated.');

        // Check if required tables exist
        const [tables] = await connection.query('SHOW TABLES');
        const tableNames = tables.map(t => Object.values(t)[0]);

        console.log(`📊 Found ${tableNames.length} tables: ${tableNames.join(', ')}`);

        const coreTables = ['profiles', 'certificates', 'templates', 'users'];
        const missing = coreTables.filter(t => !tableNames.includes(t));

        if (missing.length > 0) {
            console.log(`⚠️  WARNING: Missing core tables: ${missing.join(', ')}`);
            console.log('💡 TIP: Run "node scripts/add-auth-tables.js" and "node migrate-db.js"');
        } else {
            console.log('✅ VERIFIED: All core institutional tables are present.');
        }

        await connection.end();
        console.log('----------------------------------------');
        console.log('🚀 SYSTEM STATUS: READY TO ISSUE CREDENTIALS\n');
        process.exit(0);

    } catch (err) {
        console.log('\n❌ ERROR: Connection Refused (ECONNREFUSED)');
        console.log('----------------------------------------');
        console.log(`Message: ${err.message}`);
        console.log(`Code:    ${err.code}`);

        if (err.code === 'ECONNREFUSED') {
            console.log('\n💡 TROUBLESHOOTING STEPS:');
            console.log('1. Is MySQL Server running? (Check XAMPP/WAMP/Docker/Services.msc)');
            console.log('2. Is it running on the default port 3306?');
            console.log('3. Are your credentials in .env.local correct?');
            if (config.host === 'localhost' || config.host === '127.0.0.1') {
                console.log('\n⚠️  SECURITY NOTE: If you are seeing this on VERCEL, you CANNOT use "localhost".');
                console.log('You must use a hosted database (e.g., Railway, Aiven, or TidyDB) and set Vercel Environment Variables.');
            }
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\n💡 TROUBLESHOOTING STEPS:');
            console.log('1. The password for user "' + config.user + '" is incorrect.');
            console.log('2. Check MYSQL_PASSWORD in .env.local.');
        } else if (err.code === 'ER_BAD_DB_ERROR') {
            console.log('\n💡 TROUBLESHOOTING STEPS:');
            console.log('1. Database "' + config.database + '" does not exist.');
            console.log('2. Run "CREATE DATABASE ' + config.database + ';" in your MySQL terminal.');
        }

        process.exit(1);
    }
}

checkConnection();
