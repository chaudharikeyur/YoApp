
import { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();

  function handleClick() {
    setShow(!show);
  }

  async function submitHeader() {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history("/chat");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }

  return (
    <VStack spacing="5px">
      <FormControl id="emails">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="passwords">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        isLoading={loading}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHeader}
        colorScheme="purple"
      >
        Login
      </Button>

      <Button
        width="100%"
        style={{ marginTop: 5 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        colorScheme="red"
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
