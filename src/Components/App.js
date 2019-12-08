import React, { useState } from "react";

const Task = ({ content = "I'm a checkbox!", taskHandle, isChecked }) => (
  <div onClick={taskHandle}>
    <input type="checkbox" defaultChecked={isChecked} />
    <span>{content}</span>
  </div>
);

const AddTask = ({ addHandle }) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <h2>Add your task</h2>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type="text"
      />
      <button
        type="button"
        onClick={() => {
          addHandle(value);
          setValue("");
        }}
      >
        Add
      </button>
    </div>
  );
};

const TaskList = ({ funList, taskHandle }) => (
  <div>
    {funList.map(task => (
      <Task
        key={task.listId}
        content={task.content}
        isChecked={task.isChecked}
        taskHandle={() => taskHandle(task)}
      />
    ))}
  </div>
);

export default () => {
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const addHandle = value => {
    setTodoList(prev =>
      prev.concat({
        listId: todoList.length + doneList.length,
        content: value,
        isChecked: false
      })
    );
  };

  const taskHandle = task => {
    if (task.isChecked) {
      const clicked = doneList.find(x => x.listId === task.listId);
      setDoneList(prev => prev.filter(x => x.listId !== task.listId));
      clicked.isChecked = false;
      setTodoList(prev => prev.concat(clicked));
    } else {
      const clicked = todoList.find(x => x.listId === task.listId);
      setTodoList(prev => prev.filter(x => x.listId !== task.listId));
      clicked.isChecked = true;
      setDoneList(prev => prev.concat(clicked));
    }
  };

  return (
    <div className="App">
      <AddTask addHandle={addHandle} />
      <h2>ToDo</h2>
      <TaskList funList={todoList} taskHandle={taskHandle} />
      <h2>Done</h2>
      <TaskList funList={doneList} taskHandle={taskHandle} />
    </div>
  );
};
