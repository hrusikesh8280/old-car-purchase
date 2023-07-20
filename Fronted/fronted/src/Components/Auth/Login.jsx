import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await Authapi.post("/login", { email, password });

      toast({
        title: "Login Successful",
        description: "You have been logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to the desired page after login
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        width="400px"
        mx="auto"
        mt="8"
        p="6"
        bg="white"
        boxShadow="lg"
        borderRadius="md"
      >
        <Heading textAlign="center" mb="4">
          Login
        </Heading>
        <VStack spacing="4">
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={handleLogin}
            w="full"
            _hover={{ bg: "blue.600" }}
          >
            Login
          </Button>
          <Box textAlign="center">
            Don't have an account?{" "}
            <Link color="blue" href="/signup">
              Sign up
            </Link>
          </Box>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default Login;
