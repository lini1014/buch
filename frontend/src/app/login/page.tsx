'use client';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Stack,
    TextField,
    Typography,
    FormControlLabel,
    Switch,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../lib/auth';

export default function LoginPage() {
    const { login, isLoading, error } = useAuth();
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('p');
    const [isLight, setIsLight] = useState(false);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: isLight ? '#f2f2f2' : '#121212',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background-color 0.3s ease',
            }}
        >
            {/* Hintergrund-Rahmen */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'grid',
                    placeItems: 'center',
                    pointerEvents: 'none',
                    '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        borderRadius: '32px',
                    },
                    '&::before': {
                        inset: { xs: '32px', md: '64px' },
                        bgcolor: isLight ? '#ffffff' : '#181818',
                        transition: 'background-color 0.3s ease',
                    },
                    '&::after': {
                        inset: { xs: '72px', md: '110px' },
                        bgcolor: isLight ? '#f7f7f7' : '#0f0f0f',
                        transition: 'background-color 0.3s ease',
                    },
                }}
            />

            {/* Banner */}
            <Box
                sx={{
                    position: 'absolute',
                    top: { xs: 12, sm: 24 },
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: isLight ? '#d9d9d9' : '#303030',
                    px: { xs: 3, sm: 4 },
                    py: { xs: 2, sm: 2.5 },
                    borderRadius: '10px',
                    boxShadow: '0 16px 46px rgba(0,0,0,0.32)',
                    border: '1px solid #3d3d3d',
                }}
            >
                <Box
                    component="img"
                    src="/hka-banner.png"
                    alt="Hochschule Karlsruhe"
                    sx={{
                        height: { xs: 92, sm: 118 },
                        width: { xs: 320, sm: 420 },
                        maxWidth: '85vw',
                        display: 'block',
                        objectFit: 'contain',
                    }}
                />
            </Box>

            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                <Card
                    sx={{
                        bgcolor: isLight ? '#ffffff' : '#8b8b8b',
                        borderRadius: '24px',
                        boxShadow: '0 18px 60px rgba(0,0,0,0.45)',
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                        <Stack
                            spacing={3}
                            component="form"
                            onSubmit={(event) => {
                                event.preventDefault();
                                void login(username, password);
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={1.5}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <PersonOutlineRoundedIcon
                                    sx={{ color: isLight ? '#444' : '#f5f5f5' }}
                                />
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: isLight ? '#444' : '#f5f5f5',
                                        fontWeight: 700,
                                        letterSpacing: 0.4,
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Login
                                </Typography>
                            </Stack>

                            <TextField
                                placeholder="Benutzername"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                required
                                autoComplete="username"
                                InputProps={{
                                    sx: {
                                        bgcolor: '#d9d9d9',
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            <TextField
                                placeholder="Passwort"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                                autoComplete="current-password"
                                InputProps={{
                                    sx: {
                                        bgcolor: '#d9d9d9',
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            {error && (
                                <Alert severity="error" variant="filled">
                                    {error}
                                </Alert>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                sx={{
                                    mt: 1,
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                }}
                            >
                                {isLoading ? 'Anmelden…' : 'Anmelden'}
                            </Button>
                            <Button
                                component={Link}
                                href="/"
                                variant="text"
                                sx={{ color: '#1a1a1a', fontWeight: 600 }}
                            >
                                Zur Startseite
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>

    
    );
}
