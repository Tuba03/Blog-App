// import React, { useState } from 'react';
// import { Card, CardBody, CardHeader, Col, Container, FormGroup, Row } from 'reactstrap';
// import "./pages/ForgotPassword.css";


// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       // Simulate API call to send OTP
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setMessage('If the email exists, OTP has been sent.');
//     } catch (error) {
//       setMessage('There was an error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

//       <Row className='mt-4'>
//         <Col sm={{ size: 5, offset: 3 }}>
//           <Card className="Forgot-password">
//             <CardHeader>
//               <h2>Forgot Your Password?</h2>
//             </CardHeader>
//             <CardBody>
//               <p>Enter your email address and we'll send you a OTP to set your password.</p>
//               <form onSubmit={handleSubmit}>
//                 <FormGroup>
//                   <label htmlFor="email">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </FormGroup>
//                 <Container>
//                   <button type="submit" className="text-center" disabled={loading}>
//                     {loading ? 'Sending...' : 'Send OTP'}
//                   </button>
//                 </Container>
//               </form>
//             </CardBody>
//             {message && <p className="message">{message}</p>}
//           </Card>
//         </Col>
//       </Row>

//   );
// };

// export default ForgotPassword;



import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Row } from 'reactstrap';
import { sendOtp, verifyOtp } from '../services/user-service'; // Import functions
// import "./ForgetPassword";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await sendOtp(email);
            setMessage('If the email exists, OTP has been sent.');
            setStep(2);
        } catch (error) {
            setMessage('There was an error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await verifyOtp(email, otp);
            setMessage('OTP verified successfully. You can now reset your password.');
        } catch (error) {
            setMessage('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row className='mt-4'>
            <Col sm={{ size: 5, offset: 3 }}>
                <Card>
                    <CardHeader>
                        <h2>Forgot Your Password?</h2>
                    </CardHeader>
                    <CardBody>
                        {step === 1 ? (
                            <>
                                <p>Enter your email address and we'll send you an OTP to set your password.</p>
                                <form onSubmit={handleEmailSubmit}>
                                    <FormGroup>
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <Container>
                                        <button type="submit" className="text-center" disabled={loading}>
                                            {loading ? 'Sending...' : 'Send OTP'}
                                        </button>
                                    </Container>
                                </form>
                            </>
                        ) : (
                            <>
                                <p>Enter the OTP sent to your email to verify and reset your password.</p>
                                <form onSubmit={handleOtpSubmit}>
                                    <FormGroup>
                                        <label htmlFor="otp">OTP</label>
                                        <input
                                            type="text"
                                            id="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <Container>
                                        <button type="submit" className="text-center" disabled={loading}>
                                            {loading ? 'Verifying...' : 'Verify OTP'}
                                        </button>
                                    </Container>
                                </form>
                            </>
                        )}
                    </CardBody>
                    {message && <p className="message">{message}</p>}
                </Card>
            </Col>
        </Row>
    );
};

export default ForgotPassword;
