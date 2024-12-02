import React, { useEffect, useState } from 'react';
import contactServices from '../services/contactServices';
import { Grid, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const result = await contactServices.getContacts();

                // Debugging: Log the fetched data
                console.log('Fetched contacts:', result);

                if (Array.isArray(result)) {
                    setContacts(result);
                } else {
                    throw new Error('Invalid data format: Expected an array');
                }
            } catch (error) {
                console.error('Error fetching contacts:', error.message);
                setError('Failed to load contacts');
            } finally {
                setLoading(false); // Ensure loading state is set to false
            }
        };

        fetchContacts();
    }, []);

    // Show loading spinner
    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <CircularProgress />
            </div>
        );
    }

    // Show error message
    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Alert severity="error">{error}</Alert>
            </div>
        );
    }

    // Show message if no contacts are available
    if (contacts.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Alert severity="info">No contacts available.</Alert>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Contact List
            </Typography>
            <Grid container spacing={3}>
                {contacts.map((contact) => (
                    <Grid item xs={12} sm={6} md={4} key={contact._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {contact.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Email: {contact.email}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Phone: {contact.phone}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Enquiry: {contact.enquire}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ContactList;
