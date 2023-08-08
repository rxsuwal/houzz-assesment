import { object,string } from "yup";

export const addBeerValidation = object({
    name: string().required("Name is required!"),
    tagline: string().required("Genre is required!"),
    description: string().required("Description is required!"),
    

})