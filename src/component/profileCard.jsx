import * as React from "react";
import Dialog from "@mui/material/Dialog";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

export default function ProfileCard({ open, onClose }) {
  const userName = localStorage.getItem("UserName");
  const mail = localStorage.getItem("email");
  const phone = localStorage.getItem("phoneNumber");
  const createdOn = localStorage.getItem('Createdon');

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    ></Box>
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card sx={{ width: 300, color: "black", background: "#d5f5e3" }}>
          <CardContent>
            <Avatar
              alt={userName?.toUpperCase()}
              src="/static/images/avatar/2.jpg"
            />
            <br />
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              User profile :
            </Typography>
            <br />
            <Typography variant="h5" component="div">
              Welcome {userName}
            </Typography>
            <br />
            <Typography variant="body2">Mail : {mail}</Typography>
            <br />
            <Typography variant="body2">Phone Number : {phone}</Typography>
            <br />
            <Typography variant="body2">User Created On: {createdOn}</Typography>
            <br />
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
}
