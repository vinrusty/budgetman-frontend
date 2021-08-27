import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Button, Heading, useDisclosure, Input, FormLabel, Image, useToast, Center, Text, useColorMode, useMediaQuery } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import About from './About'
import Contactme from './Contactme'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"

function FrontPage({isAuthorized, loadUser}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const {colorMode, toggleColorMode} = useColorMode();
    const [islessthan450] = useMediaQuery("(min-width: 450px)")

    let history = useHistory();
    const toast = useToast();

    const onSumbmitSignin = () => {
      fetch('https://thawing-retreat-57636.herokuapp.com/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      })
      .then(res=>res.json())
      .then(user=>{
        if(user.id){
          isAuthorized('success')
          loadUser(user)
          history.push(`/dashboard/${user.id}`)
        }
        else{
           toast({
            title: 'Email and Password is not matching!',
            status: 'error',
            isClosable: true
          })
          isAuthorized('failure')
        }
      })
      .catch(err => console.log('unable to sign in'))
    }

    const onEmailChange = (e) => {
      setLoginEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
      setLoginPassword(e.target.value)
    }

    return (
        <div>
    <Flex height="90vh" alignItems="center" justifyContent="center" flexDirection="column">
      <Image width={islessthan450?'15%':'50%'} src='/images/money.png' />
      <Heading size={islessthan450?'3xl':'lg'} mt={4} p={2} color='red.300'>Welcome to budgetman!</Heading>
      <Heading size={islessthan450?'3xl':'lg'} mt={islessthan450?4:0} p={islessthan450?2:0} color='green.300'>Lets get in, shall we?</Heading>
        <Flex alignItems="center" justifyContent="center" mt={6} width={islessthan450?'50%':'100%'}>
        <Button onClick={onOpen} size="lg" colorScheme="linkedin"  m={3} width="80%">Log in</Button>
        <Button as={Link} to='/register' size="lg" colorScheme="linkedin"  m={3} width="80%">Register</Button>
        </Flex>
        <Flex alignItems='center'>
        <Text>We have dark mode too</Text>
        <Button onClick={toggleColorMode} m={2}>{colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}</Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign in to Budget man!</ModalHeader>
                   <ModalCloseButton />
                    <ModalBody>
                    <Flex direction='column'>
                        <Center><Image src='/images/growth.jpg' width='50%' borderRadius='50%' /></Center>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input name='email' id='email' type='email' onChange={onEmailChange} variant='outline' placeholder='example@anyemail.com' mt={1}></Input>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input name='password' id='password' type='password' onChange={onPasswordChange} variant='outline' placeholder='Password' mt={2}></Input>
                    </Flex>
                    </ModalBody>
                <ModalFooter>
                <Flex justifyContent='center' width='100%'>
                    <Button onClick={onSumbmitSignin} colorScheme="blue" mr={3} width='50%'>Login</Button>
                </Flex>
            </ModalFooter>
        </ModalContent>
      </Modal>
      <About/>
      <Contactme/>
    </div>
    )
}

export default FrontPage
