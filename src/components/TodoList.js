import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";

import ListGroup from "react-bootstrap/ListGroup";

import { useEffect, useState } from "react";

import TodoItem from "./TodoItem";

const TodoList = () => {
  let initialist = [
    { id: 1, text: "do this", done: true },

    { id: 2, text: "Nah", done: false },

    { id: 3, text: "Eggs", done: false },
  ];

  let localList = JSON.parse(localStorage.getItem(`todos`));

  if (localList) {
    initialist = localList;
  }

  const [list, setList] = useState(initialist);

  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    localStorage.setItem(`todos`, JSON.stringify(list));
  }, [list]);

  const handleTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const addTodoItem = () => {
    let lastItem = list[list.length - 1];

    let id = 1;

    if (lastItem) {
      id = lastItem.id + 1;
    }

    let newTodo = {
      id: id,

      text: textInput,

      done: false,
    };

    setList((prevList) => [...prevList, newTodo]);

    setTextInput("");
  };

  const markAsDone = (id) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        item.done = true;
      }

      return item;
    });

    setList(newList);
  };

  const deleteToDo = (id) => {
    const newlist = list.filter((item) => {
      return item.id !== id;
    });

    setList(newlist);
  };

  const handleKeyUp = (e) => {
    if(e.key === 'Enter'){
        addTodoItem();
    }
  };

  const todoItems = list.map((item) => {
    return (
      <TodoItem
        key={item.id}
        todo={item}
        markAsDone={markAsDone}
        deleteToDo={deleteToDo}
      />
    );
  });

  return (
    <Card>
      <Card.Header>To Do List</Card.Header>

      <Card.Body>
        <ListGroup>{todoItems}</ListGroup>
      </Card.Body>

      <Card.Footer>
        <input type="text" onChange={handleTextInput} value={textInput} onKeyUp={handleKeyUp}/>

        <Button variant="primary" className="float-end" onClick={addTodoItem}>
          Add
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default TodoList;
