const express = require('express')
const router = express.Router()
const con = require('../Database/db.js')
const jwt = require('jsonwebtoken');

router.post('/insurance',(req,res)=>{
    console.log(req.body.plan)
    console.log(req.body.id)
    const {id,plan,token} = req.body;
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) return res.json({ Status: false, Error: "Wrong Token" });
        const email = decoded.email;
        
        const sql = "SELECT * FROM insurance_bought WHERE plan = ? AND id=? AND token=?";
  con.query(sql, [plan,id,email], (err, result) => {
    if (err) return res.status(500).json({ "message": "query error occurred","status":false });
    if (result.length > 0) {
    res.status(200).json({"message":"Already the plan have been booked","status":false})
    }
    else{
         const sql = `INSERT INTO insurance_bought (id,plan,token) VALUES(?,?,?)`;
         con.query(sql,[id,plan,email],(err,result)=>{
            if(!err)
            return res.status(200).json({"message":"successfully subscribed","status":true})
         })
    }
  })
    
        });
    
})

router.post('/profile',(req,res)=>{
    const{token}=req.body;

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) return res.json({ Status: false, Error: "Wrong Token" });
        const email = decoded.email;
        console.log(email)
    const sql = "SELECT * FROM insurance_bought WHERE token=?";
     con.query(sql,[email],(err,result)=>{
     if (err) return res.status(500).json({ "message": "query error occurred","status":false });
    if (result.length > 0)
          res.status(200).send(result)
    else
         res.status(200).json({"message":"No Insurance plan is Bought"})    
     })
        });
     
})

router.post('/user-data', (req, res) => {
    const { token } = req.body;
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) return res.json({ Status: false, Error: "Wrong Token" });
        const email = decoded.email;

        const sql = "SELECT name, age, email FROM user WHERE email=?";
        con.query(sql, [email], (err, result) => {
            if (err) return res.status(500).json({ "message": "query error occurred", "status": false });
            if (result.length > 0) {
                const userData = result[0];
                res.status(200).json(userData);
            } else {
                res.status(404).json({ "message": "User not found" });
            }
        });
    });
});


router.post('/claim', (req, res) => {
    const { id, plan, token } = req.body;  

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) return res.json({ Status: false, Error: "Wrong Token" });
        const email = decoded.email;
        
        const sql ="SELECT claimed FROM insurance_bought WHERE id=? AND plan =? and token =?"
    con.query(sql,[id,plan,email],(err,result)=>{
        if(result.claimed == 1)
          res.status(200).json({message:"Already Claimed",status:false})
        else{
          const sql = "UPDATE insurance_bought SET claimed = 1 WHERE id = ? AND plan = ? AND token = ?";
    con.query(sql, [id, plan, email], (err, result) => {
        if (err) {
            console.error('Error updating claimed status:', err);
            return res.status(500).json({ message: "Error updating claimed status", status: false });
        }
        res.status(200).json({ message: "Claimed status updated successfully", status: true });
    });
        }
    })
        });
    
    
});




module.exports = router;