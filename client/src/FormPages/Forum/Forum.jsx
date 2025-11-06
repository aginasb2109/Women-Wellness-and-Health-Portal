import {useState} from 'react';
import { Box, Card, TextField, Button, Typography } from "@mui/material";
import "./Forum.css";
import NavBar from '../../Pages/Components/NavBar/NavBar';
import Footer from '../../Pages/Components/Footer/Footer';
import toast from "react-hot-toast";
import axios from "axios";


const Forum = (props) => {
  const[name, setName]=useState("");
  const[emailid, setEmailId]=useState("");
  const[phoneno, setPhoneno]=useState("");
  const[address, setAddress]=useState("");
  const[age, setAge]=useState("");
  const[gender, setGender]=useState("");
  const[content, setContent]=useState("");


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{

      const response = await axios.post(
  "http://localhost:8080/user/api/forum",
  {},
  {
    params: { 
      emailId: emailid,   
      name: name,
      phoneNo: phoneno,   
      address: address,
      content: content,
      age:age,
      gender:gender,
    },
  }
);
      
      if(response.status===200){
        toast.success("submitted successfully");
        setName("");
        setEmailId("");
        setPhoneno("");
        setAddress("")
        setContent("");
      }
      else{
        toast.error("Error in submitting!")
      }

    }
    catch(err){
      console.log(err);
      toast.error("Error in Submitting !");
    }
  }
 
  return (
    <div className="forum">
      <NavBar />
      <div className="forum-wrapper">
      
      <form onSubmit={handleSubmit}>
        <div className="forum-content">
          
          <Box>
            <Card className="content-forum">
              <Typography variant="h4" className="forum-title">
               {props.title}
              </Typography>

              <TextField label="Email Id" variant="outlined" className="forum-input" fullWidth  onChange={(e)=>{setEmailId(e.target.value)}} value={emailid}/>
              <TextField label="Name" variant="outlined" className="forum-input" fullWidth  onChange={(e)=>{setName(e.target.value)}} value={name}/> 
              <TextField label="Phone number" variant="outlined" className="forum-input" fullWidth  onChange={(e)=>{setPhoneno(e.target.value)}}  value={phoneno}/> 
              <TextField label="Address" variant="outlined" className="forum-input" fullWidth   onChange={(e)=>{setAddress(e.target.value)}}  value={address}/>
                <TextField label="Age" variant="outlined" className="forum-input" fullWidth   onChange={(e)=>{setAge(e.target.value)}}  value={age}/>
                  <TextField label="Gender" variant="outlined" className="forum-input" fullWidth   onChange={(e)=>{setGender(e.target.value)}}  value={gender}/>

              <TextField
                label={props.label}
                variant="outlined"
                className="forum-input"
                multiline
                rows={5}
                fullWidth
                 onChange={(e)=>{setContent(e.target.value)}}
                 value={content}
              />

              <Button type="submit" variant="contained" className="forum-btn">
                Submit
              </Button>
            </Card>
          </Box>
        </div>
      </form>
    </div>
    <Footer />
    </div>
  )
}

export default Forum;
