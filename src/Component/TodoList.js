import React, { useState, useEffect } from "react";

const getLocalItems = () => {
  let data = localStorage.getItem("lists");
  console.log(data);

  if (data) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function TodoList() {
  const [toggle, setToggle] = useState(2);
  const [list, setList] = useState({
    text: "",
    done: false
  });
  const [todo, setTodo] = useState(getLocalItems());

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todo));
  }, [todo]);

  
  function handleKeyPress(target) {
    if (target.charCode === 13) {
      setTodo((prevNotes) => {
        return [list, ...prevNotes];
      });
      setList({ text: "", done: false });
    }
  }
  function handleDone(id) {
    const newTasks = [...todo];
    if (toggle % 2 === 0) {
      newTasks[id].done = true;
      setToggle(toggle + 1);
    } else if (toggle % 2 !== 0) {
      newTasks[id].done = false;
      setToggle(toggle - 1);
    }
    const tasksDone = newTasks.filter((newTasks) => newTasks.done === true);

    const tasksPending = newTasks.filter((newTasks) => newTasks.done === false);
    setTodo(() => [...tasksPending, ...tasksDone]);
  }

  function handleChange(event) {
    const value = event.target.value;
    setList((prevValue) => {
      return {
        text: value,
        done: prevValue.done
      };
    });
  }

  function handleAdd() {
    setTodo((prevNotes) => {
      return [list, ...prevNotes];
    });
    setList({ text: "", done: false });
  }

  function handleDelete(id) {
    setTodo((prevNotes) => {
      return prevNotes.filter((item, index) => {
        return index !== id;
      });
    });
  }

  function handleReset() {
    setList("", false);
    setTodo([]);
  }
  return (
    <div>
      <input
        className="textarea"
        placeholder="write todos for today here"
        onChange={handleChange}
        type="text"
        onKeyPress={handleKeyPress}
        value={list.text}
      />
      <div className="div-text-btn">
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="todo-list">
        {todo.map((item, index) => (
          <div className="todo" key={index} id={index}>
            <p
              className="todo-para"
              style={{ textDecoration: item.done ? "line-through" : "" }}
              onClick={() => handleDone(index)}
              total={index}
            >
              {item.text}
            </p>{" "}
            <button className="todo-btn" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
