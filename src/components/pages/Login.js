// src/components/pages/Login.js
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Label, Row } from "reactstrap";
import Base from "../Base";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the Auth context
import { login } from '../../services/user-service';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth(); // Destructure the login function from context
    
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
            authLogin(); // Call the login function to update context
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
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card>
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
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            value={loginDetail.password}
                                            onChange={(e) => handleChange(e, 'password')}
                                        />
                                    </FormGroup>
                                    {error && <p className="error">{error}</p>}
                                    <FormGroup>
                                        <Label for="fp">
                                            <NavLink to="/ForgotPassword">Forgot password?</NavLink>
                                        </Label>
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button type="submit">Login</Button>
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
