import { useState, useContext } from 'react';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { con2 } from './App';

export function Teacher() {
  const [Teacherdata, setTeacherdata] = useContext(con2);
  const styles3 ={
    display: Teacherdata.length === 0 ? 'block' : 'none'
  }
  return (<div className='student_con'>
      <h2 style={styles3} className='empty'>Teachers details is empty</h2>
    {Teacherdata.map((nm, index) => (<Teacherslist key={index} index={index} data={nm} />))}
    
  </div>);
}
function Teacherslist({ data, delt, index }) {
  const [Teacherdata, setTeacherdata] = useContext(con2);
  const navigate = useNavigate();
  const [teacherdata, setteacherdata] = useState();
  const [rollldata, setrolldata] = useState();
  const [gender, setgender] = useState();
  const [fill, setfill] = useState(false);
  const deltClick = (index) => {
    Teacherdata.splice(index, 1);
    navigate("/");

  };
  const editdata = (index) => {
    if (teacherdata !== undefined && rollldata !== undefined) {
      if (teacherdata !== undefined) {
        const teacher = {
          rollnumber: rollldata,
          name: teacherdata,
          gender: gender,
        };
        Teacherdata.splice(index, 1, teacher);
        setteacheredit(false);
        setfill(false);
      } else {
        setfill(true);
      }
    } else {
      setfill(true);
    }
  };
  const [teacheredited, setteacheredit] = useState(false);
  const EditClick = (index) => {
    // console.log("editClick")
    // console.log(index)
    setteacheredit(true);

  };
  const rbgval = () => {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 2) + 1;
    return `rgb(${r},${g},${b})`;
  };
  const styles = {
    borderTop: `10px solid ${rbgval()}`,
  };
 
  return ( 
    <div style={styles} className='student_card'>
      <CardContent sx={{
        padding: "5px",
      }}>
        {teacheredited ? <div>
          <TextField type="number" error={fill} helperText={fill ? "fill the area" : null} onChange={(ee) => setrolldata(ee.target.value)} id="standard-basic" label="Standard" variant="standard" defaultValue={data.rollnumber} />
          <TextField type="text" error={fill} helperText={fill ? "fill the area" : null} onChange={(eex) => setteacherdata(eex.target.value)} id="standard-basic" label="Standard" variant="standard" defaultValue={data.name} />
          <div>

            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={data.gender}
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
          <div className='addstu_name'> <DoneIcon onClick={() => editdata(index)} /> <Button onClick={() => setteacheredit(false)}>Back</Button> </div>

        </div> : <span>
          <h2 className='student_list_title'>{Teacherdata[index].name}</h2>
          <h4 className='student_list_title'>{Teacherdata[index].gender}</h4>
          <h4 className='student_list_title'>{Teacherdata[index].rollnumber}</h4>
          <div className='dlet_container'><DeleteIcon onClick={() => deltClick(index)} /><EditIcon onClick={() => EditClick(index)} sx={{}} /></div>
        </span>}


      </CardContent>
    </div>

  );
}
