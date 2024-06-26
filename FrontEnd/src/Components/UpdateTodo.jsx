import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateTodo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
        const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get(`http://localhost:3000/todos/todofind/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        // console.log(data.todo)
        setTitle(data.todo.title);
        setDescription(data.todo.dicription);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching todo:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/todos/update/${id}`,  {
      title: title,     
      dicription: description,
    });
      navigate('/');
    } catch (err) {
      console.error('Error updating todo:', err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        Loading...
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      backgroundColor="gray.100"
    >
      <Box
        width="400px"
        p="8"
        bg="white"
        shadow="md"
        rounded="md"
      >
        <form onSubmit={handleSubmit}>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Update Todo
          </Heading>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <Stack spacing={4}>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter todo title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="Enter todo description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" width="full" type="submit">
              Update
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateTodo;
