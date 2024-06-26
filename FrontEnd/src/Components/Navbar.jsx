import { Box, Flex, Heading, Text, Link } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box height="10vh" width="full" backgroundColor="gray.700" px="5%" pt="1%">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading color="white">Todos</Heading>
        <Flex gap={10}>
          <Link as={RouterLink} to="/login">
            <Text fontSize={20} color="white">Login</Text>
          </Link>
          <Link as={RouterLink} to="/register">
            <Text fontSize={20} color="white">Register</Text>
          </Link>
          <Link as={RouterLink} to="/">
            <Text fontSize={20} color="white">Home</Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
