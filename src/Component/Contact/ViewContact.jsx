import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { grey, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CusLink from "../../Common/Link";
import { useCallback, useEffect, useState } from "react";
import {
  changePath,
  fetchRecordsOfSensor,
} from "../../slices/ContactSlice";
import { amber, liver } from "../../colors/color";
import { HeightCalculation } from "../../slices/UiSlice";
import SkeletonLoad from "../../Common/Skeleton";

const ViewContact = () => {
  const { contactId } = useParams();
  let { item } = useSelector((state) => state.contacts);
  const contact = useSelector((state) =>
    state.contacts.items.find((item) => item.id == contactId)
  );

  let thContents = ["مقدار", "نوع", "مقدار سنسور (با نوع)", "زمان ساخت"];
  const tdContents = useSelector((state) =>
    state.contacts.recordsOfSensor ? state.contacts.recordsOfSensor.map((record) => [
      record.value,
      contact ? contact.unit : "_",
      record.value + " " + String(contact ? contact.unit : "_"),
      record.timestamp,
    ]): []
  );
  let doSkeleton = false;
  const records = tdContents;
    
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const { pathname } = useLocation();
  const [docHeight, setDocHeight] = useState(0);

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "auto",
    });
  }, [pathname]); // baraye inke scroll har safhe joda bashad.

  useEffect(() => {
    dispatch(changePath(false));
    dispatch(fetchRecordsOfSensor(contactId));
  }, []);

  useEffect(() => {
    console.log(docHeight);
    dispatch(HeightCalculation(docHeight + 300));
  }, [docHeight]);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setDocHeight(node.getBoundingClientRect().height);
    }
  }, []);

  if (typeof contact === "undefined") {
    return (
      <Typography variant="h4" textAlign={"center"}>
        لطفا چند لحظه صبر کنید ...
      </Typography>
    );
  } else {
    return (
      <Card sx={{backgroundColor: isDark ? "#151515" : ""}}>        
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: { xs: "80%", sm: 580, md: 850, lg: 1220 },
              m: "0 auto",
              mt: 13,
            }}
          >
            <div ref={measuredRef}>
              <Divider
                sx={{
                  "&::before, &::after": {
                    borderColor: "#3f51b5",
                  },
                  mb: 3,
                  mx: "auto",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  fontSize={27}
                  // mb={5}
                  color={"rgb(0, 133, 153)"}
                  textAlign="center"
                >
                  اطلاعات سنسور
                </Typography>
              </Divider>
              <Card
                sx={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
                  padding: "16px 0 16px 10px",
                  borderRadius: 3,
                  // height: { sm: 390, lg: 410 },
                  mb: "10px !important",
                  backgroundColor: isDark ? liver : grey[400],
                }}
              >
                <Grid container spacing={3}>
                  <Grid xs={12} sm={3} md={3.7}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: 220, sm: 140, md: 200, lg: 240 },
                        objectFit: "fill",
                        borderRadius: 2,
                        margin: {
                          xs: "0 auto",
                          md: 0,
                        },
                        mt: { sm: 4.5, md: 3 },
                      }}
                      image={
                        "https://www.toper.com.my/sites/default/files/profile_image_empty_male.jpg"
                      }
                      alt="Live from space album cover"
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    sm={9}
                    md={8.3}
                    sx={{ display: "flex", flexDirection: "column", pr: 1.9 }}
                  >
                    <CardContent
                      sx={{
                        border: "1px solid #fff",
                        borderRadius: 2,
                        mt: { xs: 0, md: 2 },
                        backgroundColor: isDark ? grey[900] : "#fff",
                      }}
                    >
                      <Typography
                        p={1.4}
                        pt={0}
                        variant="body1"
                        display="flex"
                        noWrap
                      >
                        <Typography>نوع سنسور: &nbsp; </Typography>
                        <Typography fontWeight="bold">
                          {contact.type}
                        </Typography>
                      </Typography>
                      <Divider />
                      <Typography
                        p={1.4}
                        variant="body1"
                        fontWeight={"bold"}
                        display="flex"
                      >
                        <Typography fontWeight={"normal"}>
                          واحد سنسور : &nbsp;{" "}
                        </Typography>{" "}
                        {contact.unit}
                      </Typography>
                      <Divider />
                      <Typography
                        p={1.4}
                        pb={1.4}
                        variant="body1"
                        display="flex"
                        flexWrap="wrap"
                        noWrap
                      >
                        <Typography>طول جغرافیایی: &nbsp; </Typography>
                        <div dir="ltr">
                          <Typography
                            fontWeight="bold"
                            //sx={{ wordBreak: "break-all" }}
                          >
                            {contact.longitude}
                          </Typography>
                        </div>
                      </Typography>
                      <Divider />
                      <Typography
                        p={1.4}
                        pb={1.4}
                        variant="body1"
                        display="flex"
                        flexWrap="wrap"
                        noWrap
                      >
                        <Typography> عرض جغرافیایی: &nbsp; </Typography>
                        <div dir="ltr">
                          <Typography fontWeight="bold">
                            {contact.latitude}
                          </Typography>
                        </div>
                      </Typography>
                      <Divider />
                      <Typography
                        p={1.4}
                        pb={0}
                        variant="body1"
                        fontWeight={"bold"}
                        display="flex"
                      >
                        <Typography fontWeight={"normal"}>
                          توضیحات: &nbsp;{" "}
                        </Typography>
                        <div dir="ltr">
                          <Typography fontWeight="bold">
                            {contact.details}
                          </Typography>
                        </div>
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
                <Grid xs={12} mb={2} mt={3}>
                  <CusLink fs={18} fw="normal" w={"55vw"} px="3vw" to={"/"}>
                    برگشت به صفحه اصلی
                  </CusLink>
                </Grid>
              </Card>
            </div>
          </Box>        

        <Divider
          sx={{
            "&::before, &::after": {
              borderColor: "#3f51b5",
            },
            mt: { xs: 100, sm: 68, md: 70 },
            mx: "auto",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            fontSize={22}
            // mb={5}
            color={"rgb(0, 133, 153)"}
            textAlign="center"
          >
            رکورد های این سنسور
          </Typography>
        </Divider>

        <div>
          <TableContainer
            sx={{
            //   width: "100%",
            // width: { xs: "80%", sm: 590, md: 850, lg: 1220 },
            width: { xs: "100%", lg: 1220 },
              mt: 4,
              mx: "auto",
            }}
            className="px-8 mx-auto"
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ borderRadius: 8 }}>
                  {thContents.map((th, i) => (
                    <TableCell
                      key={i}
                      sx={{
                        backgroundColor: isDark ? grey[900] : grey[300],
                        color: isDark ? "white" : red[900],
                        borderRadius:
                          i === 0
                            ? "20px 0 0 0"
                            : i === thContents.length - 1
                            ? "0 20px 0 0"
                            : null,
                        textAlign: "center",
                      }}
                    >
                      {th}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ textAlign: "center" }}>
                {
                  // color: system[system.length - 1].getPropertyValue("color")
                  tdContents !== undefined &&
                  tdContents.length &&
                  !doSkeleton ? (
                    records.map((system, index) => (
                      <TableRow key={system.id}>
                        {system.map((sys, id) => (
                          <TableCell key={id} sx={{ textAlign: "center", direction: "rtl" }}>
                            {sys}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : tdContents.length === 0 ? (
                    <div className="text-[22px] mt-5">
                      هیچ رکوردی برای این سنسور وجود ندارد!
                    </div>
                  ) : (
                    <SkeletonLoad count={tdContents.length} width={"100%"} />
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Card>
    );
  }
};

export default ViewContact;
