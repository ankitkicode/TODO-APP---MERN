import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
// const history = useHistory();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Token set in localStorage:', token);
      navigate(-1);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };


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
            Login
          </Heading>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <Stack spacing={4}>
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
              Login
            </Button>
            <Text textAlign="center" mt={4}>
              Don't have an account?{' '}
              <Link to="/register">
                <Text as="span" color="blue.500">
                  Register
                </Text>
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
