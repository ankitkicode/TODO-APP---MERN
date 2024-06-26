import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [dicription, setdicription] = useState('');
  const [error, setError] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log('Token: form create todo', token); // Check if token is retrieved from localStorage

      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const response = await axios.post(
        'http://localhost:3000/todos/create',
        { title, dicription }, // Data to be sent with the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Todo created:', response.data); // Log the response from the server
      toast({
        title: 'Todo created successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/'); // Redirect to home page after successful creation
    } catch (err) {
      console.error('Token or request error:', err); // Log the error for debugging
      setError(err.message);
    }
  };

  return (
    <Box
      p="5"
      width="400px"
      bg="white"
      shadow="md"
      rounded="md"
      margin="auto"
      mt="20"
    >
      <Heading mb="5" textAlign="center">Create New Todo</Heading>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
      <form onSubmit={handleSubmit}>
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
          <FormControl id="dicription">
            <FormLabel>dicription</FormLabel>
            <Input
              type="text"
              placeholder="Enter todo dicription"
              value={dicription}
              onChange={(e) => setdicription(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Create Todo
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateTodo;
