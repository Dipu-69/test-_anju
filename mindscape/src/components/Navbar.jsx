import { AppBar, Toolbar, IconButton, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <AppBar position="sticky" color="transparent" elevation={0} className="backdrop-blur bg-ink-900/60">
      <Toolbar className="max-w-7xl mx-auto w-full px-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-semibold">Mindscape</span>
        </Link>
        <div className="ml-auto hidden md:flex items-center gap-2">
          <Button component={Link} to="/resources" color="inherit">Resources</Button>
          <Button component={Link} to="/self-assessment" color="inherit">Self-Assessment</Button>
          <Button component={Link} to="/medical-help" color="inherit">Medical Help</Button>
          <Button variant="contained" color="primary" component={Link} to="/contact">Contact</Button>
        </div>
        <IconButton className="md:hidden ml-auto" onClick={() => setOpen(!open)} aria-label="Open menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          <Button component={Link} to="/resources" color="inherit" onClick={() => setOpen(false)}>Resources</Button>
          <Button component={Link} to="/self-assessment" color="inherit" onClick={() => setOpen(false)}>Self-Assessment</Button>
          <Button component={Link} to="/medical-help" color="inherit" onClick={() => setOpen(false)}>Medical Help</Button>
          <Button variant="contained" component={Link} to="/contact" onClick={() => setOpen(false)}>Contact</Button>
        </div>
      )}
    </AppBar>
  )
}