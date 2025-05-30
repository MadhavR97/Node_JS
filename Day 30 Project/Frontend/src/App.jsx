import React, { useEffect, useState } from 'react'
import axios from "axios"

function App() {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [city, setCity] = useState('')

  // Get Data
  const [data, setData] = useState([])
  const [editId, setEditId] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:3000/getData`)
    setData(res.data.data)
  }

  // Add Data
  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`http://localhost:3000/updateData?id=${editId}`, { name, subject, city })
        .then((res) => {
          alert(res.data.msg)
          fetchData()
        })
        .catch((err) => {
          console.log(err)
        })
      setEditId('')
    }
    else {
      await axios.post(`http://localhost:3000/addData`, { name, subject, city })
        .then((res) => {
          alert(res.data.msg)
          // Fetch data again to update the list
          fetchData()
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // Clear input fields after submission
    setName('')
    setSubject('')
    setCity('')
  }

  // Edit Data
  const handleEdit = async (id) => {
    setEditId(id)

    const res = await axios.get(`http://localhost:3000/getData?id=${id}`)
    setName(res.data.data[0].name)
    setSubject(res.data.data[0].subject)
    setCity(res.data.data[0].city)
  }

  // Delete Data
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/deleteData?id=${id}`)
      .then((res) => {
        alert(res.data.msg)
        fetchData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='w-full h-screen flex'>
      <div className='w-[50%] h-full p-10'>
        <p className='text-3xl font-bold mb-5'>Students Form</p>
        <div className='border-2 border-[gray] w-full p-10 flex flex-col rounded-lg'>
          <label htmlFor="" className='text-sm font-bold mb-2'>Name</label>
          <input type="text" placeholder='Enter Name' className='border mb-3 w-full h-[40px] rounded ps-5' name='name' value={name} onChange={(e) => { setName(e.target.value) }} />
          <label htmlFor="" className='text-sm font-bold mb-2'>Subject</label>
          <input type="text" placeholder='Enter Subject' className='border mb-3 w-full h-[40px] rounded ps-5' name='subject' value={subject} onChange={(e) => { setSubject(e.target.value) }} />
          <label htmlFor="" className='text-sm font-bold mb-2'>City</label>
          <input type="text" placeholder='Enter City' className='border mb-3 w-full h-[40px] rounded ps-5' name='city' value={city} onChange={(e) => { setCity(e.target.value) }} />
          <button className='border w-full h-[40px] rounded mt-10 bg-black text-white cursor-pointer hover:bg-white hover:text-black' onClick={handleSubmit}>{editId ? 'Update' : 'Submit'}</button>
        </div>
      </div>
      <div className='w-[50%] h-full p-10 overflow-auto'>
        <p className='text-3xl font-bold mb-5'>Students List</p>
        {data && data.map((e) => (
          <div className='border-2 border-[gray] p-5 flex w-full h-[130px] mb-5 rounded-lg '>
            <div className='w-[80%] h-full flex justify-between'>
              <div className='w-[20%] h-full flex flex-col justify-evenly items-start font-bold text-sm'>
                <p>Name</p>
                <p>Subject</p>
                <p>City</p>
              </div>
              <div className='w-[80%] h-full flex flex-col justify-evenly items-start text-sm'>
                <p>{e.name}</p>
                <p>{e.subject}</p>
                <p>{e.city}</p>
              </div>
            </div>
            <div className='w-[20%] h-full flex  flex-col justify-evenly items-end'>
              <button className='border w-[100px] h-[40px] rounded cursor-pointer bg-black text-white font-bold text-sm' onClick={() => { handleEdit(e._id) }}>Edit</button>
              <button className='border w-[100px] h-[40px] rounded cursor-pointer bg-[brown] text-white font-bold text-sm' onClick={() => { handleDelete(e._id) }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
