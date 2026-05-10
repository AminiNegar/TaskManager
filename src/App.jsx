import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import TaskColumn from './TaskColumn';

function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStatus, setTaskStatus] = useState('todo'); 
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/all', {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const addTask = async () => {
    if (!taskTitle.trim()) {
      Swal.fire({ icon: 'warning', title: 'Empty Task', text: 'Please enter a title' });
      return;
    }
    try {
      
      const response = await axios.post(
        'http://localhost:5000/api/tasks/add', 
        { title: taskTitle, status: taskStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setTaskTitle('');
      Swal.fire({ title: 'Success!', icon: 'success', timer: 1500, showConfirmButton: false });
    } catch (error) {
      Swal.fire({ title: 'Error!', icon: 'error', text: 'Server error' });
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const { value: newStatus } = await Swal.fire({
      title: 'Change Status',
      input: 'select',
      inputOptions: {
        'todo': 'To Do 📝',
        'doing': 'Doing ⌛',
        'done': 'Done ✅'
      },
      inputValue: currentStatus,
      showCancelButton: true
    });

    if (newStatus) {
      try {
        await axios.patch(`http://localhost:5000/api/tasks/update/${id}`, 
          { status: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchTasks();
      } catch (error) {
        Swal.fire('Error', 'Update failed!', 'error');
      }
    }
  };

const deleteTask = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure ?',
    text: "This task is deleted forever",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setTasks(tasks.filter(task => task._id !== id));
      
      Swal.fire('Deleted', 'Task was deleted.', 'success');
    } catch (error) {
      Swal.fire('Error', 'something went wrong', 'error');
    }
  }
};

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? 'signup' : 'login';
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, credentials);
      if (!isSignup) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        Swal.fire('Welcome', `Hello ${res.data.username}`, 'success');
      } else {
        setIsSignup(false);
        Swal.fire('Successful', 'Now Login Please!', 'success');
      }
    } catch (err) {
      Swal.fire('Error', 'Invalid username or password', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
        <form onSubmit={handleAuth} style={{ padding: '40px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '350px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <input 
            placeholder="Username" 
            onChange={e => setCredentials({...credentials, username: e.target.value})} 
            style={{ width: '100%', marginBottom: '15px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={e => setCredentials({...credentials, password: e.target.value})} 
            style={{ width: '100%', marginBottom: '20px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
          <p onClick={() => setIsSignup(!isSignup)} style={{ textAlign: 'center', cursor: 'pointer', color: '#007bff', marginTop: '15px', fontSize: '0.9rem' }}>
            {isSignup ? 'Already have an account? Login' : 'New here? Create an account'}
          </p>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI, Tahoma, sans-serif', direction: 'rtl', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button onClick={handleLogout} style={{ padding: '8px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
        <h2 style={{ margin: 0 }}>Task Manager Panel</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <input 
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="What needs to be done?"
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', width: '300px' }}
        />
        <select 
          value={taskStatus} 
          onChange={(e) => setTaskStatus(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button onClick={addTask} style={{ padding: '10px 25px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Add Task
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <TaskColumn  deleteFunc = {deleteTask} title="To Do 📝" tasks={tasks.filter(t => t.status === 'todo')} color="#3498db" toggleStatus={toggleStatus} />
        <TaskColumn deleteFunc = {deleteTask} title="Doing ⌛" tasks={tasks.filter(t => t.status === 'doing')} color="#f39c12" toggleStatus={toggleStatus} />
        <TaskColumn deleteFunc = {deleteTask} title="Done ✅" tasks={tasks.filter(t => t.status === 'done')} color="#2ecc71" toggleStatus={toggleStatus} />
      </div>
    </div>
  );
}

export default App;