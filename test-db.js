const { legendDB, geoDB } = require('./Backend/DB/db_config');

async function test() {
    console.log('Testing database connections...');
    
    try {
        await legendDB.query('SELECT 1');
        console.log('SUCCESS: Main database connected');
        
        await geoDB.query('SELECT 1');
        console.log('SUCCESS: Geocoding database connected');
        
        const [users] = await legendDB.query('SELECT COUNT(*) as count FROM users');
        console.log('Users count: ' + users[0].count);
        
        const [tables] = await geoDB.query('SHOW TABLES');
        console.log('Tables count: ' + tables.length);
        
    } catch (err) {
        console.error('ERROR:', err.message);
    }
}

test();
