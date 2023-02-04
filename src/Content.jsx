import { useContext } from 'react';
import { School } from './School';
import * as React from 'react';
import { Addstudent } from './Addstudent';
import { con, con2, con3 } from './App';

export function Content() {
  const [studentdata, setstudentdata] = useContext(con);
  const [Teacherdata, setTeacherdata] = useContext(con2);
  const [Employeedata, setEmployeedata] = useContext(con3);
  // console.log("TD",Teacherdata)
  // console.log("sd",studentdata)     
  // console.log("Ed",Employeedata)
  return (
    <div className='content_container'>
      <School studentdata={studentdata} Teacherdata={Teacherdata} Employeedata={Employeedata} />
      <div className='Addcontainer'>
        <Addstudent setstudentdata={setstudentdata} studentdata={studentdata} title="Add Student" />
        <Addstudent setstudentdata={setTeacherdata} studentdata={Teacherdata} title="Add Teachers" />
        <Addstudent setstudentdata={setEmployeedata} studentdata={Employeedata} title="Add Employee" />
      </div>
    </div>
  );

}
