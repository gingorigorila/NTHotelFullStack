/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const ContentCard = ({ key, restaurant, reverse }) => {
    return (
        <div className="content-card container mt-5">
            <div className={`row ${reverse ? 'flex-row-reverse' : ''}`}>
                <div className="col-md-6">
                    <h2>Tên nhà hàng : {restaurant.restaurantName}</h2>
                    <p>Loại nhà hàng : {restaurant.restaurantType}</p>
                    <p>Giờ mở cửa: {restaurant.hours}</p>
                    <p>Địa điểm : {restaurant.location}</p>
                    <p>Số điện thoại : {restaurant.telePhone}</p>
                    <p>Email: {restaurant.email}</p>
                    <p>Mô tả: {restaurant.description}</p>
                    <a href={`/order-restaurant/${restaurant.id}`} className="btn btn-outline-dark">Đặt chỗ ngay</a>
                </div>
                <div className="col-md-6 position-relative">
                    <img src={`data:image/png;base64,${restaurant.photo}`} alt="Background" className="img-fluid w-100" />
                    
                </div>
            </div>
        </div>
    );
};

export default ContentCard;
