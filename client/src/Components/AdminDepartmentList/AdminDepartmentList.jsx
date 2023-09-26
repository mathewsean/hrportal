import React, { useEffect, useState, useRef } from 'react'
import axios from '../../Services/axiosInterceptorAdmin'

function AdminDepartmentList() {


  const [department, setDepartment] = useState([])
  const [designation, setDesignation] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [newDepartment, setNewDepartment] = useState('')


  console.log('Designation', designation); 
  

  console.log('department', department);

  useEffect(() => {

    getDepartmentList()

  }, [])

  async function getDepartmentList() {

    try {
      const res = await axios.get('/admin/department_list')

      if (res.status === 200) {
        console.log(res.data);
        setDepartment(res.data)
      }

    } catch (error) {
      console.error(error.message);
    }

  }

  async function handleAddDepartment() {
    try {

      if (newDepartment !== null) {

        const res = await axios.post(`/admin/create_new_department`, { department: newDepartment })

        if (res) {
          getDepartmentList()
          setNewDepartment('')
        }

      }

    } catch (error) {

      console.error(error.response.data.message)
      setErrorMessage(error.response.data.message)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  async function handleAddDesignation(departmentId, index) {
    try {

      const res = await axios.post(`/admin/add_new_designation/${departmentId}`, { designation: designation[index] })

      if (res) {
        getDepartmentList()
        setDesignation([])
      }

    } catch (error) {

      console.error(error.response.data.message);
      setDesignation([])
      setErrorMessage(error.response.data.message)

      setTimeout(() => {

        setErrorMessage(null)

      }, 5000)

    }
  }


  return (
    <>

      <div className="mx-auto w-3/4 p-8">
        <div className='text-center'>
          {errorMessage && <span className='text-center text-red-500  py-3'>{errorMessage}</span>}
        </div>
        <p className='font-sans font-bold text-xl text-center rounded-md bg-slate-100 py-3'>Department</p>

        <form onSubmit={(e) => {
          e.preventDefault()
          handleAddDepartment()
        }}>
          <input
            type="text"
            className='px-2 my-2 w-50 h-10 bg-white font-sans text-black rounded-md shadow-lg'
            name='designation'
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder='Add Department' />

          <button className='bg-sky-700 text-white ml-3 px-4 py-1 rounded-md'>ADD</button>
        </form>

        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Designation</th>
              <th className="border border-gray-400 px-4 py-2">Action</th>


            </tr>
          </thead>
          <tbody>
            {department.map((department, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-400 px-4 py-2">{department.departmentName}</td>
                <td className="border border-gray-400 px-4 py-2">

                  {department.designation.join(', ')}
                </td>

                <td className="border border-gray-400 text-center">
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    handleAddDesignation(department._id, index)
                  }}>
                    <input
                      type="text"
                      className='px-2 my-2 w-50 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                      name='designation'
                      value={designation[index] || " "}
                      onChange={(e) => {
                        const newDesignation = [...designation]
                        newDesignation [index] = e.target.value
                        setDesignation(newDesignation)
                      }}
                      placeholder='Enter Designation' />

                    <button className='bg-sky-700 text-white ml-3 px-4 py-1 rounded-md'>ADD</button>
                  </form>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default AdminDepartmentList