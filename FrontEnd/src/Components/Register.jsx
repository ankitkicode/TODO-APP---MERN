// src/pages/Register.jsx
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        toast({
          title: "Registration successful.",
          description: "You can now log in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Clear form fields
        setUsername('');
        setEmail('');
        setPassword('');
navigate('/')
      }
    } catch (error) {
      toast({
        title: "Registration failed.",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" backgroundColor="gray.100">
      <Box
        as="form"
        width="400px"
        p={8}
        backgroundColor="white"
        boxShadow="md"
        borderRadius="md"
        onSubmit={handleSubmit}
      >
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Register
        </Heading>
        <Stack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" width="full" type="submit">
            Register
          </Button>
          <Text textAlign="center" mt={4}>
            You have an account?{' '}
            <Text as={Link} to="/login" color="blue.500">
              Login
            </Text>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
