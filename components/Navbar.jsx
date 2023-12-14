"use client"
import { Box, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [value,setValue]=useState("")
  const [fetchData,setFetchData]=useState([])
  const navArray = ["Home", "About"];
  const navLinks = ["/", "about"];
  const [controller, setController] = useState(null);
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetchCity = async (city) => {
  


    if (controller) {
      // Abort the previous fetch if it exists
      controller.abort();
    }

    const newController = new AbortController();
    setController(newController);

    try {
      const url = await fetch(
        `https://openweathermap.org/data/2.5/find?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02&units=m`,
        {
          method: "get",
          signal: newController.signal, // Use the new AbortSignal
        }
      );
      if (!newController.signal.aborted) {
        const response = await url.json();
        setFetchData(response.list || []);
      }
    } catch (error) {
      // Handle fetch error
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value.trim().length > 0) {
      fetchCity(value);
    }
  }, [value]);
  return (
    <Box
      component="nav"
      sx={{
        height: { xs: "65px", sm: "75px" },
        paddingTop: "5px",
        width: "100%",
      }}
    >
      <List
        sx={{
          display: "flex",
          alignItems: "center",
          p: 0,
          px: { xs: 1, md: 2 },
        }}
      >
        <ListItem sx={{ p: 0 }}>
          <Box>
            <Link href="/">
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "4.8vw", sm: "4vw", md: "28px" } }}
              >
                Weather Globe
              </Typography>
            </Link>
          </Box>
        </ListItem>
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {navArray.map((e, i) => (
            <ListItem key={e}>
              <Link href={navLinks[i]}>{e}</Link>
            </ListItem>
          ))}
        </Box>

        <ListItem sx={{ width: { xs: "100%", sm: "50%" } }}>
          <Box sx={{ width: "100%", position: "relative" }}>
            <input
              type="text"
              style={{
                width: "100%",
                outline: "none",
                paddingInline: "10px",
                paddingBlock: "5px",
                borderRadius: "50px",
                color: "black",
              }}
              placeholder="Place..."
              value={value}
              onChange={handleChange}
              onClick={() => setShow(true)}
              onBlur={() => setShow(false)}
            />
            {show &&<Box
              sx={{
                position: "absolute",
                px: 2,
                py: 1,
                bgcolor: "rgba(0, 0, 0, 0.47)",
                marginTop: "5px",
                borderRadius: "10px",
                minWidth: "150px",
                maxWidth:"100%",
                width:{sm:"100%"},
                height: "auto",
              }}
            >
              {fetchData.length>0?fetchData.map((e,i)=><Box key={i} sx={{marginBottom:"5px"}}  onMouseDown={(e) => e.preventDefault()} >
                <Link href={`/${e.id}`}>
                  <Typography sx={{"&:hover":{textDecoration:"underline",wordWrap:"break-word"}}}>{e.name},{" "}{e.sys.country}</Typography>
                </Link>
                </Box>):"No Result"}
            </Box>}
          </Box>
        </ListItem>
        <ListItem
          sx={{ display: { xs: "initial", sm: "none" }, width: "auto" }}
        >
          <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{color:"white",minWidth:"auto",p:0,fontSize:"20px"}}
        onClick={handleClick}
        disableRipple
      >
        <MenuIcon/>
      </Button>
       
        </ListItem>
      </List>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem  onClick={handleClose}><Link href={`/`} style={{fontSize:"17px"}}>Home</Link></MenuItem>
        <MenuItem  onClick={handleClose}><Link href={`/about`} style={{fontSize:"17px"}}>About</Link></MenuItem>
      </Menu>
    </Box>
    
  );
}

export default Navbar;
