import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import "./ProductList.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const nav = useNavigate();
    const getProducts = () => {
        fetch('http://127.0.0.1:8000/api/products')
            .then(res => res.json())
            .then(response => {
                console.log(response.products)
                setProducts(response.products);
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getProducts();
    }, []);

    //delete product
    const deleteProduct = async (id) => {
        await axios.delete('http://127.0.0.1:8000/api/products/' + id)
            .then(res => console.log(res.data));
        getProducts();
        console.log(products);
    }
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Control</th>
                        <th>Created_at</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <img src={"http://127.0.0.1:8000/storage/" + product.image} className="img" />
                                    </td>
                                    < td >
                                        <Link to={"/products/" + product.id + "/edit"} className="btn btn-outline-primary btn-sm">Edit</Link>
                                        <button onClick={() => deleteProduct(product.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                                    </td>
                                    <td>{product.created_at}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

        </div >
    )
}

export default ProductList
