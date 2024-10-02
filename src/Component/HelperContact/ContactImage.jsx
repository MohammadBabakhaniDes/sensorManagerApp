import { CardMedia } from "@mui/material";

const ContactImage = ({contact}) => {
    return (
        <CardMedia
            component="img"
            sx={{
                width: 180, height: 200, objectFit: "fill", borderRadius: 2, margin: {
                    xs: "0 auto",
                    md: 0
                }
            }}
            image={"https://www.toper.com.my/sites/default/files/profile_image_empty_male.jpg"}
            // style={{borderRadius: 8}}
            alt="Live from space album cover"
        />
    );
}

export default ContactImage;