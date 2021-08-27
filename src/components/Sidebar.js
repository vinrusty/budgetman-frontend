import React,{useRef} from 'react'
import {Box, Flex, Text, Button, useColorMode, useColorModeValue, Image, useMediaQuery, useDisclosure, Link} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from "@chakra-ui/react"

function Sidebar({user, isAuthorized}) {

    const {colorMode, toggleColorMode} = useColorMode()
    const sideBarBackground = useColorModeValue("#e2e8f0","#060a14")
    const textColor = useColorModeValue("black","white")
    const [islessthan960] = useMediaQuery("(min-width: 960px)")
    const [islessthan450] = useMediaQuery("(min-width: 450px)")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    

    return (
        <div>
            {
                islessthan960 ? 
                <Box width="250px" background={sideBarBackground} height="99vh" position="fixed" m={1} borderRadius={10} boxShadow='lg'>
                <Flex direction='column' alignItems='center' justifyContent='center'>
                    <Image src='/images/clipart.png' width='60%' mt={6}/>
                    <Text fontSize='xl' mt={2} color={textColor}>{user.name}</Text>
                </Flex>
                <Flex direction='column' alignItems='center' height="75%">
                    <Box as={NavLink} activeClassName='nav-active' to={`/dashboard/${user.userid}`} mt={6}  height="50px" cursor='pointer'  width="95%" borderRadius={5}>
                    <Text m={2} fontSize='xl' fontWeight='bold' color={textColor}>Home</Text>
                    </Box>
                    <Box as={NavLink} mt={2} activeClassName='nav-active' to={`/budget`} height='50px' cursor='pointer'  width="95%" borderRadius={5}>
                    <Text m={2} fontSize='xl' fontWeight='bold' color={textColor}>Create Budget</Text>
                    </Box>
                    <Box as={NavLink} activeClassName='nav-active' to={`/profile/${user.userid}`} height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
                    <Text m={2} fontSize='xl' fontWeight='bold' color={textColor}>My Profile</Text>
                    </Box>
                    <Flex mt={4}>
                    <Button as={NavLink} to='/' onClick={()=>isAuthorized('signout')} m={1} width='100px' colorScheme='gray' border='1px solid gray'>Sign Out</Button>
                    <Button border='1px solid gray' m={1} width='50px' colorScheme='gray' onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon /> }</Button>
                    </Flex>
                    <Image src='/images/budgetillustration.jpg' width='70%' mt={6} borderRadius='50%' />
                    <Flex direction='column' mt='auto'>
                    <Flex alignItems='center' justifyContent='center'>
                    <Text m={2} cursor='pointer'><Link href='https://www.linkedin.com/in/vineeth-h-52055b11b/'><i class="fab fa-linkedin"></i></Link></Text>
                    <Text m={2} cursor='pointer'><Link href='https://www.instagram.com/vineeth_athreya/'><i class="fab fa-instagram"></i></Link></Text>
                    <Text m={2} cursor='pointer'><Link href='https://twitter.com/vineethhr1'><i class="fab fa-twitter"></i></Link></Text>
                    <Text m={2} cursor='pointer'><Link href='https://github.com/vinrusty'><i class="fab fa-github"></i></Link></Text>
                    </Flex>
                    <Text color={textColor}>Made by Choco</Text>
                    </Flex>
                </Flex>
            </Box>
                :
                <Flex>
                <Flex p={6} width='100%'>
                    <HamburgerIcon boxSize={10} cursor='pointer' onClick={onOpen} />
                    <Flex ml='auto'>
                    <Button m={1} as={NavLink} to='/' onClick={()=>isAuthorized('signout')} width='100px' colorScheme='gray' border='1px solid gray'>Sign Out</Button>
                    <Button m={1} border='1px solid gray' width='50px' colorScheme='gray' onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon /> }</Button>
                    </Flex>
                    <Drawer
                        isOpen={isOpen}
                        placement="left"
                        onClose={onClose}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Welcome to budgetman!</DrawerHeader>

                        <DrawerBody>
                        <Flex direction='column' alignItems='center' justifyContent='center'>
                        <Image src='/images/clipart.png' width='60%' mt={6}/>
                        <Text fontSize='xl' mt={2} color={textColor}>{user.name}</Text>
                        </Flex>
                        <Flex direction='column' alignItems='center' height='30%'>
                            {/* <Box as={NavLink} activeClassName='nav-active' to='/dashboard' mt={6}  height="50px" cursor='pointer' onClick={onClose} width="100%" borderRadius={5}>
                            <Text m={2} fontSize='xl' fontWeight='bold' color={textColor}>Home</Text>
                            </Box> */}
                            <Box as={NavLink} activeClassName='nav-active' to={`/dashboard/${user.userid}`} mt={6}  height="50px" cursor='pointer' onClick={onClose} width="100%" borderRadius={5}>
                            <Text m={2} fontSize='xl' fontWeight='bold' color={textColor}>Home</Text>
                            </Box>
                            <Box as={NavLink} mt={2} activeClassName='nav-active' to={`/budget`} height='50px' cursor='pointer' onClick={onClose} width="100%" borderRadius={5}>
                            <Text m={2} fontSize='xl' fontWeight='bold' color={textColor}>Create Budget</Text>
                            </Box>
                            <Box as={NavLink} activeClassName='nav-active' to={`/profile/${user.userid}`} height='50px' cursor='pointer' mt={2} onClick={onClose} width="100%"  borderRadius={5}>
                            <Text m={2} fontSize='xl' fontWeight='bold' color={textColor}>My Profile</Text>
                            </Box>
                            <Image src='/images/budgetillustration.jpg' width={islessthan450?'50%':'35%'} mt={6} borderRadius='50%' />
                        </Flex>
                        </DrawerBody>

                        <DrawerFooter>
                        <Flex direction='column'>
                            <Flex alignItems='center' justifyContent='center'>
                            <Text m={2} cursor='pointer'><Link href='https://www.linkedin.com/in/vineeth-h-52055b11b/'><i class="fab fa-linkedin"></i></Link></Text>
                            <Text m={2} cursor='pointer'><Link href='https://www.instagram.com/vineeth_athreya/'><i class="fab fa-instagram"></i></Link></Text>
                            <Text m={2} cursor='pointer'><Link href='https://twitter.com/vineethhr1'><i class="fab fa-twitter"></i></Link></Text>
                            <Text m={2} cursor='pointer'><Link href='https://github.com/vinrusty'><i class="fab fa-github"></i></Link></Text>
                            </Flex>
                            <Text color={textColor}>Made by Choco</Text>
                        </Flex>
                        </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </Flex>
                </Flex>
            }
        </div>
    )
}

export default Sidebar
