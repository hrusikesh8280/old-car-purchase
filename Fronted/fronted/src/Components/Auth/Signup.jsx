// components/Auth/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Link,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Authapi from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await Authapi.post("/register", {
        name,
        email,
        password,
      });

      const { data } = response;

      toast({
        title: "Signup Successful",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      if (error.response) {
        const { data } = error.response;

        toast({
          title: "Signup Failed",
          description: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Signup Failed",
          description: "Failed to register. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      width="400px"
      mx="auto"
      mt="8"
      p="6"
      bgGradient="linear(to-r, purple.400, pink.500)"
      boxShadow="lg"
      borderRadius="lg"
      as={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Heading textAlign="center" mb="4" color="white">
        Signup
      </Heading>
      <VStack spacing="4">
        <FormControl id="name">
          <FormLabel color="white">Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            bg="white"
            color="purple.500"
            borderRadius="md"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel color="white">Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="white"
            color="purple.500"
            borderRadius="md"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel color="white">Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="white"
            color="purple.500"
            borderRadius="md"
          />
        </FormControl>
        <Button
          colorScheme="pink"
          variant="solid"
          onClick={handleSignup}
          borderRadius="full"
          px="8"
        >
          Signup
        </Button>
        <Box textAlign="center" color="white">
          Already have an account?{" "}
          <Link color="pink.200" href="/login">
            Login
          </Link>
        </Box>
      </VStack>
    </Box>
  );
};

export default Signup;
