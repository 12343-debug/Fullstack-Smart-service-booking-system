import { useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import AnimatedPage from "../../components/AnimatedPage";
import api from "../../services/api";

const AddService = () => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");

  const handleAddService = async () => {
    await api.post(
      "/add-service",
      { title, icon, image },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    setTitle("");
    setIcon("");
    setImage("");
    alert("Service added successfully");
  };

  return (
    <PageWrapper>
      <AnimatedPage>
        <Card sx={{ maxWidth: 500, mx: "auto" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Add New Service
            </Typography>

            <TextField
              label="Service Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Icon (emoji or text)"
              fullWidth
              margin="normal"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />

            <TextField
              label="Image URL"
              fullWidth
              margin="normal"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleAddService}
            >
              Add Service
            </Button>
          </CardContent>
        </Card>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default AddService;