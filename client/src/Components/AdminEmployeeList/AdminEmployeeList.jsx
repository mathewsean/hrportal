import React, {useState, useEffect} from 'react'
import axios from '../../Services/axiosInterceptor'

function AdminEmployeeList() {

  const [employeeList, setEmployeeList] = useState([])
  console.log(employeeList);
  
  useEffect(() => {

   const getEmployeeList = async() => {

    try {

      const res = await axios.get('/admin/employee_list')

      if(res.status === 200){

        setEmployeeList(res.data)
        
      }

      
    } catch (error) {
      console.error(error);
    }

   }

   getEmployeeList()

  },[]) 




  return (

    <>
      <div className="mx-auto w-3/4 p-8">
        <p className='font-sans font-bold text-xl mt-10 text-center rounded-md bg-slate-100 py-3'>Employees</p>        
        
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Designation</th>
              <th className="border border-gray-400 px-4 py-2">Department</th>
              <th className="border border-gray-400 px-4 py-2">Email Id</th>
              <th className="border border-gray-400 px-4 py-2">Contact No</th>
              {/* <th className="border border-gray-400 px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-400 px-4 py-2">{employee.firstName} {employee.lastName}</td>
                <td className="border border-gray-400 px-4 py-2">{employee.designation}</td>
                <td className="border border-gray-400 px-4 py-2">{employee.department}</td> 
                <td className="border border-gray-400 px-4 py-2">{employee.emailId}</td>
                <td className="border border-gray-400 px-4 py-2">{employee.contactNos}</td> 
                {/* <td className="border border-gray-400 text-center">

                  <Link >
                    <button className='bg-sky-700 text-white px-4 py-1 rounded-md'>VIEW</button>
                  </Link>

                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>
  )
}

export default AdminEmployeeList