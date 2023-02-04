import { useState } from 'react';
import { motion } from "framer-motion";

export function School({studentdata,Teacherdata,Employeedata}) {

  return (
    <div className='schoolcontainer'>
      <h2 className='scl_name'>Dhee Public School</h2>
      <div className='schoolinfo_contaniner'>
       <Schoolstrength  value={studentdata.length} name="Students"/>
       <Schoolstrength  value={Teacherdata.length} name="Teacher"/>
       <Schoolstrength value={Employeedata.length} name="Employees"/>

      </div>
    </div>

  );
}
function Schoolstrength({value,name }) {
  return (

    <motion.div animate={{ y: 0 }} className='schoolinfo'>

      <h2 className='sclinfo_name'>{name}</h2>
      <h1 className='sclinfo_count'>{value}</h1>
    </motion.div>
  );
}
