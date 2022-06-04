import styled from "styled-components"
import { mobile } from "../responsive"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "../redux/apiCalls";


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
    ),
    url("https://i.ibb.co/712YDRY/banner-img-1.webp");
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({justifyContent:"center"})}
`
const Wrapper = styled.div`
    margin-right: 100px;
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({marginRight:"0px",width:"75%"})}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`
const Button = styled.button`
    margin: auto;
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`
const Create = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`
const Error = styled.span`
    padding-top: 5px;
    font-weight: 400;
    color: red;
    margin: auto;
`;


const Register = () => {
  const [inputs, setInputs] = useState({})
  const [confirm, setConfirm] = useState({})
  const [state, setState] = useState(true)
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault()
    const user = {...inputs};
    if(user.password === confirm.confirm){
        addUsers(user, dispatch)
    }else setState(false)
  }
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input name="username" placeholder="name" onChange={handleChange}/>
                <Input name="email" placeholder="email" onChange={handleChange}/>
                <Input name="password" placeholder="password" onChange={handleChange}/>
                <Input name="confirm" placeholder="confirm password" onChange={(e) =>  setConfirm({[e.target.name]: e.target.value })}/>
                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Create>
                    <Button onClick={handleClick}>CREAT</Button>
                    {state === false && <Error>Something went wrong... Check it!</Error>}
                </Create>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register