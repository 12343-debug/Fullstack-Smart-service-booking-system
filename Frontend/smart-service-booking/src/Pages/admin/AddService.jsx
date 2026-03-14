import { useState } from "react";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import AnimatedPage from "../../components/AnimatedPage";
import BackButton from "../../components/BackButton";
import { addService } from "../../services/servicesApi";
import toast from "react-hot-toast";
import AdminNavbar from "./AdminNavBar";
import PageHero from "../../components/PageHero";


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
    <PageWrapper theme="sunset" maxWidth="xl" containerSx={{ px: { xs: 2, md: 4 } }}>
      <AnimatedPage>
        <BackButton sx={{ mb: 2 }} />
        <AdminNavbar />
        <PageHero
          eyebrow="New Service"
          title="Create services with pricing, visuals, and duration details"
          description="This form is now laid out like a real product editor so admins can add catalog entries faster and with more confidence."
          tone="sunset"
          stats={[
            { label: "Title Ready", value: title ? "Yes" : "No" },
            { label: "Image Linked", value: image ? "Yes" : "No" },
            { label: "Price Added", value: price ? "Yes" : "No" },
          ]}
          sx={{ mt: 3 }}
        />
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} lg={7}>
            <Card
              sx={{
                borderRadius: 4,
                border: "1px solid rgba(249, 115, 22, 0.16)",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.74), rgba(255,237,213,0.84))",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <Typography variant="h5" sx={{ color: "#173d32", mb: 0.6 }}>
                  Service Details
                </Typography>
                <Typography sx={{ color: "var(--muted)", mb: 2.5 }}>
                  Define the title, icon, image, price, and expected service duration in one place.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <TextField
                      label="Service Title"
                      fullWidth
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Icon"
                      fullWidth
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Image URL"
                      fullWidth
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Price"
                      type="number"
                      fullWidth
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Estimated Duration"
                      fullWidth
                      value={estimatedDuration}
                      onChange={(e) => setEstimatedDuration(e.target.value)}
                      placeholder="Example: 45 mins"
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.4,
                    borderRadius: 999,
                    background: "linear-gradient(135deg, #173d32, #0f766e)",
                    boxShadow: "0 14px 28px rgba(20, 83, 45, 0.22)",
                  }}
                  disabled={saving}
                  onClick={handleAddService}
                >
                  {saving ? "Adding..." : "Add Service"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                border: "1px solid rgba(124, 104, 72, 0.16)",
                background:
                  "linear-gradient(160deg, rgba(23, 61, 50, 0.96), rgba(15, 118, 110, 0.88))",
                color: "#fffaf2",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <Typography sx={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", opacity: 0.78 }}>
                  Live Preview
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, mb: 1.5 }}>
                  {title || "Your new service"}
                </Typography>
                <Typography sx={{ opacity: 0.86, mb: 3 }}>
                  {estimatedDuration || "Add an expected duration to help customers understand the visit scope."}
                </Typography>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.16)",
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 42, mb: 1 }}>{icon || "🛠"}</Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
                      {title || "Service title"}
                    </Typography>
                    <Typography sx={{ mt: 1, opacity: 0.84 }}>
                      {price ? `Rs. ${Number(price).toLocaleString("en-IN")}` : "Set a price to show customers upfront value."}
                    </Typography>
                    <Typography sx={{ mt: 0.8, opacity: 0.84 }}>
                      {image ? "Image linked and ready to use." : "Image URL not added yet."}
                    </Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default AddService;
