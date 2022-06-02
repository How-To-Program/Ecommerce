import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import StripeCheckout from 'react-stripe-checkout'
import { userRequest } from '../requestMethods'
import { useNavigate } from 'react-router-dom'
import { 
    updateaddCart, 
    updatereduceCart, 
    deleteCart 
} from '../redux/cartRedux'
import { 
    deleteCarts,
    getCarts 
} from '../redux/apiCalls'
import { useDispatch } from 'react-redux'

const Container = styled.div``
const PageTitle = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding:"10px"})}
`
const Orders = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    justify-content: space-between;
`
const OrderCard = styled.div`
    flex: 1;
    min-width: 450px;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 10px;
    margin: 20px 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`
const Top = styled.div`
    display: flex;
    justify-content: space-between;
`
const OrderId = styled.span`
    font-size: 16px;
`
const Status = styled.button`
    font-size: 16px;
    padding: 5px 7px;
    border: none;
    border-radius: 10px;
    background-color: ${props =>{
        if(props.status === 'pending') return '#ebf1fe'
        else if(props.status === 'completed') return '#e5faf2'
        else return '#fff0f1'
    }};
    color : ${props =>{
        if(props.status === 'pending') return '#2a7ade'
        else if(props.status === 'completed') return '#3bb077'
        else return '#d95087'
    }};
`
const Products = styled.div`
    display: flex;
    padding: 3px 0;
`
const ProductImg = styled.img`
    flex: 1;
    width: 40px;
    border-radius: 3px;
`
const ProductInfo = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const TitleLine = styled.span`
    padding: 0 10px;
`
const Line = styled.div`
    margin-left: auto;
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
`
const ProductTitle = styled.span``
const Title = styled.span``
const ProductColor = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid lightgray;
    background-color: ${props=>props.color};
`
const Bottom = styled.span`
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
`
const Address = styled.span``
const Total = styled.span``

const Order = () => {
    const userId = useSelector(state => state.user.currentUser ? state.user.currentUser._id : null)
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        const getOrders = async ()=> {
        try{
            const res = await userRequest.get(`./orders/find/${userId}`)
            setOrders(res.data)
            
            setOrders((prev) =>
            [...prev].sort((a, b) => b.time - a.time)
            )
        ;
        } catch {}
        }
        getOrders()
    },[])

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <PageTitle>Past Orders</PageTitle>
            <Orders>
            {orders?.map(order=>(
                    <OrderCard>
                        <Top>
                            <OrderId><b>OrderId : </b>{order._id}</OrderId>
                            <Status status={order.status}>{order.status}</Status>
                        </Top>
                        {order.products?.map(product=>(
                            <Products>
                                <ProductImg src={product.img}/>
                                <ProductInfo>
                                    <TitleLine>
                                        <ProductTitle><b>{product.title}</b></ProductTitle>
                                    </TitleLine>
                                    <Line>
                                        <Title><b>Size: </b>{product.size}</Title>
                                        <ProductColor color={product.color}/>
                                    </Line>
                                    <Line>
                                        <Title><b>${product.price}</b></Title>
                                        <Title><b>x {product.quantity}</b></Title>
                                    </Line>
                                </ProductInfo>
                            </Products>
                        ))}
                        <Bottom>
                            <Address><b>Shipping Address: </b>{order.address}</Address>
                            <Address><b>Created At: </b>{order.createdAt}</Address>
                            <Total><b>Total Amount: </b>$ {order.amount}</Total>
                        </Bottom>
                    </OrderCard>
            ))}
            </Orders>
        </Wrapper>
        <Footer />
    </Container>
)}

export default Order