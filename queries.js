const Pool = require('pg').Pool;
const pg = require('pg');

const PASSWORD = process.env.PASSWORD;
const USER = process.env.USER;

const pool = new Pool({
    connectionString: `postgresql://${USER}:${PASSWORD}@database-1.c1tqv80zdey2.us-east-2.rds.amazonaws.com:5432/tcit`
});


const getAllPosts = (request, response) => {
    pool.query('SELECT * FROM posts', (error, results) => {
        if (error) {
            
            res.status(500).json({msg: 'Something wrong happened.'});
        }
        response.status(200).json(results.rows);
    });
};


const createPost = (request, response) => {
    const { name, description } = request.body;
    pool.query('INSERT INTO posts (name, description) VALUES ( $1, $2 ) RETURNING id',
        [name, description],
        (error, results) => {
            if (error) {
                res.status(500).json({msg: 'Something wrong happened.'});
            }
            response.status(201).json({ id: results.rows[0].id, name: name, description: description });
        }
    );
};

const deletePost = (request, response) => {
    const id = parseInt(request.params.id);
    let post = {};
    pool.query(`SELECT * FROM posts WHERE id = ${id}`,(error, results)=>{
        if(results.rows[0]){
            post = results.rows[0];
            pool.query(`DELETE FROM posts WHERE id = ${id}`,(error, results)=>{
                if(error){
                    response.status(500).json({msg: 'can not perform a delete action.'});
                }else{
                    response.status(202).json({deleted: post})
                }
            });
        }else{
             response.json({msg: 'post does not exists.'}); 
        }
    });
}


module.exports = {
    getAllPosts,
    createPost,
    deletePost
}