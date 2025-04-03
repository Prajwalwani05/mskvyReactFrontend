import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';


const style = (title) => ({
    display: "grid",
    placeItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: title === "Congrats !!" ? "4px solid #38A12F" : "4px solid rgb(161, 94, 47)",
    borderRadius: "10px",
    boxShadow: 24,
    p: 3,
  });

export default function TransitionsModal({ open, onClose, title, message, img }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style(title)}>
            <Box mb={1} mr={1}>
            {img}
            </Box>
            <Typography id="transition-modal-title" component="h5">
            {title}
            </Typography>
            <Typography mt={1} sx={{textAlign:'center', fontSize:'13px'}}>{message}</Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}