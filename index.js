const express = require("express");
const con = require("./config");

const app = express();
app.use(express.json());

// GET method
app.get("/", (req, resp) => {
  con.query("select * from users", (err, result) => {
    if (err) { resp.send("error in api") }
    else { resp.send(result) }
  })
});

// POST method
app.post("/",(req,resp)=>{
    const data=req.body;
    con.query("INSERT INTO users SET?",data,(error,results,fields)=>{
      if(error) throw error;
      resp.send(results)
    })
  });

// PUT method
app.put("/:id",(req,resp)=>{
    const data= [req.body.name,req.body.password,req.body.user_type,req.params.id];
    con.query("UPDATE users SET name = ?, password = ?, user_type = ? WHERE id = ?",
    data,(error,results,fields)=>{
      if(error) throw error;
      resp.send(results)
    })
   
  });

// DELETE method
app.delete("/:id", (req, resp) => {
  const userId = req.params.id;
  con.query("DELETE FROM users WHERE id = ?", userId, (error, results, fields) => {
    if (error) throw error;
    resp.send(results);
  });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
