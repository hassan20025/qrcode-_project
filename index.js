import qr from 'qr-image';
import inquirer from 'inquirer';
import fs from 'fs';
import express from 'express';
import bodyparser from 'body-parser';


const app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));


app.listen(3000,()=>{
  console.log('Server is running on port 3000');
});


app.get('/', (req, res) =>{
  res.render("index.ejs");
});

app.post("/submit",(req,res)=>{
  
  const url = req.body.URL;
  const qr_svg = qr.image(url, { type: 'png' });
  qr_svg.pipe(fs.createWriteStream('./public/url.png'));
  res.render("index.ejs",{
    message: "QR Code Generated",
    imageUrl: '/url.png',
  });

});
