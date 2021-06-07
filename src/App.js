import "./styles.css";
import React, { useState } from "react";
import {
  Input,
  ListItem,
  List,
  Typography,
  Button,
  Checkbox
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const UseStyles = makeStyles({
  edit: {
    background: "green",
    color: "white",
    marginLeft: "30px"
  },
  button: {
    marginLeft: "10px"
  },
  todoList: {
    marginTop: "30px"
  },
  list: {
    width: "400px"
  }
});

const App = () => {
  const classes = UseStyles();
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(false);
  const [editedId, setEditedid] = useState(null);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setInput("");
  };

  const handleClick = () => {
    let id = Math.floor(Math.random() * 10000);
    if (!input) {
      alert("please enter a todo");
      return;
    }
    if (!editTodo) {
      const newTodo = { text: input, isDone: false, id };
      setTodos([...todos, newTodo]);
    } else {
      const newTodo = { text: input, isDone: false, id: editedId };
      setTodos([...todos, newTodo]);
    }

    setEditTodo(false);

    setInput("");
  };
  const onDelete = (id) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  };

  const onEdit = (id) => {
    const findTodo = todos.find((todo) => todo.id === id);
    const newTodos = todos.filter((item) => item.id !== id);

    setInput(findTodo.text);
    setTodos(newTodos);
    setEditTodo(true);
    setEditedid(findTodo.id);
  };
  const handleCompleted = (id) => {
    let completed = todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(completed);
  };
  console.log(...todos);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <Input
          id="filled-basic"
          variant="filled"
          onChange={onChange}
          value={input}
          placeholder="add a task"
        />

        <Button
          variant={!editTodo ? "contained" : "outlined"}
          color="primary"
          onClick={handleClick}
        >
          {editTodo ? "Edit" : "Add"}
        </Button>
      </form>
      {todos.map((todo) => {
        return (
          <List className={classes.list}>
            <ListItem className={classes.todoList} divider="bool">
              <Checkbox
                checked={todo.isDone}
                onClick={() => handleCompleted(todo.id)}
                name="checked"
                color="primary"
              />
              <Typography variant="h4" className={classes.todo} key={todo.id}>
                {todo.text}
              </Typography>

              <Button
                variant="contained"
                className={classes.edit}
                onClick={() => onEdit(todo.id)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </Button>
            </ListItem>
          </List>
        );
      })}
    </div>
  );
};
export default App;
