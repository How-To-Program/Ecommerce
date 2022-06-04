import { Link } from "react-router-dom"
import styled from "styled-components"
import { mobile } from "../responsive"
import React from 'react'

const Container = styled.div`
    flex: 1;
    height: 70vh;
    margin: 3px;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({height:"30vh"})}
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Tittle = styled.h1`
    color: #ffffff;
    margin-top: 10px;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItem = ({item}) => {
    const [loading, setLoading] = React.useState(true);
    const ref = React.createRef();
    React.useEffect(() => {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoading(false);
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(ref.current);
  
      return () => {
        observer.disconnect();
      }
    });
  return (
    <Container key={item.id} ref={ref}>
        <Link to={`/products/${item.cat}`}>
            {
                loading ? 
                <span>'Loading...'</span> : 
                <Image src={item.img} />
            }
            <Info>
                <Tittle>{item.title}</Tittle>
                <Button>SHOP NOW</Button>
            </Info>
        </Link>
    </Container>
  )
}

export default CategoryItem