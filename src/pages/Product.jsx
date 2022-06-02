import styled from 'styled-components'
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import { Add, Remove } from '@material-ui/icons'
import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { publicRequest } from '../requestMethods'
import { addCart } from '../redux/cartRedux'
import { addCarts } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

const Container = styled.div`
    
`
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({padding:"10px", flexDirection:"column"})}
`
const ImgContainer = styled.div`
    flex: 1;
    ${mobile({display:"flex",alignItems:"cener", justifyContent:"center"})}
`
const Image = styled.img`
    margin-left: 50px;
    width: 80%;
    height: 90vh;
    object-fit: cover;
    ${mobile({height:"40vh",marginLeft:"0px"})}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px;
    padding: 0px 50px;
    ${mobile({padding:"10px"})}
`
const Title = styled.h1`
    font-weight: 500;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 200;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({width:"100%"})}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid ${props =>{
        return props.color === props.selected ? 'black' : 'lightgray'
    }};
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    ${mobile({width:"100%"})}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const [product,setProduct] = useState({})
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.currentUser ? state.user.currentUser._id : null)


    useEffect(()=>{
        const getProduct = async() =>{
            try{
                const res = await publicRequest.get("./products/find/"+id)
                setProduct(res.data)
                setColor(res.data.color[0])
                setSize(res.data.size[0])
            } catch{}
        }
        getProduct()
    },[id])

    const handleQuantity = (type) => {
        if (type === "dec") {
          quantity > 1 && setQuantity(quantity - 1);
        } else {
          setQuantity(quantity + 1);
        }
      };

    const handleClick = () => {
        dispatch(
        addCart({ ...product, quantity, color, size, time: Date.parse(new Date())})
        );
    };
    const handleClickDB = () => {
        const products = {
            productId: product._id,
            title: product.title,
            desc: product.desc,
            img: product.img,
            price: product.price,
            quantity: quantity, 
            size: size,
            color: color, 
        };
        addCarts({userId, products, }, dispatch)
    };

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <ImgContainer>
                <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>
                    {product.desc}
                </Desc>
                <Price>$ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.color?.map(c => (
                            <FilterColor color={c} selected={color} key={c} onClick={() => setColor(c)} />
                        ))}
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e) => setSize(e.target.value)}>
                            {product.size?.map(s => (
                                <FilterSizeOption key={s}>{s}</FilterSizeOption>
                            ))}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                    <Remove onClick={() => handleQuantity("dec")} />
                        <Amount>{quantity}</Amount>
                    <Add onClick={() => handleQuantity("inc")} />
                    </AmountContainer>
                    <Button onClick={handleClick}>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default Product