import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import chatAiImage from "../../images/aiImg.png";
import "animate.css";

const chatbotResponses = [
  {
    keywords: ["email", "bidder"],
    response:
      "Go to E-mail Communication Module → Compose e-mail - Bidders Specific.",
  },
  {
    keywords: ["dashboards"],
    response:
      "You can access the dashboard under the MSKVY 2.0 Dashboards section.",
  },
  {
    keywords: ["create", "user"],
    response: "Go to the Admin Panel → Create New User section.",
  },
  {
    keywords: ["tendering", "status"],
    response:
      "Check LOI status in SPV Tendering - Cluster → Letter Of Intent (LOI).",
  },
  {
    keywords: ["land", "status"],
    response:
      "Navigate to Land - Cluster Approach → ALL Substation Land Status.",
  },
  {
    keywords: ["project", "execution"],
    response: "Check Project Execution Tracking → Project Progress Monitoring.",
  },
  {
    keywords: ["grievance", "status"],
    response: "Go to Grievance Redressal Module → Grievance Redressal Report.",
  },
  {
    keywords: ["help"],
    response:
      "You can ask about Dashboard, User Management, Tendering, Land Status, Project Execution, Emails, and Grievance Redressal.",
  },
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "Bot",
      text: "Hi! I am Chatbot. Ask me about the MSKVY 2.0 Portal.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const chatContainerRef = useRef(null);

  // useEffect(() => {
  //   setTimeout(() => setAnimate(true), 500);
  // }, []);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const findBestMatch = (userMessage) => {
    const words = userMessage.toLowerCase().split(" ");
    for (let entry of chatbotResponses) {
      if (entry.keywords.some((keyword) => words.includes(keyword))) {
        return entry.response;
      }
    }
    return "I'm sorry, I don't understand that command.";
  };

  const handleSendMessage = async (message) => {
    const userMessage = message || userInput;
    if (!userMessage.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "User", text: userMessage }]);
    setUserInput("");
    setLoading(true);

    setTimeout(() => {
      const botReply = findBestMatch(userMessage);
      setChatHistory((prev) => [...prev, { sender: "Bot", text: botReply }]);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {!open && (
        <Box
          // className={animate ? "animate__animated animate__slideInUp" : ""}
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            backgroundColor: "#212529",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "white",
            width: "60px",
            height: "60px",
            padding: "5px",
            borderRadius: "50%",
            border: "2px solid white",
            // box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
            boxShadow: 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px'
          }}
        >
          <img width="100%" src={chatAiImage} alt="Chat AI" />
        </Box>
      )}

      {open && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            width: 340,
            boxShadow: 3,
            borderRadius: 6,
            overflow: "hidden",
            zIndex: 1000,
            backgroundColor:'#F5F5F5',
            border: '2px solid #212529'
            // backgroundImage:
            //   "linear-gradient(rgba(119, 178, 238, 0.28), rgba(135, 217, 242, 0.4)), url(https://images.unsplash.com/photo-1724041875334-0a6397111c7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
          }}
        >
      
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              py: 0.7,
              px: 1.2,
              backgroundColor: "#FFF",
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight:'bold !important', fontFamily:'Quantico, sans-serif !important', fontSize: "20px" }}>
              Chatbot
            </Typography>
            <IconButton
              onClick={() =>
                setChatHistory([
                  {
                    sender: "Bot",
                    text: " Hi! I am Chatbot. Ask me about MSKVY 2.0.",
                  },
                ])
              }
              sx={{ color: "#212529" }}
            >
              <RestartAltRoundedIcon />
            </IconButton>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#212529" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
          mt={1}
            ref={chatContainerRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 350,
              overflowY: "auto",
              gap: 1,
              p: 1,
              "&::-webkit-scrollbar": {
                width: "0px",
                background: "transparent",
              },
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
            }}
          >
            {chatHistory.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent:
                    msg.sender === "User" ? "flex-end" : "flex-start",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                
                <Box
                  sx={{
                    backgroundColor:
                      msg.sender === "User" ? "#FFF" : "#ff6c4b  ",
                    color: msg.sender === "User" ? "#2A2A2A" : "#FFF",
                    // boxShadow: 'rgb(0, 0, 0) 3px 4px 1px',
                    borderTop:'1px solid #212529' ,
                    borderLeft: msg.sender === "User" ? '1px solid #212529' : '4px solid #212529',
                    borderRight: msg.sender === "User" ? '4px solid #212529' : '1px solid #212529',
                    borderBottom:'4px solid #212529',
                    padding: "8px",
                    borderRadius: '12px',
                    maxWidth: "75%",
                  }}
                >
                  <Typography sx={{ fontSize: "12px" }}>{msg.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* <Stack
            direction="row"
            spacing={1}
            sx={{
              p: 1,
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                width: "0px",
                background: "transparent",
              },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {chatbotResponses.map((q, index) => (
              <Button
                key={index}
                size="small"
                sx={{
                  textTransform: "none",
                  fontSize: "11px",
                  minWidth: "max-content",
                  fontWeight:'600 !important',
                  backgroundColor: "#F4F4F4",
                  border: "2px solid #E4E4E4",
                  padding:'6px 8px',
                  // boxShadow: 'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px',
                  "&:hover": { backgroundColor: "rgba(243, 243, 243, 0.85)" },
                  color: "#2b2d42",
                }}
                onClick={() => handleSendMessage(q.response)}
              >
                {q.keywords.join(" ").toLocaleUpperCase()}
              </Button>
            ))}
          </Stack> */}
          <Box p={1}>
          <Box sx={{ display: "flex", p: 0.7, bgcolor: "#FFF", borderTop:'1px solid #212529', borderLeft:'1px solid #212529', borderBottom:'4px solid #212529', borderRight:'4px solid #212529', borderRadius:'25px'}}>
            <TextField
              variant="standard"
              placeholder="Ask something..."
              fullWidth
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#212529",
                  padding: "5px", // Adjust padding for better spacing
                },
                "& .MuiInput-underline:before": { borderBottom: "none !important" },
                "& .MuiInput-underline:after": { borderBottom: "none !important" },
                "& .MuiInput-underline:hover:before": { borderBottom: "none !important" },
                "& .MuiInputBase-root": { padding: "0 5px" },
              }}
            
            />
            {/* <Button
              sx={{ minWidth: "20px", bgcolor:'#ff6c4b', borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center' }}
              onClick={handleSendMessage}
              disabled={loading}
            >
            </Button> */}
            <Box p={1} sx={{bgcolor:'#ff6c4b', aspectRatio:'1', cursor:'pointer',  borderRadius:'50px', display:'flex', justifyContent:'center', alignItems:'center'}}>
              {/* <CloseIcon /> */}
              <SendRoundedIcon sx={{ marginBottom:'2px', marginLeft:'2px', fontSize: "20px", color: "#FFF", transform:'rotate(-30deg)' }} />
            </Box>
          </Box>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Chatbot;
