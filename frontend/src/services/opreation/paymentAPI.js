
import { apiconnector } from "../apicontector";
import { PaymentEndPoints } from "../endPints";

const {

    BUY_COURSE_API,
    VERIFY_PAYMENT_API,
    GET_BUY_COURSE_API

} = PaymentEndPoints

// buy-course 
export const buyCourse = async (courseId, token) => {
    try{
        const response = await apiconnector("POST", BUY_COURSE_API, {courseId}, {
            Authorization: `Bearer ${token}`
        });

        console.log("response in api", response);

        if(!response){
            throw new Error("No give response from server side...");
        }

        return response;

    }catch(error){
        console.log(error);
    }
}

// verify-payment
export const verifyPayment = async (data, token) => {
    try{
        const response = await apiconnector("POST", VERIFY_PAYMENT_API, data, {
            Authorization: `Bearer ${token}`
        });

        if(!response || !response.data){
            throw new Error("No give response from server side...");
        }

        return response;

    }catch(error){
        console.log(error);
    }
}

// get-parches course 
export const getParchesCourse = async () => {
    try{
        const response = await apiconnector("GET", GET_BUY_COURSE_API, {
            Authorization: `Bearer ${token}`
        });

        if(!response || !response.data){
            throw new Error("No give response from server side...");
        }

        return response;

    }
    catch(error){
        console.log(error);
    }
}