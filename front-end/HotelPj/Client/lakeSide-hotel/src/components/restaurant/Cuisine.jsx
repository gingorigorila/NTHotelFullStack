import React from "react";
const Cuisine = () => {
  const data = [
    {
      id: 1,
      header: "MARKET 39",
      image:
        "https://www.icsaigon.com/sites/icsaigon/files/styles/feature_photo_rec/public/2018-03/Market%2039_0.jpg?itok=cuWOhq6g",
      description:
        "Hội tụ ẩm thực của Việt Nam cùng với nhiều sự lựa chọn quốc tế, Nhà hàng Market 39 mang tới một trong những điểm tâm buffet chất lượng nhất thành phố. Ẩm thực của Market 39 tập trung tới hải sản tươi ngon, quầy thịt chất lượng hảo hạng và ẩm thực quốc tế đặc sắc. Thông báo: Hiện khung giờ buffet trưa Chủ nhật và buffet tối thông thường đang được tạm đóng cho tới khi có thông báo mới.",
    },
    {
      id: 2,
      header: "YU CHU",
      image:
        "https://www.icsaigon.com/sites/icsaigon/files/styles/feature_photo_rec/public/2018-03/Yu%20Chu.jpg?itok=tLGBT8tL",
      description:
        "Không gian sang trọng cùng những món ăn đặc sản của Bắc Kinh và Quảng Đông hội tụ tại một trong những nhà hàng Trung Hoa danh tiếng nhất Sài Gòn. Các đầu bếp tại đây rất biết cách chế biến những thực đơn lý tưởng để thết đãi đối tác bữa trưa, thưởng thức bữa tối cùng gia đình hay bất cứ dịp nào khác.",
    },
    {
      id: 3,
      header: "BASILICO",
      image:
        "https://www.icsaigon.com/sites/icsaigon/files/styles/feature_photo_rec/public/2018-03/Basico.jpg?itok=-CGw9WyQ",
      description:
        "Một nhà hàng Ý giữa lòng Thành phố Hồ Chí Minh, Basilico tại InterContinental Residences Saigon mang phong cách đương đại và nhẹ nhàng, chuyên phục vụ món ăn Ý với hương vị truyền thống và những món tráng miệng do các đầu bếp tự tay làm. Lò nướng pizza bằng củi và nhiều loại rượu vang tạo nên không khí ấm cúng cho những món ăn đẹp mắt thêm phần ngon miệng.",
    },
    {
      id: 4,
      header: "THE LIBRARY",
      image:
        "https://www.icsaigon.com/sites/icsaigon/files/styles/feature_photo_rec/public/2018-03/Library.jpg?itok=QQq6nr8u",
      description:
        "Một khoảnh khắc thư giãn đang đón chờ tại The Library, ẩn mình trong tiền sảnh khách sạn InterContinental Saigon. Lý tưởng cho một ly Chardonnay lạnh hay một tách cà phê latte pha bằng tay, nơi đây sự thoải mái và yên tĩnh được đặt lên hàng đầu, với dịch vụ theo yêu cầu của từng vị khách và những chiếc ghế êm ái được thiết kế hoàn hảo.",
    },
  ];
  const data2 = [
    {
      id: 1,
      header: "THỰC ĐƠN MỚI TẠI BASILICO",
      image:
        "https://www.icsaigon.com/sites/icsaigon/files/styles/offers_blocks_images/public/2024-06/New-Basilico-Menu_2024-1_0.jpg?itok=nINBhZ3f",
      description:
        "Khám phá những bổ sung và nâng cấp hấp dẫn cho thực đơn của nhà hàng Basilico kể từ ngày 6.6 này!",
    },
    {
      id: 2,
      header: "MENU ALL-YOU-CAN-EAT MỚI",
      image:
        "https://www.icsaigon.com/sites/icsaigon/files/styles/offers_blocks_images/public/2024-05/New-Yu-Chu-All-You-Can-Eat-1.jpg?itok=kZjc_2SE",
      description:
        "Following the exciting introduction of Yu Chu's new à-la-carte menu, prepare to indulge in our guest-love All-You-Can-Eat with a brand new menu starting 20 May 2024!",
    },
    {
      id: 3,
      header: "TRÀ CHIỀU HOA ANH ĐÀO",
      image:
        "https://www.icsaigon.com/sites/icsaigon/files/styles/offers_blocks_images/public/2024-04/Hanami-afternoon-tea-1.jpg?itok=OZa3IOb0",
      description:
        "Lấy cảm hứng từ hoạt động hanami (ngắm hoa) tại Nhật Bản, The Library sẽ mang tới một thực đơn trà chiều đáng yêu và hấp dẫn mới để bạn thưởng thức cùng người thân, bạn bè từ ngày 22/4 này.",
    },
  ];
  return (
    <div
    // style={{ backgroundColor: "#dedede" }}
    >
      <img
        style={{ width: "100%" }}
        src="https://www.icsaigon.com/sites/icsaigon/files/styles/home_slider/public/2018-08/InterContinental-Saigon-Restaurants-2_0_0.jpg?itok=l_t57k2M"
      ></img>
      <div className="cuisine-header">
        <h1 className="cuisine-header-content">Ẩm thực</h1>
        <p>
          Một thế giới ẩm thực phong phú với nhiều hương vị đặc sắc đang chờ đợi
          những thực khách khi đến với InterContinental Saigon. Khám phá những
          lựa chọn chất lượng ở ba nhà hàng của khách sạn, từ các quầy buffet
          đẳng cấp tại Market 39, tới ẩm thực Trung Hoa-Quảng Đông tại Yu Chu
          với dim sum All-You-Can-Eat, vịt quay Bắc Kinh, hay ẩm thực Ý tại
          Basilico với nhiều món Ý đúng điệu.
        </p>
      </div>
      <div className="cuisine-content">
        {data.map((content, index) =>
          index % 2 === 0 ? (
            <div className="cuisine-content-items">
              <img src={content.image}></img>
              <div className="cuisine-content-item">
                <div className="cuisine-content-items-header">
                  {content.header}
                </div>
                <div className="cuisine-content-items-description">
                  {content.description}
                </div>
              </div>
            </div>
          ) : (
            <div className="cuisine-content-items">
              <div className="cuisine-content-item">
                <div className="cuisine-content-items-header">
                  {content.header}
                </div>
                <div className="cuisine-content-items-description">
                  {content.description}
                </div>
              </div>
              <img src={content.image}></img>
            </div>
          )
        )}
      </div>
      <h1 className="cuisine-footer-content">Ẩm thực</h1>

      <div className="cuisine-footer">
        {data2.map((content, index) => (
          <div>
            <h1>{content.header}</h1>
            <p>{content.description}</p>
            <img src={content.image}></img>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Cuisine;
