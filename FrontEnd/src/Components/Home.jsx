// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Stack, Text, Spinner, Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        console.log(token,"Homme pages se token")
        const { data } = await axios.get('http://localhost:3000/todos/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect or navigate to login page after logout
    // Example using react-router-dom, adjust as per your setup
    window.location.href = '/login';
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.get(`http://localhost:3000/todos/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update state to remove the deleted todo
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError(err.message);
    }
  };


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }


  return (
    <Box p="5">
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Heading>Your To-Dos</Heading>
        <Flex gap="3">
          <Button as={Link} to="/create" colorScheme="blue">
            Create Todo
          </Button>
          <Button onClick={handleLogout} colorScheme="red">
            Logout
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} px={20} pt={5}>
      {todos.map((todo) => (
        <Box key={todo._id} p="5" shadow="md" borderWidth="1px" rounded="md">
          <Heading fontSize="xl">{todo.title}</Heading>
          <Text mt={4}>{todo.dicription}</Text>
          <Stack direction="row" spacing={4} mt={4}>
            <Link  to={`/update/${todo._id}`} color='red' >Update</Link >
            <Button onClick={() => handleDelete(todo._id)} colorScheme="red">Delete</Button>
          </Stack>
        </Box>
      ))}
    </SimpleGrid>

    </Box>
  );
};

export default Home;
