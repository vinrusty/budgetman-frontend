import { Divider, Flex, Image, Text, Heading, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

function About() {
    const cardContainer = useColorModeValue('#FAFAFF','#30343F')
    const [islessthan960] = useMediaQuery("(min-width: 960px)")
    const [islessthan450] = useMediaQuery("(min-width: 450px)")

    return (
        <Flex direction='column'>
            <Flex alignItems='center' direction='column' justifyContent='center' p={4} background={cardContainer} m={4} borderRadius={10} boxShadow='xl'>
                <Flex direction={islessthan450?'row':'column'} alignItems='center' justifyContent='center'>
                <Image src='/images/ssdashboard.png' width={islessthan450?'40%':'100%'} borderRadius={10} m={2} />
                <Image src='/images/ssbudget.png' width={islessthan450?'40%':'100%'} borderRadius={10} m={2} />
                </Flex>
                <Flex direction='column' p={4} width={islessthan960 ? '60%':'90%'}>
                    <Heading fontWeight='hairline' size={islessthan450?'xl':'md'}>Welcome to budgetman</Heading>
                    <Text fontSize={islessthan960 ? 'xl':'md'} textAlign='left' mt={4}>
                    Making budgets and analyzing your cashflows is an important first step towards financial freedom.
                    Create a budget and visualize your daily and monthly expenses with the help of charts.
                    </Text>
                </Flex>
            </Flex>
            <Divider />
            <Flex alignItems='center' direction='column' justifyContent='center' p={4} background={cardContainer} m={4} borderRadius={10} boxShadow='xl'>
                <Flex direction={islessthan450?'row':'column'} alignItems='center' justifyContent='center'>
                <Image src='/images/ssindbudget.png' width={islessthan450?'40%':'100%'} borderRadius={10} m={2} />
                <Image src='/images/ssindchart.png' width={islessthan450?'40%':'100%'} borderRadius={10} m={2} />
                </Flex>
                <Flex direction='column' p={4} width={islessthan960 ? '60%':'90%'}>
                    <Heading fontWeight='hairline' size={islessthan450?'xl':'md'}>Analyze your budgets using charts</Heading>
                    <Text fontSize={islessthan960 ? 'xl':'md'} mt={4} textAlign={islessthan450?'center':'left'}>
                    Get to know where you spend the most and how much you can save or invest.
                    </Text>
                </Flex>
            </Flex>
            <Divider/>
            <Flex alignItems='center' direction='column' justifyContent='center' p={4} background={cardContainer} m={4} borderRadius={10} boxShadow='xl'>
                <Flex direction={islessthan450?'row':'column'} alignItems='center' justifyContent='center'>
                <Image src='/images/ssupdate.png' width={islessthan450?'40%':'100%'} borderRadius={10} m={2} />
                </Flex>
                <Flex direction='column' p={4} width={islessthan960 ? '60%':'90%'}>
                    <Heading fontWeight='hairline' size={islessthan450?'xl':'md'}>Is there a mistake? Well, update it!</Heading>
                    <Text fontSize={islessthan960 ? 'xl':'md'} mt={4} textAlign={islessthan450?'center':'left'}>
                    Mistakes are common. Update or delete your budget whenever you want.
                    </Text>
                </Flex>
            </Flex>
            <Divider />
            <Flex alignItems='center' direction='column' justifyContent='center' p={4} background={cardContainer} m={4} borderRadius={10} boxShadow='xl'>
                <Flex direction={islessthan450?'row':'column'} alignItems='center' justifyContent='center'>
                <Image src='/images/ssprofile.png' width={islessthan450?'40%':'100%'} borderRadius={10} m={2} />
                <Image src='/images/ssprofchart.png' width={islessthan450?'40%':'100%'} borderRadius={10} m={2} />
                </Flex>
                <Flex direction='column' p={4} width={islessthan960 ? '60%':'90%'}>
                    <Heading fontWeight='hairline' size={islessthan450?'xl':'md'}>Compare between the Budgets</Heading>
                    <Text fontSize={islessthan960 ? 'xl':'md'} mt={4} textAlign={islessthan450?'center':'left'}>
                    Compare your savings and expenses with each and every budget to undertand your cashflows.
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default About
