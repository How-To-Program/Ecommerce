import { Add, Remove, DeleteForeverOutlined } from '@material-ui/icons'
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
import { Link } from 'react-router-dom'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding:"10px"})}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    cursor: ${props => props.type !== "filled" && "pointer"};;
    padding: 10px;
    font-weight: 600;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
    ${mobile({display:"none"})}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    justify-content: flex-end;
    ${mobile({flexDirection:"column"})}
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    margin: 10px 5px;
    padding: 5px 0;
    border: 0.5px solid lightslategray;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection:"column"})}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    border-radius: 10px;
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid lightgray;
    background-color: ${props=>props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${mobile({flexDirection:"row", justifyContent:"space-between"})}
`
const DeleteContainer = styled.div`
    margin-bottom: 20px;
    color: #8d1313;
    cursor: pointer;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({margin:"5px 15px"})}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({marginBottom:"20px"})}
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`
const Summary = styled.div`
    margin-top: auto;
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 40vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "500"};
    font-size: ${props=>props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    cursor: pointer;
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`
const KEY = process.env.REACT_APP_STRIPE
const Cart = () => {
    const userId = useSelector(state => state.user.currentUser ? state.user.currentUser._id : null)
    const cart = useSelector(state => state.cart)
    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onToken = (token) => {
        setStripeToken(token)
    }
    // const [carts, setCarts] = useState([])
    // useEffect(()=>{
    //     const getCarts = async (userId)=> {
    //       try{
    //         const res = await userRequest.get(`/carts/${userId}`)
    //         setCarts(res.data)
    //       } catch {}
    //     }
    //     getCarts(userId)
    // },[])
    
    // useEffect(()=>{
    // getCarts(userId, dispatch)
    // },[dispatch])

    useEffect(()=>{
        const makeRequest = async ()=>{
            try{
                // const res = await userRequest.post("./checkout/payment",JSON.stringify({
                //     tokenId: stripeToken.id,
                //     amount: 500,
                // }));
                const dummydata = {
                    billing_details:{
                        address: 'SG'
                    },
                }
                navigate("/success", {state: {
                    // stripeData: res.data,
                    stripeData: dummydata,
                    products: cart,
                }})
            } catch(err){
                console.log(err)
            }
        }
        stripeToken && makeRequest()
    },[stripeToken, cart.total, navigate])
    const quantity = useSelector(state=>state.cart.quantity)
    const handleAdd = (props) => {
        const product = {...props, quantity: quantity+1};
        dispatch(
        updateaddCart(product, dispatch)
        );
    };
    const handleRemove = (props) => {
        const product = {...props, quantity: quantity-1};
        dispatch(
            updatereduceCart(product, dispatch)
        )
    };
    const handleDelete = (props) => {
        const product = {...props};
        dispatch(
            deleteCart(product, dispatch)
        );
    };
    const handleDeleteDB = (props) => {
        const product = {...props};
        deleteCarts(userId, product, dispatch)
    };
  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <Link to="/">
                    <TopButton>CONTINUE SHOPPING</TopButton>
                </Link>
                <TopTexts>
                    <TopText>Shopping Bag({quantity})</TopText>
                    <TopText>Your Wishlist(0)</TopText>
                </TopTexts>
                <TopButton type="filled">TOTAL</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products?.map(product => (
                        <Product key={product._id}>
                            <ProductDetail>
                                <Image src={product.img} />
                                <Details>
                                    <ProductName><b>Product: </b>{product.title}</ProductName>
                                    <ProductId><b>ID: </b>{product._id}</ProductId>
                                    <ProductId><b>Color: </b></ProductId>
                                    <ProductColor color={product.color}/>
                                    <ProductSize><b>Size: </b>{product.size}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <DeleteContainer><DeleteForeverOutlined onClick={()=>handleDelete(product)}/></DeleteContainer>
                                <ProductAmountContainer>
                                    <Add style={{cursor:'pointer'}} onClick={()=>handleAdd(product)}/>
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Remove style={{cursor:'pointer'}} onClick={product.quantity===1?()=>handleDelete(product):()=>handleRemove(product)}/>
                                </ProductAmountContainer>
                                <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                            </PriceDetail>
                        </Product>
                    ))}
                    <Hr />
                    
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    {userId ? 
                    <StripeCheckout
                        name="YT Shop"
                        image="https://i.ibb.co/gwmCqqt/image-tanya.jpg"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cart.total}`}
                        amount={cart.total * 100}
                        token={onToken}
                        stripeKey = {KEY}
                    >
                        <Button>CHECKOUT NOW</Button>
                    </StripeCheckout> :
                     <Link to="/login">
                         <Button>SIGN IN NOW</Button>
                     </Link>
                     }
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Cart