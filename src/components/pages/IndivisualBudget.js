import { Button, Flex, Heading, useDisclosure, useToast, Input, FormLabel, useColorModeValue, Center, useMediaQuery } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay} from "@chakra-ui/react"
import {Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from "@chakra-ui/react"
import { Doughnut } from 'react-chartjs-2'
import {Redirect} from 'react-router-dom'

function IndivisualBudget({auth}) {
    let obj = useParams()
    const [budgetName, setBudgetName] = useState('')
    const [budgetIncome, setBudgetIncome] = useState('')
    const [budgetExp, setBudgetExp] = useState('')
    const [budgetTags, setbudgetTags] = useState([])
    const cardContainer = useColorModeValue('#FAFAFF','#30343F');
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [Open , setOpen] = useState(false)
    const [islessthan960] = useMediaQuery("(min-width: 960px)")
    const [islessthan450] = useMediaQuery("(min-width: 450px)")
    const cancelRef = useRef()
    let history = useHistory();
    const toast = useToast();
    
    useEffect(() => {
        const abortCont = new AbortController();
        fetch(`https://thawing-retreat-57636.herokuapp.com/dashboard/${obj.iduser}/${obj.id}`,{signal: abortCont.signal})
        .then(res => res.json())
        .then(data => {
            setBudgetName(data.name)
            setBudgetIncome(data.income)
            setBudgetExp(data.expenditure)
            setbudgetTags(data.tags)
        })
        .catch(err => console.log('there was an error in fetching'))
        return () => abortCont.abort();
    },[obj.iduser,obj.id])
    
    const onClosing = () => setOpen(false)

    if(!auth){
        return <Redirect to='/' />
    }

    let chartLabels = []
    let chartData = []

    const colors = ['#C98FCB','#390713','#16B784',
                    '#2542FA','#F776FA','#E05B8E',
                    '#6EAA2A','#8CA4D4','#CCF630',
                    '#3A4B47','#E3EDC1','#303BCD',
                    '#E4E0FF','#58B4C4','#FC161F']

    budgetTags && budgetTags.forEach(tag => {
        chartLabels.push(tag.name)
        chartData.push(tag.amount)
    })
    
    const state = {
        labels: chartLabels,
        datasets: [
          {
            label: chartLabels,
            backgroundColor: colors,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: chartData
          }
        ]
      }

    const onClickDelete = () =>{
        fetch(`https://thawing-retreat-57636.herokuapp.com/dashboard/${obj.iduser}/${obj.id}`, {
            method: 'delete',
            body: null
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        history.push(`/dashboard/${obj.iduser}`)
        toast({
            title: 'Successfully deleted the budget!',
            status: 'success'
        })
    }
    const onAdd = () =>{
        setbudgetTags(prevTags=>[...prevTags, {
            name: '',
            amount: 0,
        }])   
    }
    const onChangeNum = (event) =>{
        const _tempCost = [...budgetTags]
        _tempCost[event.target.dataset.id][event.target.name] = event.target.value;
        setbudgetTags(_tempCost)
        setBudgetExp(getTotalCosts())
    }
    const onIncomeChange = (event) =>{
        setBudgetIncome(event.target.value)
    }
    const onNameChange = (event) => {
        setBudgetName(event.target.value)
    }
    const onClickUpdateDelete = (i) =>{
        const _tempTags = [...budgetTags]
        setbudgetTags(_tempTags.filter((s, index)=> i !== index))
    }
    const getTotalCosts = () => {
        return budgetTags.reduce((total, item) => {
          return total + Number(item.amount);
        }, 0);
    }

    const onClickUpdate = () =>{
        fetch(`https://thawing-retreat-57636.herokuapp.com/dashboard/${obj.iduser}/${obj.id}`, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: budgetName,
                income: budgetIncome,
                exp: budgetExp,
                tags: budgetTags
            })
        })
        .then(res => res.json())
        .then(data=>{
            if(data.success){
                toast({
                    title: 'Successfully updated the budget!',
                    status: 'success'
                })
                history.push(`/dashboard/${obj.iduser}`)
            }
            else{
                toast({
                    title: 'Couldn;t update try again!',
                    status: 'error'
                })
            }
        })
        .catch(err => console.log('there was an error in updating'))
    }

    return (
        <Flex marginLeft={islessthan960 ? '260px':'0px'} direction='column' alignItems={islessthan450?'normal':'center'}>
           <Heading textAlign={islessthan960 ? 'left':'center'} p={2}>{budgetName}</Heading>
           <Table width={islessthan960 ? '85%':'95%'} variant="simple" m={6} p={6} size='lg' boxShadow='md' borderRadius={10} background={cardContainer}>
            <TableCaption>Expenditure and Savings</TableCaption>
            <Thead>
                <Tr>
                <Th>Name</Th>
                <Th isNumeric>Amount</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    budgetTags && budgetTags.map((tag,index) => {
                        return(
                            <Tr key={index}>
                            <Td>{tag.name}</Td>
                            <Td isNumeric>{tag.amount}</Td>
                            </Tr>
                        )
                    })
                }
                <Tr>
                <Td>Expenses</Td>
                <Td isNumeric>{budgetExp}</Td>
                </Tr>
            </Tbody>
            </Table>
            <Flex justifyContent={islessthan960 ? 'flex-start':'center'}>
            <Button width={islessthan960 ? '10%':islessthan450?'30%':'50%'} colorScheme='red' ml={6} onClick={() => setOpen(true)}>Delete</Button>
            <Button width={islessthan960 ? '10%':islessthan450?'30%':'50%'} colorScheme='blue' ml={6} onClick={onOpen}>Update</Button>
            </Flex>
            <AlertDialog
                isOpen={Open}
                leastDestructiveRef={cancelRef}
                onClose={onClosing}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete This Budget
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClosing}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={onClickDelete} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Drawer onClose={onClose} isOpen={isOpen} size='xl'>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>Update {budgetName} </DrawerHeader>
                <DrawerBody>
                <Flex direction='column'>
                <FormLabel mt={6}>Update the buget name: </FormLabel>
                <Input width='75%' onChange={onNameChange} name='name' placeholder={budgetName} type='text' variant='filled' mt={1}></Input>
                <FormLabel mt={1}>Update your income: </FormLabel>
                <Input width='75%' onChange={onIncomeChange} name='income' placeholder={budgetIncome} type='text' variant='filled' mt={1}></Input>
                <FormLabel mt={4}>Enter your expenses here:</FormLabel>
                {
                    budgetTags && budgetTags.map((tag, index)=>{
                        return (
                            <Flex mt={4} width="100%" key={index}>
                            <Input data-id={index} value={tag.name} onChange={onChangeNum} name='name' type='text' placeholder='Example Budget' variant='outline'></Input>
                            <Input ml={1} data-id={index} value={tag.amount} onChange={onChangeNum}  name='amount' type='number' placeholder='' variant='outline' width='20%'></Input>
                            <Button ml={2} id={index} onClick={() => onClickUpdateDelete(index)}><CloseIcon cursor='pointer' /></Button>
                            </Flex>
                        )
                    })
                }
                </Flex>
                <Flex>
                <Button type='submit' width={islessthan960 ? '10%':'30%'} m={2} onClick={onAdd}>Add</Button>
                <Button type='submit' width={islessthan960 ? '10%':'30%'} m={2} colorScheme='blue' onClick={onClickUpdate} >Update</Button>
                </Flex>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Center mt={6}>
            <Flex direction='column' width={islessthan960 ? '50%':'90%'} justifyContent='center' m={6}>
                <Doughnut
                data={state}
                height={100}
                width={200}
                />
            </Flex>
            </Center>
        </Flex>
    )
}

export default IndivisualBudget
