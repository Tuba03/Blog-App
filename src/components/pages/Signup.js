// import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Label, Row, Toast } from "reactstrap";
// import Base from "../Base";
// import { useEffect, useState } from "react";
// // import {signUp} from "../services/user-service";

// const Signup = () => {

//     const [data, setData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         about: '',
//     })

    
//     // const [error, setError] = useState({
//     //     errors: {},
//     //     isError: false
//     // })

//     //   const [preview, setPreview] = useState(null); // State for profile photo preview
//     // const [error, setError] = useState({
//     //     errors: {},
//     //     isError: false
//     // });

//     // useEffect(() => {
//     //     console.log(data);
//     // }, [data])

//     const [preview, setPreview] = useState(null); // For storing file preview URL

//     // Handle changes to input fields and file input
//     const handleChange = (event, property) => {
//         if (property === 'profilePhoto') {
//             const file = event.target.files[0];
//             setData({ ...data, [property]: file });

//             // Create and set preview URL
//             if (file) {
//                 const fileUrl = URL.createObjectURL(file);
//                 setPreview(fileUrl);
//             } else {
//                 setPreview(null);
//             }
//         } else {
//             setData({ ...data, [property]: event.target.value });
        
//     };
//     //handle change
//     // const handleChange = (event, property) => {

//         // //dynamic setting values
//         // setData({ ...data, [property]: event.target.value })
//         // const [file, setFile] = useState();

//         // console.log(event.target.files);
//         // setFile(URL.createObjectURL(event.target.files[0]));

        
//     }

//     //resetting the form
//     const resetData = () => {
//         setData({
//             name: '',
//             email: '',
//             password: '',
//             about: '',
//         })
//     }

//     //submit form
//     const submitForm = (event) => {
//         event.preventDefault();

//         // if (error.isError) {
//         //     toast.error("Form data is invalid!,correct all details.");
//         //     return;
//         // }

//         console.log(data);
//         //validate data


//         //call server api for sending data
//         // Signup(data).then((resp) => {  //here signup is from services/signup-services which i need to make
//         //         console.log(resp);
//         //         console.log("Sucess log");
//         //         toast.success("User is registered successfully!!");
//         //         setData({
//         //             name: '',
//         //             email: '',
//         //             password: '',
//         //             about: '',
//         //         });
//         //     })
//         //     .catch((error) => {
//         //         console.log(error);
//         //         console.log("Error log");

//         //         //handle errors in proper way
//         //         setError({
//         //             errors: error,
//         //             isError: true
//         //         })
//         //     });
//     };


//     return (
//         <Base>
//             <Container>
//                 <Row className="mt-4">

//                     {/* { JSON.stringify(data)} */}

//                     <Col sm={{ size: 6, offset: 3 }} >
//                         <Card color="dark" inverse>
//                             <CardHeader>
//                                 <h3>Sign In</h3>
//                             </CardHeader>
//                             <CardBody>
//                                 {/* creating form */}
//                                 <form onSubmit={submitForm}>
//                                     <FormGroup>
//                                         {/* <Label for="name">Enter Name</Label><br /> */}
//                                         <input id="name" type="text" placeholder="Name" onChange={(e) => handleChange(e, 'name')} value={data.name} />
//                                     </FormGroup>

//                                     <FormGroup>
//                                         {/* <Label for="email">Enter Email</Label><br /> */}
//                                         <input id="Email" type="email" placeholder="Email" onChange={(e) => handleChange(e, 'email')} value={data.email} />
//                                     </FormGroup>

//                                     <FormGroup>
//                                         {/* <Label for="password">Enter password</Label> <br /> */}
//                                         <input id="password" type="password" placeholder="Password" onChange={(e) => handleChange(e, 'password')} value={data.password} />
//                                     </FormGroup>

//                                     <FormGroup>
//                                         {/* <Label for="about">About</Label><br /> */}
//                                         <input id="about" type="textarea" placeholder="Write About yourself..." style={{ height: "150px" }} onChange={(e) => handleChange(e, 'about')} value={data.about} />
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Label for="profilePhoto">Profile Photo</Label>
//                                         <input id="profilePhoto" type="file" onChange={(e) => handleChange(e, 'profilePhoto')} className="form-control" />
//                                         {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}
//                                         </FormGroup>

//                                     <Container className="text-center">
//                                         <Button color="light" outline>Register</Button>
//                                         <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
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

// export default Signup;import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Label, Row } from "reactstrap";
import Base from "../Base";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Label, Row } from "reactstrap";
// import './Signup.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { signUp } from '../../services/user-service';

const Signup = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    // const [error, setError] = useState('');

    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: '',
        profilepic: 'null', // This should be a URL or base64 if not a file upload
        joiningdate: '',
    });
    // const [error, setError] = useState({
    //     errors: {},
    //     isError: false
    // })
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        console.log(data);
    }, [data])

    const handleChange = (event, property) => {
        if (property === 'profilepic') {
            const file = event.target.files[0];
            if (file) {
                const fileUrl = URL.createObjectURL(file);
                setPreview(fileUrl);
                setData({ ...data, [property]: fileUrl });
            }
        } else {
            setData({ ...data, [property]: event.target.value });
        }
    };



    const nextStep = () => {
        if (step === 1) {
            if (!data.name || !data.email || !data.password) {
                alert('Please fill in all required fields.');
                return;
            }
            if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(data.password)) {
                alert('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.');
                return;
            }
        } else if (step === 2) {
            if (!data.about) {
                alert('Please write about yourself.');
                return;
            }
        }
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userDto = {
            id: 0, // Adjust as needed
            name: data.name,
            email: data.email,
            password: data.password,
            about: data.about,
            profilepic: data.profilepic,
            joiningdate: new Date().toISOString(),
        };

        try {
            const response = await signUp(userDto);
            console.log('User registered successfully:', response);

            // Check if response contains token or user details
            if (response.token) {
                localStorage.setItem('authToken', response.token); // Example of storing the token
            }

            alert('Signup successful!');
            navigate('/Login');
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <Base>
            <Container className={`login-container ${theme}-theme`}>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card className={`login-card ${theme}-theme`}>
                            <CardHeader>
                                <h3>Sign Up</h3>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={handleSubmit}>
                                    {step === 1 && (
                                        <>
                                            <FormGroup>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Full Name"
                                                    onChange={(e) => handleChange(e, 'name')}
                                                    value={data.name}
                                                    className={`form-input ${theme}-theme`}
                                                    required
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Email"
                                                    onChange={(e) => handleChange(e, 'email')}
                                                    value={data.email}
                                                    className={`form-input ${theme}-theme`}
                                                    required
                                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                    title="Please enter a valid email address."
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    onChange={(e) => handleChange(e, 'password')}
                                                    value={data.password}
                                                    className={`form-input ${theme}-theme`}
                                                    required
                                                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                                                    title="Password must be at least 8 characters long and include an uppercase letter, a number, and a special character."
                                                />
                                            </FormGroup>
                                            <Container className="text-center">
                                                <Button type="button" onClick={nextStep} className={`form-input ${theme}-theme`}>Next</Button>
                                            </Container>
                                        </>
                                    )}
                                    {step === 2 && (
                                        <>
                                            <FormGroup>
                                                <input
                                                    id="about"
                                                    type="textarea"
                                                    placeholder="Write About yourself..."
                                                    style={{ height: "100px" }}
                                                    onChange={(e) => handleChange(e, 'about')}
                                                    value={data.about}
                                                    className={`form-input ${theme}-theme`}
                                                    required
                                                />
                                            </FormGroup>
                                            <Container className="text-center">
                                                <Button type="button" onClick={prevStep} color="secondary" className={`form-input ${theme}-theme me-2`}>Back</Button>
                                                <Button type="button" onClick={nextStep} className={`form-input ${theme}-theme`}>Next</Button>
                                            </Container>
                                        </>
                                    )}
                                    {step === 3 && (
                                        <>
                                            <FormGroup className="profile-photo-group">
                                                <div className={`profile-photo-upload ${theme}-theme`}>
                                                    <input
                                                        id="profilePhoto"
                                                        type="file"
                                                        onChange={(e) => handleChange(e, 'profilepic')}
                                                        className="profile-photo-input"
                                                        accept="image/*"
                                                        required
                                                    />
                                                    <Label htmlFor="profilePhoto" className={`profile-photo-label ${theme}-theme`}>
                                                        {preview ? (
                                                            <img src={preview} alt="Profile Preview" className="profile-photo-preview" />
                                                        ) : (
                                                            <div className="profile-photo-placeholder">
                                                                <p className="text-center">Choose a photo</p>
                                                            </div>
                                                        )}
                                                    </Label>
                                                </div>
                                            </FormGroup>
                                            <Container className="text-center">
                                                <Button type="button" onClick={prevStep} color="secondary" className={`form-input ${theme}-theme me-2`}>Back</Button>
                                                <Button type="submit" className={`form-input ${theme}-theme`}>Register</Button>
                                            </Container>
                                        </>
                                    )}
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default Signup;
