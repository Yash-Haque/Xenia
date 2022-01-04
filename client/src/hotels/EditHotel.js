import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import "antd/dist/antd.css";
import { read, updateHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import moment from "moment";

const { Option } = Select;

const EditHotel = ({match}) => {

        // Redux [ISSUES WHILE SETTING REDUCERS]

    // const { auth } = useSelector((state) => ({ ...state}));
    // const { token } = auth; 
    // Creating State

    const [values, setValues] = useState({
        title: "",
        content: "",
        location: "",
        price: "",
        from: "",
        to: "",
        bed: "",
    });

    const [image, setImage] = useState("");

    const [preview, setPreview] = useState(
        "https://via.placeholder.com/100x100.png?text=PREVIEW");

            // Destructuring variables from state
    const {title, content, location, price, from, to, bed} = values;

        useEffect(() => {
            console.log(match);
            loadSellerHotel();
        }, []);

        const loadSellerHotel = async () => {
            let res = await read(match.params.hotelId);
            console.log(res);
            setValues({...values, ...res.data});
            setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)
        }

        const handleSubmit = async (e) => {
            e.preventDefault()

            let hotelData = new FormData();
            hotelData.append("title", title);
            hotelData.append("content", content);
            hotelData.append("location", location);
            hotelData.append("price", price);
            image && hotelData.append("image", image);
            hotelData.append("from", from);
            hotelData.append("to", to);
            hotelData.append("bed", bed);
    
            console.log([...hotelData]);

            try {
                // Token to be sent as a parameter to updateHotel
                let res = await updateHotel(hotelData, match.params.hotelId);
                console.log("Hotel Update Response:", res)
                toast.success(`${res.data.title} is updated`);
            } catch (err) {
                console.log(err);                
            }

        }

        const handleImageChange = (e) => {
            // console.log(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        };

        const handleChange = (e) => {
            setValues({ ...values, [e.target.name]: e.target.value });
        };


        const hotelEditForm = () => (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="btn btn-outline-secondary 
                    btn-block m-2 text-left">
                    Image
                    <input type="file" 
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        hidden
                    /> 
                    </label>
    
                    <input 
                        type="text" 
                        name="title"
                        onChange={handleChange}
                        placeholder="Title"
                        className="form-control m-2"
                        value={title}
                    />
    
                    <textarea
                        name="content"
                        onChange={handleChange}
                        placeholder="Content"
                        className="form-control m-2"
                        value={content}
                    />
    
                    <Select onChange={(value) => 
                    setValues({ ...values, location: value})}
                    className="w-100 m-2"
                    size="large"
                    placeholder="Location"
                    value={location}
                    >
                        <Option value="Dhaka">Dhaka</Option>
                        <Option value= "Sylhet">Rajshahi</Option>
                        <Option value= "Rajshahi">Sylhet</Option>
                        <Option value= "Chittagong">Chittagong</Option>
                        <Option value= "Khulna">Khulna</Option>
                        <Option value= "Barisal">Barisal</Option>
                        <Option value= "Mymensingh">Mymensingh</Option>
                        <Option value= "Rangpur">Rangpur</Option>
                    </Select>
    
    
                    <input 
                        type="number" 
                        name="price"
                        onChange={handleChange}
                        placeholder="Price"
                        className="form-control m-2"
                        value={price}
                    />
    
    
                    <Select onChange={(value) => 
                    setValues({ ...values, bed: value})}
                    className="w-100 m-2"
                    size="large"
                    placeholder="Number of beds"
                    value={bed}
                    >
                        <Option key= {1}>{1}</Option>
                        <Option key= {2}>{2}</Option>
                        <Option key= {3}>{3}</Option>
                        <Option key= {4}>{4}</Option>
                    </Select>
                </div>

                {/* Since Dates of the dummy token is not provided, hence nothing is shown */}
                {from && (<DatePicker 
                defaultValue={moment(from, "YYYY-MM-DD")}
                placeholder="From date" 
                className="form-control m-2"
                onChange={(date, dateString) =>
                setValues({ ...values, from: dateString})}
                disabledDate={(current) => current && current.valueOf() 
                < moment().subtract(1, "days")}
                />)}
    
                {to && (<DatePicker 
                placeholder="To date" 
                className="form-control m-2"
                onChange={(date, dateString) =>
                setValues({ ...values, to: dateString})}
                disabledDate={(current) => current && current.valueOf() 
                < moment().subtract(1, "days")}
                />)}
    
                <button className="btn btn-outline-primary m-2">
                Save</button>
            </form>
        );


        return (
            <>
                <div className="container-fluid bg-secondary p-5 text-center">
                    <h2>Edit Hotel</h2>
                </div>
                <div className="container-fluid">
                 <div className="row">
                     <div className="col-md-10">
                     <br />
                         {hotelEditForm()}
                     </div>
                     <div className="col-md-2">
                     <img 
                         src={preview}
                         alt="preview_image"
                         className="img img-fluid m-2"
                     />
                     <pre>{JSON.stringify(values, null, 4)}</pre>
                     </div>
                 </div>
             </div>
            </>
        )
};

export default EditHotel;

