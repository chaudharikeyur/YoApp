import { 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    InputGroup, 
    InputRightElement, 
    useToast, 
    VStack 
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  
  const Signup = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [show, setShow] = useState(false);
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const toast = useToast(); 
      const navigate = useNavigate();  // ✅ Corrected navigate
  
      function handleClick() {
          setShow(!show);
      }
  
      async function submitHandler() {
          setLoading(true);
  
          if (!name || !email || !password || !confirmPassword) {
              toast({
                  title: "Please fill all the fields",
                  status: "warning",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
              });
              setLoading(false);
              return;
          }
  
          if (password !== confirmPassword) {
              toast({
                  title: "Passwords do not match",
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
                      "Content-Type": "application/json",
                  },
              };
  
              const { data } = await axios.post(
                  "/api/user",  
                  {
                      name,
                      email,
                      password,
                  },
                  config
              );
  
              toast({
                  title: "Registration Successful",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
              });
  
              console.log("User Registered:", data);
              localStorage.setItem("userInfo", JSON.stringify(data));
              navigate("/chat");  
          } catch (error) {
              toast({
                  title: "Error Occurred!",
                  description: error.response?.data?.message || "Something went wrong",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
              });
          }
  
          setLoading(false);
      }
  
      return (
          <VStack spacing="5px">
              <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)} 
                  />
              </FormControl>
  
              <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                  />
              </FormControl>
  
              <FormControl id="password">
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
  
              <FormControl id="confirmpassword">
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                      <Input
                          type={show ? "text" : "password"}
                          placeholder="Enter your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
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
                  mt={4}
                  colorScheme="purple"
                  onClick={submitHandler}
              >
                  Sign Up
              </Button>
          </VStack>
      );
  };
  
  export default Signup;
  