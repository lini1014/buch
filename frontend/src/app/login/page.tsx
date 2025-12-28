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

   

