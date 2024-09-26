// import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Label, Row } from "reactstrap";
// import Base from "../Base";
// import { useState } from "react";
// import './Login.css';
// // import { useNavigate } from "react-router-dom";
// // import { loginUser } from "../../services/user-service";

// const Login = () => {

//     // const navigate=useNavigate

//     const [loginDetail, setloginDetail] = useState({
//         username: '',
//         password: ''
//     })

//     const handleChange = (event, field) => {
//         let actualValue = event.target.value
//         setloginDetail({
//             ...loginDetail,
//             [field]: actualValue
//         })
//     }

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         console.log(loginDetail);
//     }

//     //validation 
//     // if(loginDetail.username.trim()=='' || loginDetail.password.trim()==''){
//     // toast.error("Username is required!" || "password is required!") //toast is related to backend
//     //     return;

//     //submit data to server to generate tokan
//     // loginUser(loginDetail).then((jwtTokenData)=>{
//     //     console.log("user Login: ")
//     //     console.log(jwtTokenData)
//     //     toast.success("success login!")
//     // })
//     // .catch(error=>{
//     //     console.log(error)
//     //      if(error.response.status==400 || error.response.status==404){
//     // toast.error(error.response.data.message)
//     // }else{
//     // toast.error("something went wrong")
//     // }
//     //     
//     // })
//     // };

//     //handle reset
//     const resetData = () => {
//         setloginDetail({
//             username: '',
//             password: '',
//         })
//     }


//     return (
//         <Base>
//             <Container>
//                 <Row className="mt-4">
//                     <Col sm={{ size: 6, offset: 3 }} >
//                         <Card color="dark" inverse>
//                             <CardHeader>
//                                 <h3>Login</h3>
//                             </CardHeader>
//                             <CardBody>
//                                 {/* creating form */}
//                                 <form onSubmit={handleFormSubmit}>

//                                     <FormGroup>
//                                         <Label for="email">Enter Email</Label><br />
//                                         <input id="Email" type="email" placeholder="Email" value={loginDetail.username} onChange={(e) => handleChange(e, 'username')} />
//                                     </FormGroup>

//                                     <FormGroup>
//                                         <Label for="password">Enter password</Label> <br />
//                                         <input id="password" type="password" placeholder="Password" value={loginDetail.password} onChange={(e) => handleChange(e, 'password')} />
//                                     </FormGroup>

//                                     <FormGroup>
//                                         <Label for="fp">Forget password?</Label>
//                                     </FormGroup>

//                                     <Container className="text-center">
//                                         <Button color="light" outline>Login</Button>
//                                         <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
//                                         {/* <Button color="red" className="ms-2">Cancel</Button> */}
//                                     </Container>
//                                 </form>
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </Base>
//     );
// };

// export default Login;

import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Label, Row } from "reactstrap";
import Base from "../Base";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { login } from '../../services/user-service';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    
    const [loginDetail, setLoginDetail] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (event, field) => {
        const actualValue = event.target.value;
        setLoginDetail({ ...loginDetail, [field]: actualValue });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!loginDetail.username.trim() || !loginDetail.password.trim()) {
            setError("Username and password are required!");
            return;
        }

        try {
            const data = await login(loginDetail.username, loginDetail.password);
            console.log('User Login successful:', data);
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'An unexpected error occurred');
        }
    };

    const resetData = () => {
        setLoginDetail({ username: '', password: '' });
        setError('');
    };

    return (
        <Base>
            <Container className={`login-container ${theme}-theme`}>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card className={`login-card ${theme}-theme`}>
                            <CardHeader><h3>Login</h3></CardHeader>
                            <CardBody>
                                <form onSubmit={handleFormSubmit}>
                                    <FormGroup>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            value={loginDetail.username}
                                            onChange={(e) => handleChange(e, 'username')}
                                            className={`form-input ${theme}-theme`}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            value={loginDetail.password}
                                            onChange={(e) => handleChange(e, 'password')}
                                            className={`form-input ${theme}-theme`}
                                        />
                                    </FormGroup>
                                    {error && <p className="error">{error}</p>}
                                    <FormGroup>
                                        <Label for="fp">
                                            <NavLink to="/ForgotPassword">Forgot password?</NavLink>
                                        </Label>
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button type="submit" outline>Login</Button>
                                        <Button onClick={resetData} color="secondary" className="ms-2">Reset</Button>
                                    </Container>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default Login;
