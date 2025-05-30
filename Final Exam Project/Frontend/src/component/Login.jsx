import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
        axios.post('http://localhost:3000/login', formData)
            .then(response => {
                console.log('Login successful:', response.data)
                // Store token or user data if needed
                localStorage.setItem('token', response.data.token)
                navigate('/dashboard') // Redirect to dashboard on successful login
            })
            .catch(error => {
                console.error('There was an error logging in:', error)
                alert('Login failed. Please check your credentials.')
            })
    }

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <button
                            type="submit"
                            onClick={() => navigate('/dashboard')}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Login
                        </button>
                        <button
                            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition duration-200"
                            onClick={() => navigate('/signup')}
                        >
                            Go to Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
