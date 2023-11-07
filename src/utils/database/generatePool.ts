import { Pool, createPool } from "mysql2";

//my.cnf 이거 utc로 변경해줘야함 DB에서
//나는 UTC DB 쓸거임

const generatePool = (): Pool  => {
    let pool: Pool= createPool({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
        connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT),
        timezone: 'utc',
        waitForConnections: true,
        dateStrings: ['DATE']
    });    
    return pool;
}

export default generatePool;