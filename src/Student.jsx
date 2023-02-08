import { useState, useContext,useEffect} from 'react';
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
import { con } from './App';
const API = 'https://63d75fd7afbba6b7c93bed4b.mockapi.io/matedata'
export function Student() {

  const [studentdata, setstudentdata] = useContext(con);
  useEffect(()=>{ callback()},[])
 const callback= ()=>{

    fetch(`${API}`,{
     method: 'GET',
    })
   .then((res) => res.json())
   .then((data) =>{ setstudentdata(data)
   })

 }

  return (<div className='student_con'>
    <table className='student_card'>
    <tbody>
    <tr  className='tr'>
        <td className='td_gender'>Roll No</td>
        <td className='td_name'> Name</td>
        <td className='td_gender'> Gender</td>
        <td className='dlet_container'>Tools</td>
      </tr>
      </tbody>
      </table>
    {studentdata.map((nm, index) => (<Sdutentlist fun={callback}key={index} index={index} data={nm} id={nm.id}/>))}

  </div>);
}
function Sdutentlist({ data, index,id,fun}) {
  const [studentdata, setstudentdata] = useContext(con);

  const navigate = useNavigate();
  const [studata, setstudata] = useState();
  const [rollldata, setrolldata] = useState();
  const [gender, setgender] = useState();
  const [fill, setfill] = useState(false);
  const deltClick = async (id,fun) => {

    
   await fetch(`${API}/${id}`,{
      method: 'DELETE',
    })
    fun()
  };
  const editdata = async(id,fun) => {
 
    if (studata !== undefined && rollldata) {
      if (studata !== undefined) {
        const student = {
          rollnumber: rollldata,
          name: studata,
          gender: gender,
        };
      //  console.log(id)
        await  fetch(`${API}/${id}`,{
            method: 'PUT',
            body: JSON.stringify(student),
            headers: { 'Content-Type': 'application/json' }
          })
          fun()
        setstudentedit(false);
        setfill(false);
      } else {
        setfill(true);
      }
    } else {
      setfill(true);
    }
  };
  const [studentedited, setstudentedit] = useState(false);
  const EditClick = (id) => {
    // console.log("editClick")
    // console.log(index)
 
    setstudentedit(true);

  };
  const rbgval = () => {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 25) + 1;
    const b = Math.floor(Math.random() * 255) + 1;
    return `rgb(${r},${g},${b})`;
  };
  const styles = {
    borderTop: `4px solid ${rbgval()}`,
  };
  return (
    <table  className='student_card'>
      <tbody>
      {/* <CardContent sx={{
        padding: "5px",
      }}> */}
        {studentedited ? <tr>
          <td className='td_gender'><TextField type="number" error={fill} helperText={fill ? "fill the area" : null} onChange={(ee) => setrolldata(ee.target.value)} id="standard-basic" label="Standard" variant="standard" defaultValue={data.rollnumber} /></td> 
          <td className='td_name'> <TextField type="text" error={fill} helperText={fill ? "fill the area" : null} onChange={(eex) => setstudata(eex.target.value)} id="standard-basic" label="Standard" variant="standard" defaultValue={data.name} /></td> 
          <td className='td_gender'>

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


          </td>
          <div className='dlet_container'> <DoneIcon onClick={() => editdata(id,fun)} /> <Button onClick={() => setstudentedit(false)}>Back</Button> </div>

        </tr> : <tr className='tr'>
            <td className='td_gender'>{studentdata[index].rollnumber}</td>
            <td className='td_name'>{studentdata[index].name}</td>    
            <td className='td_gender'>{studentdata[index].gender} </td>  
          
         
          <tr className='dlet_container'><DeleteIcon onClick={() => deltClick(id,fun)} /><EditIcon onClick={() => EditClick(id)} sx={{}} /></tr>
        </tr>}

        {/* </CardContent> */}
        </tbody>
    </table>
  );
}
