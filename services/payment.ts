import { APP_KEY, BASE_API_URL } from "@/global";
import { getServerCookie } from "@/lib/server-cookies";
import axios, { AxiosError } from "axios";


export const VerifyPaymentApi = async(status:string,idPayment?:number) =>{
     try {
        const token = await getServerCookie("token");
        let response;
        if(status=="true"){
            const body= {
                verified: status
            }
            response = await axios.patch(`${BASE_API_URL}/payments/${idPayment}`, body, {
                headers: {
                    "Content-Type": "application/json",
                    'app-key': `${APP_KEY}`,
                    'authorization': `Bearer ${token}`,
                }
            })
            const data = response.data
            console.log(data)
            return {
                status: true,
                message: `Verify Payment successfully`,
                data: data.data
            }
        } else {
            response = await axios.delete(`${BASE_API_URL}/payments/${idPayment}`, {
                headers: {
                    "Content-Type": "application/json",
                    'app-key': `${APP_KEY}`,
                    'authorization': `Bearer ${token}`,
                }
            })
            const data = response.data
            return {
                status: true,
                message: `Delete Payment successfully`,
            }
        }
    } catch (error: unknown) {
              if (error instanceof AxiosError) {
                return {
                    status: false,
                    message: error.response?.data?.message || `Failed to handdle Payment.`,
                };
            }
            return {
                status: false,
                message: `Failed to handdle  Payment.`,
            };
        }
}
