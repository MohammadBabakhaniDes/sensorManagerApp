import * as Yup from "yup";

export const ContactSchema = Yup.object().shape({
    type: Yup.string().required("نوع سنسور الزامی است."),
    unit: Yup.string().nullable("واحد سنسور الزامی است."),
    latitude: Yup.number().required("عرض جغرافیایی الزامی است."),
    longitude: Yup.number().required("طول جغرافیایی الزامی است."),    
    details: Yup.string().required("توضیحات الزامی است."),     
});