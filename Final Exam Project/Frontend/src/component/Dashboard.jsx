import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
    else {
      axios.get('http://localhost:3000/dashboard', {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(response => {
          setDashboardData(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the dashboard data:', error);
        });
    }
  }, []);

  // State to hold the list of students
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch students from the server
  const fetchStudents = () => {
    axios.get('http://localhost:3000/students/getstudents')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the students:', error);
      });
  }

  const [addStudent, setAddStudent] = useState({
    name: '',
    email: ''
  });

  const handlechange = (e) => {
    setAddStudent({
      ...addStudent,
      [e.target.name]: e.target.value
    });
  }

  // Function to handle adding a student
  const handleAddStudent = () => {
    if (editIndex !== null) {
      // If editIndex is set, update the student
      axios.put(`http://localhost:3000/students/updatestudent/${editIndex}`, addStudent)
        .then(response => {
          console.log('Student updated successfully:', response.data);
          fetchStudents(); // Refresh the student list
        })
        .catch(error => {
          console.error('There was an error updating the student:', error);
        });
      setEditIndex(null); // Reset edit index after update
    }
    else {
      // If editIndex is null, add a new student
      axios.post('http://localhost:3000/students/addstudent', addStudent)
        .then(response => {
          console.log('Student added successfully:', response.data);
          fetchStudents(); // Refresh the student list
        })
        .catch(error => {
          console.error('There was an error adding the student:', error);
        });
    }
    setAddStudent({
      name: '',
      email: ''
    });
  }

  const [editIndex, setEditIndex] = useState(null);
  // Function to handle editing a student
  const handleEditStudent = (id) => {
    setEditIndex(id);
    const studentToEdit = students.find(student => student._id === id);
    setAddStudent({
      name: studentToEdit.name,
      email: studentToEdit.email
    });
  }

  // Function to handle deleting a student
  const handleDeleteStudent = (id) => {
    axios.delete(`http://localhost:3000/students/deletestudent/${id}`)
      .then(response => {
        console.log('Student deleted successfully:', response.data);
        fetchStudents(); // Refresh the student list
      })
      .catch(error => {
        console.error('There was an error deleting the student:', error);
      });
  }

  return (
    <div>
      <div className='border-b-2 border-gray-300 w-full p-10 flex justify-center items-center'>
        <h1 className='w-full font-bold flex items-center justify-between text-lg'>
          Hi, {dashboardData?.user?.name}
          <span className='text-3xl text-blue-500'>Welcome to the Dashboard</span>
          <span onClick={() => {
            localStorage.removeItem('token')
            navigate('/')
          }} className='border ml-5 px-5 py-2 rounded text-sm cursor-pointer bg-blue-500 text-white'>Logout</span>
        </h1>
      </div>
      <div className='p-10'>
        {/* Make Student form  */}
        <h2 className='text-lg font-bold mb-5'>Add Student</h2>
        <input type="text" placeholder="Student Name" className='border p-2 w-full mb-2 rounded' onChange={handlechange} name="name" value={addStudent.name} />
        <input type="email" placeholder="Student Email" className='border p-2 w-full mb-2 rounded' onChange={handlechange} name="email" value={addStudent.email} />
        <button className='border px-5 py-2 rounded bg-blue-500 text-white mt-5' onClick={handleAddStudent}>{editIndex !== null ? 'Update Student' : 'Add Student'}</button>
      </div>
      <div className='p-10'>
        {/* View Student form */}
        <h2 className='text-lg font-bold mb-5'>Students Lists</h2>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='border p-2 w-[10%]'>No.</th>
              <th className='border p-2 w-[35%]'>Name</th>
              <th className='border p-2 w-[35%]'>Email</th>
              <th className='border p-2 w-[20%]'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className='border p-2'>{index + 1}</td>
                <td className='border p-2'>{student.name}</td>
                <td className='border p-2'>{student.email}</td>
                <td className='border p-2'>
                  <button className='border px-2 py-1 rounded bg-blue-500 text-white' onClick={() => handleEditStudent(student._id)}>Edit</button>
                  <button className='border px-2 py-1 rounded bg-red-500 text-white ml-2' onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
