import React, { useState } from 'react';
import contactServices from '../services/contactServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const CreateContact = () => {
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        phone: '',
        enquire: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactData({
            ...contactData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await contactServices.createContact(contactData);
            toast.success('Request sent successfully! 🎉'); // Success notification
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error creating contact:', error.message);
            toast.error('Failed to send request. Please try again.'); // Error notification
        }
    };

    if (isSubmitted) {
        return (
            <Box sx={{ textAlign: 'center', margin: '30px auto', padding: '20px' }}>
                <Typography variant="h4" color="primary" marginTop={11}>
                    Thank you for contacting us!
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ marginTop: '10px' }}>
                    We will get back to you shortly.Our Call center perosn call you
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                maxWidth: '500px',
                margin: '24px auto', // Added explicit marginTop here
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    padding: '30px',
                    borderRadius: '10px'
                }}
            >
                <Typography variant="h5" color="primary" textAlign="center" gutterBottom>
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={contactData.name}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={contactData.email}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={contactData.phone}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Your Enquiry"
                        name="enquire"
                        value={contactData.enquire}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '20px', padding: '10px 0' }}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
            <ToastContainer />
        </Box>
    );
};

export default CreateContact;
