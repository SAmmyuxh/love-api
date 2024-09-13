import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname,join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port =3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.get("/",(req,res)=>{
    res.render("index.ejs",{content1:"",content2:""});
});
app.post("/calculate", async (req,res)=>{
    const a = req.body.fname;
    const b = req.body.sname;
    try{
      const result = await axios.get("https://love-calculator.p.rapidapi.com/getPercentage",
     {
       params:{
        fname:a,
        sname:b
       },
       headers:{
        'X-RapidAPI-Key': '66b404ddd5msh138ae17ca6f3e28p12aa19jsnc1578ac38928',
        'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
       }
     });
  const response1 = result.data.percentage;
  const response2 = result.data.result;
     res.render("index.ejs",{content1:response1,content2:response2});
    }catch(error){
       res.render("index.ejs",{content1:"Failed to load your Request",content2:"bjhv "});
       console.log(error.message);
    }
  
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });