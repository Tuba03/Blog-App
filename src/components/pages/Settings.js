// import React, { useState } from 'react';
// import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';
// import './SettingsPage.css'; // Import custom styles

// const SettingsPage = () => {
//     const [settings, setSettings] = useState({
//         username: '',
//         email: '',
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//     });

//     const handleChange = (event, field) => {
//         setSettings({
//             ...settings,
//             [field]: event.target.value
//         });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission (e.g., update user settings)
//         console.log('Updated settings:', settings);
//     };

//     return (
//         <Container className="settings-page">
//             <Card className="shadow mt-3">
//                 <CardBody>
//                     <h2>Account Settings</h2>
//                     <Form onSubmit={handleSubmit}>
//                         <FormGroup>
//                             <Label for="username">Username</Label>
//                             <Input
//                                 type="text"
//                                 id="username"
//                                 value={settings.username}
//                                 onChange={(e) => handleChange(e, 'username')}
//                                 placeholder="Enter New username"
//                             />
//                         </FormGroup>

//                         <FormGroup>
//                             <Label for="email">Email</Label><br></br>
//                             <label className='color: alert'>Email cannot be changed</label>
//                         </FormGroup>

//                         <FormGroup>
//                             <Label for="currentPassword">Current Password</Label>
//                             <Input
//                                 type="password"
//                                 id="currentPassword"
//                                 value={settings.currentPassword}
//                                 onChange={(e) => handleChange(e, 'currentPassword')}
//                                 placeholder="Enter your current password"
//                             />
//                         </FormGroup>

//                         <FormGroup>
//                             <Label for="newPassword">New Password</Label>
//                             <Input
//                                 type="password"
//                                 id="newPassword"
//                                 value={settings.newPassword}
//                                 onChange={(e) => handleChange(e, 'newPassword')}
//                                 placeholder="Enter a new password"
//                             />
//                         </FormGroup>

//                         <FormGroup>
//                             <Label for="confirmPassword">Confirm New Password</Label>
//                             <Input
//                                 type="password"
//                                 id="confirmPassword"
//                                 value={settings.confirmPassword}
//                                 onChange={(e) => handleChange(e, 'confirmPassword')}
//                                 placeholder="Confirm your new password"
//                             />
//                         </FormGroup>

//                         <Container className="text-center mt-3">
//                             <Button color="primary" type="submit">Save Changes</Button>
//                         </Container>
//                     </Form>
//                 </CardBody>
//             </Card>
//         </Container>
//     );
// };

// export default SettingsPage;



import React, { useState } from 'react';
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import './SettingsPage.css'; // Import custom styles

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (event, field) => {
        setSettings({
            ...settings,
            [field]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission (e.g., update user settings)
        console.log('Updated settings:', settings);
    };

    return (
        <Container className="settings-page">
            <Card className="shadow mt-3">
                <CardBody>
                    <h2>Account Settings</h2>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                value={settings.username}
                                onChange={(e) => handleChange(e, 'username')}
                                placeholder="Enter New username"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label><br></br>
                            <label className='color: alert'>Email cannot be changed</label>
                        </FormGroup>

                        <FormGroup>
                            <Label for="currentPassword">Current Password</Label>
                            <Input
                                type="password"
                                id="currentPassword"
                                value={settings.currentPassword}
                                onChange={(e) => handleChange(e, 'currentPassword')}
                                placeholder="Enter your current password"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="newPassword">New Password</Label>
                            <Input
                                type="password"
                                id="newPassword"
                                value={settings.newPassword}
                                onChange={(e) => handleChange(e, 'newPassword')}
                                placeholder="Enter a new password"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="confirmPassword">Confirm New Password</Label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                value={settings.confirmPassword}
                                onChange={(e) => handleChange(e, 'confirmPassword')}
                                placeholder="Confirm your new password"
                            />
                        </FormGroup>

                        <Container className="text-center mt-3">
                            <Button color="primary" type="submit">Save Changes</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default SettingsPage;
