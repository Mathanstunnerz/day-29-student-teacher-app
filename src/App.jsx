import { useState,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import {  useContext } from 'react';
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
import './App.css'
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { Routes, Route, Link } from "react-router-dom";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {createContext} from 'react'
import { Content } from './Content';
import { Student } from './Student';
import { Teacher } from './Teacher';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
export const con = createContext()
export const con2 = createContext()
export const con3 = createContext()

function App() {
  const [count, setCount] = useState(0)


  const [studentdata, setstudentdata] = useState([])
  const [Teacherdata,setTeacherdata] = useState([])
  const [Employeedata,setEmployeedata] = useState([])


  const styles2 ={
    display: studentdata.length === 0 ? 'block' : 'none'
  }
  return (
  
    <div className="App">

      <Navbar />

     
     {/* <h2 style={styles2} className='empty'>Students details is empty</h2> */}
     <con.Provider value={[studentdata, setstudentdata]} >
     <con2.Provider value={[Teacherdata,setTeacherdata] } >
     <con3.Provider value={[Employeedata,setEmployeedata] } >
      <Routes>
        <Route path="/" element={ <Student/>} />
        <Route path="Student" element={<Content />} />
        <Route path="Teacher" element={<Teacher/>} />
        <Route path="Employe" element={<Employe/>} />
      </Routes>
      </con3.Provider>
      </con2.Provider>
      </con.Provider>
    </div>
 
  )
}
function Employe(){
  const [Employeedata,setEmployeedata] = useContext(con3);
  const styles3 ={
    display: Employeedata.length === 0 ? 'block' : 'none'
  }
  return(<div className='student_con'>
  <h2 style={styles3} className='empty'>Employe details is empty</h2>
{Employeedata.map((nm, index) => (<Employelist key={index} index={index} data={nm} />))}

</div>);
}
function Employelist({ data, delt, index }){
  const [Employeedata,setEmployeedata] = useContext(con3);
  const navigate = useNavigate();
  const [employedata, setemployedata] = useState();
  const [rollldata, setrolldata] = useState();
  const [gender, setgender] = useState();
  const [fill, setfill] = useState(false);
  const deltClick = (index) => {
    Employeedata.splice(index, 1);
    navigate("/");

  };
  const editdata = (index) => {
    if (employedata !== undefined && rollldata !== undefined) {
      if (employedata !== undefined) {
        const employe = {
          rollnumber: rollldata,
          name: employedata,
          gender: gender,
        };
        Employeedata.splice(index, 1, employe);
        setemployeedited(false);
        setfill(false);
      } else {
        setfill(true);
      }
    } else {
      setfill(true);
    }
  };
  const [employeedited, setemployeedited] = useState(false);
  const EditClick = (index) => {
    // console.log("editClick")
    // console.log(index)
    setemployeedited(true);

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
  return(
    <div style={styles} className='student_card'>
      <CardContent sx={{
        padding: "5px",
      }}>
        {employeedited? <div>
          <TextField type="number" error={fill} helperText={fill ? "fill the area" : null} onChange={(ee) => setrolldata(ee.target.value)} id="standard-basic" label="Standard" variant="standard" defaultValue={data.rollnumber} />
          <TextField type="text" error={fill} helperText={fill ? "fill the area" : null} onChange={(eex) => setemployedata(eex.target.value)} id="standard-basic" label="Standard" variant="standard" defaultValue={data.name} />
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
          <div className='addstu_name'> <DoneIcon onClick={() => editdata(index)} /> <Button onClick={() => setemployeedited(false)}>Back</Button> </div>

        </div> : <span>
          <h2 className='student_list_title'>{Employeedata[index].name}</h2>
          <h4 className='student_list_title'>{Employeedata[index].gender}</h4>
          <h4 className='student_list_title'>{Employeedata[index].rollnumber}</h4>
          <div className='dlet_container'><DeleteIcon onClick={() => deltClick(index)} /><EditIcon onClick={() => EditClick(index)} sx={{}} /></div>
        </span>}


      </CardContent>
    </div>
  )
}
function Navbar(){
  const navigate = useNavigate()
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  return(
    <div className='navcontain'>
    <div className='navbarcontainer'>
      <div className='school_title'>
      <h1 className='logotext'>Dhee</h1>
      <h5 className='logotext'>public school</h5>
      </div>
       <div className='screachbar'>
       <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </div> 
    </div>
    <div className='Router_container'>
    <div onClick={()=>navigate("/")}className='router_title'>Home          </div>
    <div onClick={()=>navigate("Student")}className='router_title'>Add Student </div>
    {/* <div onClick={()=>navigate("Teacher")}className='router_title'>Teacher       </div>
    <div onClick={()=>navigate("Employe")}className='router_title'>Employee      </div> */}
    </div>
    </div>
  )
}
export default App
