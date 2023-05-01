import axios from "axios";
import {IFlat} from "../types.ts";
import {LOCAL_IPV4} from "../constants/general.ts";

export const getFlatByIdAPI = async (id: string | number): Promise<IFlat | null> => {
    return await axios.get<IFlat>(`http://${LOCAL_IPV4}:3000/flats/${id}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.log(error.message);
            return null
        })
}