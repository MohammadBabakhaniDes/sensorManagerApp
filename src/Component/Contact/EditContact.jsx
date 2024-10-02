import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePath, editSensor } from "../../slices/ContactSlice";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { grey } from "@mui/material/colors";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ContactSchema } from "../../validation/ContactValidation";
import { liver } from "../../colors/color";
import { HeightCalculation } from "../../slices/UiSlice";
import CustomForm from "../../Common/CustomForm";

const EditContact = () => {
  const dispatch = useDispatch();
  const { contactId } = useParams();
  const sensor = useSelector((state) =>
    state.contacts.items.find((item) => item.id === contactId)
  );

  const navigate = useNavigate();
  const isDark = useSelector((state) => state.theme.isDark);
  const [docHeight, setDocHeight] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(changePath(false));
  }, []);

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "auto",
    });
  }, [pathname]); // baraye inke scroll har safhe joda bashad.

  useEffect(() => {
    dispatch(HeightCalculation(docHeight + 350));
  }, [docHeight]);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setDocHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const ConvertValuesToStandardValues = (values) => {
    values.latitude = parseFloat(values.latitude);
    values.longitude = parseFloat(values.longitude);
    values.id = contactId;
  }

  const EditSensor = (values) => {
    ConvertValuesToStandardValues(values);

    dispatch(editSensor(values));
    navigate("/");
  };

  const initialValues = sensor && {
    type: sensor.type,
    unit: sensor.unit,
    latitude: sensor.latitude,
    longitude: sensor.longitude,
    details: sensor.details,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      EditSensor(values);
    },
    enableReinitialize: true,
  });

  const inputs = [
    { valueOfFormikName: "type", label: "نوع سنسور" },
    { valueOfFormikName: "unit", label: "واحد سنسور" },
    { valueOfFormikName: "latitude", label: "عرض جغرافیایی" },
    { valueOfFormikName: "longitude", label: "طول جغرافیایی" },
    { valueOfFormikName: "details", label: "توضیحات" },
  ];

  if (typeof sensor === "undefined") {
    return (
      <Typography variant="h4" textAlign={"center"}>
        لطفا چند لحظه صبر کنید ...
      </Typography>
    );
  } else {
    return (
      <>
        {/* <Typography>&nbsp;</Typography> */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: { xs: "80%", sm: 560, md: 850, lg: 1220 },
            m: "0 auto",
            mt: 13,
            backgroundColor: isDark ? grey[900] : "",
          }}
        >
          <div ref={measuredRef}>
            <Typography
              variant="h5"
              fontWeight="bold"
              fontSize={27}
              mb={5}
              color={isDark ? "#00e5ff" : "rgb(0, 133, 153)"}
              textAlign="center"
            >
              ویرایش سنسور
            </Typography>
            <Card
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
                padding: "16px 0 16px 10px",
                borderRadius: 3,
                mb: "10px !important",
                backgroundColor: isDark ? liver : grey[300],
              }}
            >
              <Grid container spacing={2}>
                <Grid xs={12} md={0}>
                  <CardMedia
                    component="img"
                    sx={{
                      display: { xs: "block", md: "none" },
                      width: { xs: 190, sm: 220, md: 290, lg: 340 },
                      objectFit: "fill",
                      borderRadius: 2,
                      margin: {
                        xs: "0 auto",
                        md: 0,
                      },
                      mt: { sm: 4.5, md: 3 },
                    }}
                    image="https://www.toper.com.my/sites/default/files/profile_image_empty_male.jpg"
                    alt="Live from space album cover"
                  />
                </Grid>
                <Grid
                  xs={11}
                  md={7}
                  lg={8}
                  sx={{ display: "flex", flexDirection: "column", pr: 1.9 }}
                >
                  <CustomForm
                    formik={formik}
                    inputs={inputs}
                    textOfSubmitButton="ویرایش سنسور"
                  />
                </Grid>
                <Grid xs={0} md={4} lg={3}>
                  <CardMedia
                    component="img"
                    sx={{
                      display: { xs: "none", md: "block" },
                      width: { xs: 300, sm: 220, md: 290, lg: 320 },
                      objectFit: "fill",
                      borderRadius: 2,
                      margin: {
                        xs: "0 auto",
                        md: 0,
                      },
                      mt: { sm: 4.5, md: 5 },
                    }}
                    image={
                      "https://www.toper.com.my/sites/default/files/profile_image_empty_male.jpg"
                    }
                    alt="Live from space album cover"
                  />
                </Grid>
              </Grid>
            </Card>
            <Typography mt={2}>&nbsp;</Typography>
          </div>
        </Box>
      </>
    );
  }
};

export default EditContact;
