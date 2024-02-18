'use client';
import { Inter } from "next/font/google";
import { createTheme } from '@mui/material/styles';

const inter = Inter({ subsets: ["latin"], weight: ['300', '400', '500', '700'], display: 'swap' });

const theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
    },
});

export default theme;