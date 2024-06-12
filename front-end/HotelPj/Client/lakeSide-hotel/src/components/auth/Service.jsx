import React from "react";

const services = [
  {
    name: "Khách sạn",
    description: "Với chất lượng đạt chuẩn 5 sao, khách sạn chúng tôi sẽ mang đến cho quý khách những trải nghiệm tuyệt vời nhất.",
    image: "https://static.leonardo-hotels.com/image/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f_1200x780_mobile_3.jpeg",
  },
  {
    name: "Nhà hàng",
    description: "Bao gồm nhà hàng hải sản, nhà hàng buffet cùng với đa dạng các món ăn sẵn sàng làm hài lòng những thực khách khó tính nhất.",
    image: "https://static.vinwonders.com/production/nha-hang-nha-trang-topbanner.jpg"
  },
  {
    name: "Phòng Gym",
    description: "Phòng tập rộng rãi, được trang bị đầy đủ trang thiết bị hiện đại, giúp quý khách duy trì sức khỏe tốt nhất trong suốt thời gian lưu trú tại khách sạn chúng tôi.",
    image: "https://ptfitness.vn/wp-content/uploads/2022/09/chuan-bi-gi-de-setup-phong-gym-khach-san-resort-5.jpg"
  },
  {
    name: "Quán Bar",
    description: "Quán bar sang trọng, lịch lãm, thích hợp cho những buổi gặp gỡ bạn bè, họp nhóm, hay thậm chí là những cuộc hẹn lãng mạn với người thân yêu.",
    image: "https://acihome.com.vn/uploads/15/nha-hang-bar-la-gi.jpg"
  },
];

const Service = ({ service, index }) => {
  return (
    <div
      className={`service-container ${index % 2 === 0 ? "row" : "row-reverse"}`}
    >
      <img src={service.image} alt={service.name} className="service-image" />

      <div className="service-info">
        <h2>{service.name}</h2>
        <p>{service.description}</p>
      </div>
    </div>
  );
};

const ServiceList = () => {
  return (
    <div className="service-list">
      {services.map((service, index) => (
        <Service key={index} service={service} index={index} />
      ))}
    </div>
  );
};

export default ServiceList;
