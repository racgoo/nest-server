/**
 * DB에 query 날리는 함수
 * @param {string} query DB에 전송할 query문
 * @returns {Promise} 쿼리 결과
 * 에러 발생하면 null값, 성공하면 JSON
*/

const innerQuery = async (conn,query) => {
    return new Promise((resolve,reject)=>{
        conn.query(query, (error, rows, fields) => {
            if (!error) {
                resolve(rows);
            } else {
                resolve(null);
            }
        })
    });
}

const sendQueries = async (queries): Promise<any> => {
    queries = ['START TRANSACTION;',...queries,'COMMIT;'];
    return new Promise((resolve, reject) => {
        let results = [];
        try {
            pool.getConnection(async(err, conn) => {
                if(err){
                    resolve(null);
                    return;
                }
                for(let i =0;i<queries.length;i++){
                    let query = queries[i];
                    let innerQueryResult = await innerQuery(conn,query);
                    if(innerQueryResult){
                        results.push(innerQueryResult);
                    }else{
                        conn.rollback(() => {
                            conn.release();
                        });
                        resolve(null);
                        return true;
                    }
                    if(results.length===queries.length){
                        resolve(results.splice(1,results.length-2));
                    }
                }
            });
        } catch (err) {
            console.log('err')
            resolve(null);
        }
    });
}
export default sendQueries;