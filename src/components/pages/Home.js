import { Heading,Flex, SimpleGrid, Box, Text, Stack, Badge, Center, useColorModeValue, Image, useMediaQuery } from '@chakra-ui/react'
import React,{useState, useEffect} from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'

function Home({user,auth}) {
    const [budgets, setBudgets] = useState([])
    const cardColor = useColorModeValue('#e2e8f0','#060a14')
    const cardContainer = useColorModeValue('#FAFAFF','#30343F')
    const [islessthan960] = useMediaQuery("(min-width: 960px)")
    const [islessthan450] = useMediaQuery("(min-width: 450px)")
    let usersid = useParams()
    
    useEffect(() => {
        const abortCont = new AbortController();
        fetch(`https://thawing-retreat-57636.herokuapp.com/dashboard/${usersid.id}`,{signal: abortCont.signal})
        .then(res=>res.json())
        .then(data=>{
            setBudgets(data)
        })
        .catch(console.log)
        return () => abortCont.abort();
    },[usersid])

    if(!auth){
        return <Redirect to='/' />
    }

    return (
        <div>
            <Flex marginLeft={islessthan960 ? '250px' : '0px'} p={4} direction='column' overflowX='hidden'>
            <Flex direction={islessthan450?'row':'column'} background={cardContainer} height='70vh' alignItems='center' justifyContent='center' p={islessthan450?6:2} borderRadius={10} boxShadow='xs'>
                <Flex direction='column' p={islessthan450?4:0} m={4}>
                <Heading size={islessthan960 ? '2xl' : islessthan450 ? 'xl':'md'} textAlign={islessthan450?'left':'center'} color='#ff725e' p={2}>Hello {user.name}!</Heading>
                <Heading size={islessthan960 ? '2xl' : islessthan450 ? 'xl':'md'} textAlign={islessthan450?'left':'center'} color='#ff725e' mt={2} p={2}>Welcome to budgetman!</Heading>
                <Text fontSize={islessthan450?'2xl':'xl'} mt={4} color='#7d95ff' textAlign={islessthan450?'left':'center'} fontWeight='extrabold'>Create and visualize your cashflows <i class="fas fa-chart-pie"></i></Text>
                </Flex>
                <Image src='/images/rain.png' height={islessthan450 ? '90%' : '40%'} />
            </Flex>
            <Flex direction='column' mt={4} background={cardContainer} borderRadius={10} boxShadow='xs' alignItems={islessthan450?'normal':'center'}>
            <Text mt={4} fontSize='3xl' fontWeight='hairline'>Your Budgets</Text>
            <SimpleGrid minChildWidth='350px' spacing={4} mt={1} p={4}>
            {   
                budgets.length === 0 ?
                <Flex direction='column' alignItems='center'>
                <Text>Seems like its empty out here. Create a new budget now!</Text>
                <Image src='/images/save.png' mt={4} width='40%' />
                </Flex> 
                :
                budgets.map(budget=>{
                    return (
                        <Box justifySelf='center' as={Link} to={`/dashboard/${user.userid}/${budget.budget_id}`} key={budget.budget_id} width={islessthan450?'100%':'90%'} height='300px' boxShadow='lg' rounded='md' background={cardColor}>
                            <Text textAlign='center' fontSize='3xl' p={4} mt={8} bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip='text'>{budget.name}</Text>
                            <Center mt={6}> 
                            <Stack direction='row' spacing={4}>
                            <Stack>
                                <Badge colorScheme='green'>Income</Badge>
                                <Text textAlign='center' color='whatsapp.500' fontSize={islessthan450?'3xl':'xl'}>{budget.income}</Text>
                            </Stack>
                            <Stack>
                                <Badge colorScheme='red'>Expenditure</Badge>
                                <Text textAlign='center' color='red.500' fontSize={islessthan450?'3xl':'xl'}>{budget.expenditure}</Text>
                            </Stack>
                            <Stack>
                                <Badge colorScheme='blue'>Savings</Badge>
                                <Text textAlign='center' color='blue.300' fontSize={islessthan450?'3xl':'xl'}>{budget.income - budget.expenditure}</Text>
                            </Stack>
                            </Stack>
                            </Center>
                            {/* <Image src='/images/divider.png' width='50%' /> */}
                        </Box>
                    )
                })
            }
            </SimpleGrid>
            </Flex>
            </Flex>
        </div>
    )
}

export default Home
