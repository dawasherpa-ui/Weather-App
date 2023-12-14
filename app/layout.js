import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import { Box } from '@mui/material'
import Navbar from '@/components/Navbar'
import { LocationProvider } from '@/context/Context'

const inter = Roboto({ subsets: ['latin'],weight:["400"] })

export const metadata = {
  title: 'Weather Globe',
  description: 'Get realtime weather of any place',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocationProvider>
        <Box sx={{minHeight:"100vh",maxHeight:"auto",background:"linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",color:"white"}}>
          <Navbar/>
          <main>{children}</main>
        </Box>
        </LocationProvider>
      </body>
    </html>
  )
}
