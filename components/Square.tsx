import React from 'react';
import Box from "@mui/material/Box";


interface SquareProps {
  color: 'secondary' | 'primary' | 'success';
  id: number;  
}

const Square: React.FC<SquareProps> = ({ color, id }) => {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: color + ".dark", 
        position: 'relative', 
        "&:hover": {
          backgroundColor: color + ".main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
    </Box>
  );
};

export default Square;