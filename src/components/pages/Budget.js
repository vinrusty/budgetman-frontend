import { Box, Button, Flex, FormLabel, Heading, Input, useColorModeValue, Text, useToast, useMediaQuery } from '@chakra-ui/react'
import { CloseIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import React,{useState} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
function Budget({user,auth}) {

    const _defaultTag = [
        {
            name: '',
            amount: 0,  
        }
    ]

    const [inputTags, setInputTags] = useState(_defaultTag);
    const [income, setIncome] = useState('');
    const [exp, setExp] = useState(0);
    const [name, setName] = useState('');
    const toast = useToast();
    const cardColor = useColorModeValue('#e2e8f0','#060a14');
    const cardContainer = useColorModeValue('#FAFAFF','#30343F');
    const [islessthan960] = useMediaQuery("(min-width: 960px)")
    const [islessthan450] = useMediaQuery("(min-width: 450px)")
    let history = useHistory();

    if(!auth){
        return <Redirect to='/' />
    }
    const onAdd = () =>{
        setInputTags(prevTags=>[...prevTags, {
            name: '',
            amount: 0,
        }])   
    }
    const onChangeNum = (event) =>{
        const _tempCost = [...inputTags]
        _tempCost[event.target.dataset.id][event.target.name] = event.target.value;
        setInputTags(_tempCost)
        setExp(getTotalCosts())
    }
    const onIncomeChange = (event) =>{
        setIncome(event.target.value)
    }
    const onNameChange = (event) => {
        setName(event.target.value)
    }
    const getTotalCosts = () => {
        return inputTags.reduce((total, item) => {
          return total + Number(item.amount);
        }, 0);
    }
    const onSave = () =>{
        fetch(`https://thawing-retreat-57636.herokuapp.com/budget`,{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userid: user.userid,
                name: name,
                income: income,
                exp: exp,
                tags: inputTags
            })
        })
        .then(res=>res.json())
        .then(budgets=>{
            if(budgets[0].user_id){
                toast({
                    title: 'Successfully created the budget!',
                    status: 'success'
                })
                history.push(`/dashboard/${user.userid}`)
            }
        })
        .catch(err => console.log('unable to save'))
    }
    
    const onClickDelete = (i) =>{
        const _tempTags = [...inputTags]
        setInputTags(_tempTags.filter((s, index)=> i !== index))
    }

    return (
        <div>
            <Flex marginLeft={islessthan960 ? '250px' : '0px'} p={6} direction='column'>
                <Heading textAlign='left'>Create your Budget</Heading>
                <FormLabel mt={6}>Enter the buget name: </FormLabel>
                <Input width={islessthan960 ? '75%' : '100%'} onChange={onNameChange} name='income' placeholder='Example budget' type='text' variant='filled' mt={1}></Input>
                <FormLabel mt={1}>Enter your income: </FormLabel>
                <Input width={islessthan960 ? '75%' : '100%'} onChange={onIncomeChange} name='income' placeholder='Enter your income here' type='text' variant='filled' mt={1}></Input>
                <FormLabel mt={4}>Enter your expenses here:</FormLabel>
                <Flex direction='column' boxShadow='xs' padding={4} mt={1} width={islessthan960 ? '80%' : '100%'} borderRadius={10}>
                {
                    inputTags.map((tag, index)=>{
                        return (
                            <Flex mt={4} width={islessthan450?'85%':'100%'} key={index}>
                            <Input data-id={index} value={tag.name} onChange={onChangeNum} name='name' type='text' placeholder='Example Budget' variant='outline'></Input>
                            <Input ml={1} data-id={index} value={tag.amount} onChange={onChangeNum}  name='amount' type='number' placeholder='' variant='outline' width={islessthan450?'20%':'50%'}></Input>
                            <Button ml={2} id={index} onClick={() => onClickDelete(index)}><CloseIcon cursor='pointer' /></Button>
                            </Flex>
                        )
                    })
                }
                <Flex>
                <Button type='submit' width={islessthan450?'10%':'100%'} m={2} onClick={onAdd}>Add</Button>
                <Button type='submit' width={islessthan450?'10%':'100%'} m={2} onClick={onSave}>Save</Button>
                </Flex>
                </Flex>
                <Flex direction={islessthan450?'row':'column'} mt={6} width={islessthan960 ? '75%' : '100%'} boxShadow='xs' borderRadius={10} alignItems='center' justifyContent='center' background={cardContainer}>
                <Box background={cardColor} height='200px' width='300px' m={islessthan450?6:2} borderRadius={10}>
                <Text fontSize='2xl' textAlign='center' mt={6} p={6}>The Expenditure is:</Text>
                <Heading color='red.500'>{getTotalCosts()} <ArrowDownIcon/></Heading>
                </Box>
                <Box background={cardColor} height='200px' width='300px' m={islessthan450?6:2} borderRadius={10}>
                <Text fontSize='2xl' textAlign='center' mt={6} p={6}>You can save or invest:</Text>
                <Heading color='whatsapp.500'>{Number(income) - getTotalCosts()} <ArrowUpIcon/></Heading>
                </Box>
                </Flex>
            </Flex>
        </div>
    )
}

export default Budget
