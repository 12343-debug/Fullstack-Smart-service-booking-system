import { useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import AnimatedPage from "../../components/AnimatedPage";
import BackButton from "../../components/BackButton";
import { addService } from "../../services/servicesApi";
import toast from "react-hot-toast";


const AddService = () => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAddService = async () => {
    try {
      setSaving(true);
      await addService({ title, icon, image, price, estimatedDuration });

      setTitle("");
      setIcon("");
      setImage("");
      setPrice("");
      setEstimatedDuration("");
      toast.success("Service added successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add service");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageWrapper>
      <AnimatedPage>
        <BackButton sx={{ mb: 2 }} />
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
            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              label="Estimated Duration"
              fullWidth
              margin="normal"
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
              placeholder="Example: 45 mins"
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={saving}
              onClick={handleAddService}
            >
              {saving ? "Adding..." : "Add Service"}
            </Button>
          </CardContent>
        </Card>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default AddService;
