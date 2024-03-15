import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';

/**
 * Renders a TodoList component that displays a list of todos.
 * Allows users to view, update, and delete todos.
 * Fetches todos from an API and updates the state accordingly.
 * 
 * @returns {JSX.Element} The rendered TodoList component.
 */
const TodoList = () => {
    // State variables
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isViewing, setIsViewing] = useState(false);

    // Fetch todos on component mount
    useEffect(() => {
        fetchTodos();
    }, []);

    /**
     * Fetches todos from the API and updates the state.
     * Sets the selectedTodo to null and isViewing to false.
     * 
     * @returns {Promise<void>} A promise that resolves when the todos are fetched and state is updated.
     */
    const fetchTodos = async () => {
        try {
            const response = await axios.get('https://simple-todos-app-8.onrender.com/api/todos');
            setTodos(response.data);
            setSelectedTodo(null);
            setIsViewing(false);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    /**
     * Handles the checkbox change event for a todo.
     * Updates the completed status of the todo in the API.
     * Fetches the updated todos.
     * 
     * @param {string} id - The ID of the todo.
     * @param {boolean} completed - The current completed status of the todo.
     * @returns {Promise<void>} A promise that resolves when the todo is updated and todos are fetched.
     */
    const handleCheckboxChange = async (id, completed) => {
        try {
            await axios.put(`https://simple-todos-app-8.onrender.com/api/todos/${id}`, { completed: !completed });
            fetchTodos(); // Fetch updated todos
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    /**
     * Handles the view click event for a todo.
     * Fetches the selected todo from the API and updates the state.
     * Sets isViewing to true.
     * 
     * @param {string} id - The ID of the todo.
     * @returns {Promise<void>} A promise that resolves when the todo is fetched and state is updated.
     */
    const handleViewClick = async (id) => {
        console.log('View Clicked');
        try {
            const response = await axios.get(`https://simple-todos-app-8.onrender.com/api/todos/${id}`);
            setSelectedTodo(response.data);
            setIsViewing(true);
        } catch (error) {
            console.error('Error fetching todo:', error);
        }
    };

    /**
     * Handles the back click event.
     * Sets isViewing to false.
     */
    const handleBackClick = () => {
        setIsViewing(false);
    };

    /**
     * Handles the delete click event for a todo.
     * Deletes the todo from the API and updates the state.
     * 
     * @param {string} id - The ID of the todo.
     * @returns {Promise<void>} A promise that resolves when the todo is deleted and state is updated.
     */
    const handleDeleteClick = async (id) => {
        console.log('Delete Clicked');
        try {
            if (!id) {
                console.error('Invalid todo ID');
                return;
            }
            await axios.delete(`https://simple-todos-app-8.onrender.com/api/todos/${id}`);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Render the TodoList component
    return (
        <div className="container bg-purple">
            <h2 className="text-center" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>MY TODO LIST</h2>
            <AddTodo fetchTodos={fetchTodos} />
            {isViewing ? (
                <div className="view-section mt-3 p-3 bg-light">
                    <h3 className="mb-3">View Todo</h3>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title font-weight-bold">{selectedTodo?.title}</h5>
                            <p className={`card-text ${selectedTodo?.completed ? 'text-success' : 'text-danger'}`}>
                                Status: {selectedTodo?.completed ? 'Completed' : 'Incomplete'}
                            </p>
                            <button className="btn btn-primary" onClick={handleBackClick}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <ul className="list-group">
                    {todos.map((todo) => (
                        <li
                            key={todo._id}
                            className={`list-group-item ${todo.completed ? 'list-group-item-success' : ''}`}
                        >
                            <div className="d-flex align-items-center">
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleCheckboxChange(todo._id, todo.completed)}
                                />
                                <label
                                    className={`form-check-label flex-grow-1 ${todo.completed ? 'text-decoration-line-through' : ''}`}
                                    style={{ fontFamily: 'Arial', fontSize: '16px' }}
                                >
                                    {todo.title}
                                </label>
                                <div>
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => handleViewClick(todo._id)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteClick(todo._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
