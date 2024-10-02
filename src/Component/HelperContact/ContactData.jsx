import { CardContent, Divider, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux"

const ContactData = ({contact}) => {
    const isDark = useSelector(state => state.theme.isDark);

    return (
        <CardContent sx={{ border: "1px solid transparent", backgroundColor: isDark ? grey[900] : "#fff", borderRadius: 2, mt: 2 }}>
            <Typography p={1.4} pt={0} variant="body1" display="flex" noWrap>
                <Typography>نوع سنسور: &nbsp; </Typography>
                <Typography fontWeight="bold">
                    {contact.type}
                </Typography>
            </Typography>
            <Divider />
            <Typography p={1.4} variant="body1" fontWeight={"bold"} display="flex">
                <Typography fontWeight={"normal"}>واحد سنسور : &nbsp; </Typography> {contact.unit}
            </Typography>
            <Divider />
            <Typography p={1.4} pb={0} variant="body1" display="flex" flexWrap="wrap" noWrap>
                <Typography>توضیحات : &nbsp; </Typography>
                <div dir='ltr'>
                    <Typography fontWeight="bold"
                    //sx={{ wordBreak: "break-all" }}
                    >
                        {contact.details}
                    </Typography>
                </div>
            </Typography>
        </CardContent>
    )
}

export default ContactData;