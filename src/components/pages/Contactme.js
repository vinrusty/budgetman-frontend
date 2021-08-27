import { EmailIcon } from '@chakra-ui/icons'
import { Flex, Heading, Text, Link } from '@chakra-ui/react'
import React from 'react'

function Contactme(){
    return (
        <div>
            <Flex height='40vh' background='#060a14' direction='column' alignItems='center' justifyContent='center'>
                <Heading color='#fff' fontWeight='hairline'>Contact me!</Heading>
                <Text color='#fff'><EmailIcon m={2} />vineethhr2002@gmail.com</Text>
                <Flex alignItems='center' justifyContent='center'>
                    <Text color='#fff' m={2} fontSize='5xl' cursor='pointer'><Link href='https://www.linkedin.com/in/vineeth-h-52055b11b/'><i class="fab fa-linkedin"></i></Link></Text>
                    <Text color='#fff' m={2} fontSize='5xl' cursor='pointer'><Link href='https://www.instagram.com/vineeth_athreya/'><i class="fab fa-instagram"></i></Link></Text>
                    <Text color='#fff' m={2} fontSize='5xl' cursor='pointer'><Link href='https://twitter.com/vineethhr1'><i class="fab fa-twitter"></i></Link></Text>
                </Flex>
                <Text color='#fff' mt={4}>Made by Choco aka Vineeth HR :)</Text>
            </Flex>
        </div>
    )
}

export default Contactme
