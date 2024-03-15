// src/AddTodo.js

import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = ({ fetchTodos }) => {
    const [title, setTitle] = useState('');

    const addTodo = async () => {
        if (title.trim() === '') return;

        await axios.post('http://localhost:5000/api/todos', { title });
        setTitle('');
        fetchTodos(); // Fetch updated todos
    };

    return (
        <div className="container">
            <h2>Create Todo</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a new todo"
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={addTodo}>
                        Add Todo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTodo;
