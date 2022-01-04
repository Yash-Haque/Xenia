import axios from "axios";

// The token Authorization prop has been commented out in order to verify whether the 
// Functions were actually working or not. So to send token as a parameter, please pass
// it before the already existing argument.

// REACT_APP_API had been the default backend port.


//token to be sent as a parameter of createHotel
export const createHotel = async (data) =>
await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data
// ,
// {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// }
);


// For HomePage View
export const allHotels = async () => await 
axios.get(`${process.env.REACT_APP_API}/hotels`);

export const diffDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from)
    const end = new Date(to);
    const difference = Math.round(Math.abs((start - end) / day));
    return difference;
}

//token to be sent as a parameter of sellerHotels
export const sellerHotels = async () => 
await axios.get(`${process.env.REACT_APP_API}/seller-hotels`
// , {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// }
);

//token to be sent as a parameter of deleteHotel
export const deleteHotel = async (hotelId) => 
await axios.delete(
    `${process.env.REACT_APP_API}/delete-hotel/${hotelId}`
//     ,{    
//         headers:{
//         Authorization: `Bearer ${token}`,
//     },
// }
);

export const read = async (hotelId) => 
await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);

//token to be sent as a parameter of createHotel
export const updateHotel = async (data, hotelId) =>
await axios.put(`${process.env.REACT_APP_API}/update-hotel/${hotelId}`, data
// ,
// {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// }
);


export const userHotelBookings = async () => 
await axios.get(`${process.env.REACT_APP_API}/user-hotel-bookings`
// ,
// {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// }
);

