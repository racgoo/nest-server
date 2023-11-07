/**
 * DB에 query 날리는 함수
 * @param {string} query DB에 전송할 query문
 * @returns {Promise} 쿼리 결과
 * 에러 발생하면 null값, 성공하면 JSON
*/

const sendQuery = async (query) => {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((err, conn) => {
                if (!err) {
                    conn.query(query, (error, rows, fields) => {
                        conn.release();
                        if (!error) {
                            resolve(rows);
                        } else {
                            resolve(null);
                        }
                    })

                } else {
                    resolve(null);
                }
            });
        } catch (err) {
            resolve(null);
        }
    });
}
export default sendQuery;