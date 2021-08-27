import { Center, Divider, Flex, Heading, Image, Text, Stack, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router'
import {Bar, Line} from 'react-chartjs-2'
import { Radio, RadioGroup } from "@chakra-ui/react"

function Profile({user,auth}) {
    const cardContainer = useColorModeValue('#FAFAFF','#30343F')
    const [userdetail, setUserdetail] = useState([])
    const [value, setValue] = useState("Bar")
    const [islessthan960] = useMediaQuery("(min-width: 960px)")
    const [islessthan450] = useMediaQuery("(min-width: 450px)")
    let profileid = useParams()

    useEffect(() => {
        fetch(`https://thawing-retreat-57636.herokuapp.com/profile/${profileid.id}`)
        .then(res => res.json())
        .then(user => setUserdetail(user))
        .catch(err => console.log('unable to fetch'))
    },[profileid])

    let label = []
    let dataset = []
    let savings = []

    userdetail.forEach(tag => {
        label.push(tag.name)
    })
    userdetail.forEach(tag => {
        dataset.push(tag.expenditure)
    })
    userdetail.forEach(tag => {
        savings.push(tag.income-tag.expenditure)
    })

    const state = {
        labels: label,
        datasets: [
          {
            label: 'expenditure',
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1,
            data: dataset
          },
          {
            label: 'savings',
            data: savings,
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 1
          }
        ]
      }

      if(!auth){
        return <Redirect to='/' />
      }

    return (
        <Flex marginLeft={islessthan960 ? '260px':'0px'} direction='column'>
            <Flex m={2} background={cardContainer} borderRadius={10} direction={islessthan960 ? 'row':'column'} boxShadow='xs'>
                {
                    islessthan960 ? 
                    <Flex alignItems='center' direction='column' p={6} width={islessthan960 ? '40%':'80%'}>
                    <Image src='/images/profile.png' width='80%' />
                    <Text color='gray.500' fontSize='xl'>@{user.userid}</Text>
                    </Flex>
                    :
                    <Center>
                    <Flex alignItems='center' direction='column' p={6} width={islessthan960 ? '40%':'80%'}>
                    <Image src='/images/profile.png' width={islessthan450?'80%':'50%'} />
                    <Text color='gray.500' fontSize='xl'>@{user.userid}</Text>
                    </Flex>
                    </Center>
                }
            <Flex>
            <Divider orientation='vertical' /> 
            </Flex>
            <Flex m={6} p={6} direction='column'>
                <Heading size={islessthan450?'xl':'md'} textAlign='left' color='whatsapp.300'>Have a look at yourself {user.name}!</Heading>
                <Divider mt={4} />
                <Text textAlign='left' fontSize={islessthan960 ? '2xl' :islessthan450?'xl':'md'} mt={4}>Name - {user.name}</Text>
                <Divider mt={4} />
                <Text textAlign='left' fontSize={islessthan960 ? '2xl' : islessthan450?'xl':'md'} mt={4}><EmailIcon/> {user.email}</Text>
                <Divider mt={4} />
                <Text textAlign='left' fontSize={islessthan960 ? '2xl' : islessthan450?'xl':'md'} mt={4}>Joined - {user.joined.slice(0,10)}</Text>
                <Divider mt={4} />
                <Text textAlign='left' fontSize={islessthan960 ? '2xl' : islessthan450?'xl':'md'} mt={4}>Budgets - {userdetail.length}</Text>
            </Flex>
            </Flex>
            {
                userdetail.length === 0 ?
                <Flex direction='column' justifyContent='center' alignItems='center'>
                <Heading mt={8} fontWeight='hairline'>You have no budgets yet. Create one now!</Heading>
                <Image src='/images/empty.png' width='50%' />
                </Flex> 
                :
                <Flex direction='column'>
                <Heading size={islessthan450?'xl':'md'} mt={4}>Your expenses and Savings</Heading>
                <Center>
                <RadioGroup onChange={setValue} value={value} mt={4}>
                <Stack direction="row">
                    <Radio value="Bar">Bar</Radio>
                    <Radio value="Line">Line</Radio>
                </Stack>
                </RadioGroup>
                </Center>
                <Center>
                {
                    value === 'Bar' ?

                    <Flex width={islessthan960 ? '75%' : '100%'} p={3} mt={6}>
                    <Bar data={state}/>
                    </Flex>
                    :
                    <Flex width={islessthan960 ? '75%' : '100%'} p={3} mt={6}>
                    <Line data={state}/>
                    </Flex>
                }
                </Center>
                </Flex>
            }
        </Flex>
    )
}

export default Profile
