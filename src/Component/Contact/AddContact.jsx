import { useDispatch, useSelector } from "react-redux";
import { changePath, createSensor } from "../../slices/ContactSlice";
import { useEffect } from "react";
import { Card, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CustomForm from "../../Common/CustomForm";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../HelperContact/BackgroundImage";
import { useFormik } from "formik";
import { ContactSchema } from "../../validation/ContactValidation";
import { toast } from "react-toastify";

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { statues } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(changePath(false));
  }, []);

  const ConvertValuesToStandardValues = (values) => {
    values.latitude = parseFloat(values.latitude);
    values.longitude = parseFloat(values.longitude);    
  }

  const createSensorForm = (values) => {    
    ConvertValuesToStandardValues(values);

    dispatch(createSensor(values));    
    if (statues === "success") {
      navigate("/");
    }
    if (statues === "rejected") {
      toast.error("سنسور اضافه نشد مشکلی پیش آمد");
      navigate("/");
    }
  };

  const initialValues = {
    type: "",
    unit: "",
    latitude: "",
    longitude: "",
    details: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      createSensorForm(values);
      console.log(values);
    },
  });

  const inputs = [
    { valueOfFormikName: "type", label: "نوع سنسور" },
    { valueOfFormikName: "unit", label: "واحد سنسور" },
    { valueOfFormikName: "latitude", label: "عرض جغرافیایی" },
    { valueOfFormikName: "longitude", label: "طول جغرافیایی" },
    { valueOfFormikName: "details", label: "توضیحات" },
  ];

  const selects = [];

  return (
    <Card
      sx={{
        mt: 10,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "auto",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        color="rgba(0, 150, 39, 1)"
        mt={4}
      >
        ساخت سنسور جدید
      </Typography>
      <BackgroundImage />
      <Grid container>
        <Grid xs={9} md={5} lg={3.6}>
          <CustomForm
            ml="9vw"
            formik={formik}
            inputs={inputs}
            selects={selects}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddContact;
