import React from 'react'; 

const TaskColumn = ({ title, tasks, color, toggleStatus, deleteFunc }) => (
  <div style={{ 
    flex: '1', 
    minWidth: '300px', 
    backgroundColor: '#f8f9fa', 
    borderRadius: '15px', 
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    minHeight: '80vh'
  }}>
    <h3 style={{ 
      textAlign: 'center', 
      color: color, 
      borderBottom: `3px solid ${color}`, 
      paddingBottom: '10px' 
    }}>
      {title}
    </h3>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
      {tasks.length > 0 ? tasks.map(task => (
        <div 
          key={task._id} 
          onClick={() => toggleStatus(task._id, task.status)}
          style={{ 
            backgroundColor: '#fff', 
            padding: '15px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            borderRight: `8px solid ${color}`,
            transition: 'transform 0.2s',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h4 style={{ margin: '0', color: '#333' }}>{task.title}</h4>
          
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              deleteFunc(task._id);
            }} 
            style={{ 
              color: 'white', 
              cursor: 'pointer', 
              background: '#ff4d4f', 
              border: 'none',
              borderRadius: '6px',
              padding: '5px 10px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            Delete
          </button>
        </div>
      )) : (
        <p style={{ textAlign: 'center', color: '#ccc', marginTop: '20px' }}>Empty</p>
      )}
    </div>
  </div>
);

export default TaskColumn;