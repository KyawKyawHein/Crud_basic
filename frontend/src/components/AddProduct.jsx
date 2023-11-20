import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const addProduct = async (e) => {
        e.preventDefault();
        console.log(image);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);

        const response = await axios.post('http://127.0.0.1:8000/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response) {
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/productList');
            }, 2000)
        }
    };
    return (
        <div className="">
            <h1 className="">Add product</h1>
            {
                message.length > 0 ? <p className="alert alert-success">{message}</p> : ""
            }
            <form onSubmit={addProduct} method="post" encType="multipart/form-data" >
                <div className="mb-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className=" form-control" />
                </div>
                <div className="mb-2">
                    <label htmlFor="description">Description</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="form-control" />
                </div>
                <div className="mb-2">
                    <label htmlFor="image">Image</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} className=" form-control" />
                </div>
                <button className="btn btn-primary">Add Product</button>
            </form>
        </div >
    );
};

export default AddProduct;
