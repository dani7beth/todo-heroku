import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Header,
  Container,
  List,
  Input,
  Segment,
} from "semantic-ui-react";

const App = () => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    await axios
      .get("/api/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log("error occured");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/todos", { name: name })
      .then((res) => {
        setTodos([res.data, ...todos]);
      })
      .catch((err) => {
        alert("error occured");
      });
    setName("");
  };

  const updateTodo = async (id) => {
    let res = await axios.put(`/api/todos/${id}`);
    //so res.data is updated todo
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? res.data : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <Segment textAlign="center">
        <Header as="h3" textAlign="center">
          Todo List
        </Header>
        <Form onSubmit={handleSubmit}>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
        <List>
          {todos.map((todo) => (
            <List.Item
              key={todo.id}
              style={{ color: todo.complete ? "grey" : "black" }}
              onClick={() => updateTodo(todo.id)}
            >
              {todo.name}
            </List.Item>
          ))}
        </List>
      </Segment>
    </Container>
  );
};
export default App;

//make changes on your local machine (development)
//test on dev !!make sure things are working!!
//push to a branch on git(for now directly to master)
//then we can do our production stuff
