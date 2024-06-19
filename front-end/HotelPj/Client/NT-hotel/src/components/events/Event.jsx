/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
const Events = () => {
  const [evenOdd, setEvenOdd] = useState(1);
  const data = [
    {
      urlImage: "https://www.caravellehotel.com/wp-content/uploads/web1-2.jpg",
      header: "Tiệc cuối năm tại Nha Trang ",
      description:
        "Trải nghiệm không trang nhã và ấm cúng thích hợp cho bữa tiệc cuối năm của bạn.",
    },
    {
      urlImage:
        "https://www.caravellehotel.com/wp-content/uploads/Caravelle-Saigon-Events-at-Opera-Rooms-02web.jpg",
      header: "SỰ KIỆN CÔNG TY",
      description:
        "Nơi bắt đầu cho sự thành công của Doanh Nghiệp với không gian hội họp sang trọng và chuyên nghiệp.",
    },
    {
      urlImage: "https://www.caravellehotel.com/wp-content/uploads/web3-3.jpg",
      header: "TIỆC CƯỚI TẠI Nha Trang ",
      description:
        "Tổ chức ngày trọng đại của đời bạn một cách hoàn hảo nhất với Caravelle Saigon",
    },
    {
      urlImage: "https://www.caravellehotel.com/wp-content/uploads/web4-1.jpg",
      header: "TIỆC ĐẶC BIỆT",
      description:
        "Lưu giữ khoảnh khắc đáng nhớ trong cuộc sống với những bữa Tiệc ấm cúng bên những người thân yêu",
    },
    {
      urlImage:
        "https://www.caravellehotel.com/wp-content/uploads/Events-on-26-offer4.jpg",
      header: "KHÔNG GIAN TIỆC TRÊN TẦNG 26",
      description:
        "Treo mình giữa lưng chừng trời, địa điểm có một không hai này mời Quý khách đến cùng chia sẻ những sự kiện ý nghĩa",
    },
  ];
  return (
    <section>
      <div style={{ width: "70%", margin: "auto" }}>
        <img
          src="https://www.caravellehotel.com/wp-content/uploads/web2-2.jpg"
          alt="Event 1"
          style={{ width: "100%" }}
        />
        <h2 className="events-header">Sự kiện tại Khách sạn Nha Trang</h2>
        <p className="events-header-description">
          Mười không gian tổ chức sự kiện của chúng tôi có thiết bị AV hiện đại
          và lối trang trí bắt mắt, khiến Nha Trang Sài Gòn trở thành địa điểm
          hàng đầu trong thành phố để tổ chức đám cưới, hội họp, hội nghị, sự
          kiện và dạ tiệc. Tâm điểm của tầng sự kiện Nha Trang Sài Gòn là Phòng
          khiêu vũ Nha Trang có diện tích sàn 300m2 với chiều cao trần 4,7m.
        </p>
        <h2 className="events-header">Sự kiện tại Khách sạn Nha Trang </h2>
        <p className="events-header-description">
          Mười không gian tổ chức sự kiện của chúng tôi có thiết bị AV hiện đại
          và lối trang trí bắt mắt, khiến Nha Trang trở thành địa điểm hàng đầu
          trong thành phố để tổ chức đám cưới, hội họp, hội nghị, sự kiện và dạ
          tiệc. Tâm điểm của tầng sự kiện Nha Trang là Phòng khiêu vũ Caravelle
          có diện tích sàn 300m2 với chiều cao trần 4,7m. Phòng khiêu vũ có thể
          được bố trí thành nhiều cấu hình khác nhau tùy theo dịp và có thể phục
          vụ tối đa 400 người. Nó cũng có thể được chia thành hai không gian sự
          kiện riêng biệt một cách thuận tiện nếu cần bằng một bức tường có thể
          thu vào.
        </p>
        <p className="events-header-description">
          Các Phòng Opera nhìn ra Nhà hát Opera lịch sử của thành phố có cửa sổ
          kính suốt từ trần đến sàn lớn cho phép ánh sáng tự nhiên tràn vào và
          mang đến tầm nhìn tuyệt đẹp khắp trung tâm thành phố. Tất cả các phòng
          chức năng đều được trang bị thiết bị chiếu sáng và AV mới nhất hỗ trợ
          lên đến 4K và Ultra HD để đảm bảo trải nghiệm tối ưu cho khách.
        </p>
        <div className="event-list">
          {data.map((event, index) =>
            index % 2 == 0 ? (
              <div key={index} className="event-item">
                <div className="event-item">
                  <img
                    src={event.urlImage}
                    alt="Event"
                    style={{ width: "49%" }}
                  />
                  <div>
                    <h3>{event.header}</h3>
                    <p>{event.description}</p>
                    <div>
                      <a
                        href={`/event-details/${event.id}`}
                        className="events-details-buttons"
                      >
                        XEM THÊM
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={index} className="event-item">
                <div className="event-item">
                  <div>
                    <h3>{event.header}</h3>
                    <p>{event.description}</p>
                    <div>
                      <a
                        href={`/event-details/${event.id}`}
                        className="events-details-buttons"
                      >
                        XEM THÊM
                      </a>
                    </div>
                  </div>
                  <img
                    src={event.urlImage}
                    alt="Event"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
            )
          )}
        </div>
        <div className="events-footer">
          <div>Bạn đang lên kế hoạch cho một sự kiện...</div>
          <p>
            Để biết thêm thông tin, vui lòng liên hệ Bộ phận Sự kiện theo số
            (84) 2838 234 999 hoặc email: events@nhatranghotel.com (84) 2838 234
            999 hoặc email: events@NThotel.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default Events;
