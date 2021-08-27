import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import {Flex, Heading, Button, Input, FormLabel, useToast, useMediaQuery} from '@chakra-ui/react';

function Register({isAuthorized, loadUser}){
  
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerUserid, setRegisterUserid] = useState('')
  const [islessthan450] = useMediaQuery("(min-width: 450px)")

  let history = useHistory();
  const toast = useToast();

  const onNameChange = (event) =>{
    setRegisterName(event.target.value);
  }
  const onEmailChange = (event) =>{
    setRegisterEmail(event.target.value);
  }
  const onPasswordChange = (event) =>{
   setRegisterPassword(event.target.value)
  }
  const onUseridChange = (event) =>{
    setRegisterUserid(event.target.value)
  }
  const onSubmitRegister = () =>{
    fetch('https://thawing-retreat-57636.herokuapp.com/register',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        userid: registerUserid
      })
    })
    .then(res=>res.json())
    .then(user=>{
      if(user.id){
        isAuthorized('success')
        loadUser(user)
        history.push(`/dashboard/${user.id}`)
        toast({
          title: 'Successfuly Registered! Welcome to Budgetman!',
          status: 'success',
          isClosable: true
        })
      }
      else{
        toast({
          title: 'Unable to Register :(',
          status: 'error',
          isClosable: true
        })
        isAuthorized('failure')
      }
    })
  }

      return (
        <Flex justifyContent="center" alignItems="center" p={4} flexDirection="column" height="90vh" position="relative">
          <Heading color="teal" mt={4} size={islessthan450?'xl':'md'}>Get yourself  registered!</Heading>
          <Flex justifyContent="center" alignItems="center" flexDirection="column" width="75%" mt={6}>
            <Flex direction='column' width={islessthan450?'75%':'100%'} p={2}>
            <FormLabel htmlFor='userid'>User ID</FormLabel>
            <Input type="text" name='userid' id='userid' placeholder="user_id" vartiant="filled" size="lg" width="100%" mt={2} onChange={onUseridChange}></Input>
            </Flex>
            <Flex width={islessthan450?'75%':'100%'}>
            <Flex direction='column' width='100%' p={2}>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input type="text" name='Firstname' id='Firstname' placeholder="First Name" vartiant="filled" size="lg" width="100%" mt={2} onChange={onNameChange}></Input>
            </Flex>
            </Flex>
            <Flex direction='column' width={islessthan450?'74%':'100%'} p={2}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input type="email" name='email' id='email' placeholder="example@gmail.com" width="100%" vartiant="filled" size="lg" mt={2} onChange={onEmailChange}></Input>
            </Flex>
            <Flex direction='column' width={islessthan450?'74%':'100%'} p={2}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input type="password" name='password' id='password' placeholder="Password" width="100%" vartiant="filled" size="lg" mt={2} onChange={onPasswordChange}></Input>
            </Flex>
            <Button type="submit" colorScheme="gray" mt={2} width={islessthan450?'30%':'100%'} p={3} onClick={onSubmitRegister}>Register</Button>
          </Flex>
        </Flex>
        )
    }

export default Register
