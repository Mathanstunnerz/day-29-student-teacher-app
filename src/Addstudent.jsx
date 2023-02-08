import { useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const API = 'https://63d75fd7afbba6b7c93bed4b.mockapi.io/matedata'
export function Addstudent({ setstudentdata, studentdata,title,id}) {
  const navigate = useNavigate();
  const [studentname, setstudentname] = useState();
  const [rollnum, setrollnum] = useState();
  const [gender1, setgender] = useState();
  const [visible, setvisible] = useState(false);
  const [fill, setfill] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    if (rollnum !== undefined && studentname !== undefined && gender1 !== undefined) {

      if (studentname !== undefined) {

        if (rollnum !== '' && studentname !== '' && gender1 !== '') {
          if (studentname !== '') {
            const student = {
             
                rollnumber: rollnum,
                name: studentname,
                gender: gender1
            
             };
     
             await fetch(`${API}`,{
                method: 'POST',
                body: JSON.stringify(student),
                headers: { 'Content-Type': 'application/json' }
              })
              navigate("/");
             
           
            setvisible(false);
            setfill(false);
            setstudentname('');
            setrollnum('');
          } else {
            setfill(true);
          }
        }
        else {
          setfill(true);
        }
      }

      else {
        setfill(true);
      }

    } else {
      setfill(true);
    }

  };
  const styles = {
    display: visible ? "flex" : "none",
   
  };
  return (
    <div className='addstudent_container'>
      {visible? <Button onClick={()=>setvisible(false)}><CloseIcon  /> </Button> : null}
      <h2 className='addstu_name'>{title}{visible ?null : <Button variant="outlined" onClick={() => setvisible(true)}>Add</Button>}</h2>
      <form className='addstudent_input' style={styles} onSubmit={submit}>
        <TextField error={fill} helperText={fill ? "fill the area" : null} defaultValue={rollnum} type="number" onChange={(mm) => setrollnum(mm.target.value)} id="outlined-basic" label="Roll number" variant="outlined" />
        <TextField error={fill} helperText={fill ? "fill the name" : null} defaultValue={studentname} type="text" onChange={(mm) => setstudentname(mm.target.value)} id="outlined-basic" label="Name" variant="outlined" />
        <div>

          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{
              display: "flex"
            }}
            onChange={(value) => setgender(value.target._wrapperState.initialValue)}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>


        </div>

        <Button type='submit' variant="outlined">submit</Button>
      </form>
    </div>
  );
}
