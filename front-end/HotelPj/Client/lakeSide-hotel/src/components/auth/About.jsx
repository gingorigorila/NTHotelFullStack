import React from "react";
const About = () => {
	return (
        <>
          <div className="container-xxl py-5">
            <div className="container">
              <div className="row g-5 align-items-center">
                <div className="col-lg-6">
                  <h1 className="mb-4">
                    Welcome to{" "}
                    <span className="text-primary text-uppercase">Nha Trang</span>
                  </h1>
                  <p className="mb-4">
                    Chào mừng quý khách đến với Khách Sạn Nha Trang, nơi mang đến cho bạn trải nghiệm nghỉ dưỡng tuyệt vời và dịch vụ đẳng cấp tại trung tâm thành phố biển Nha Trang xinh đẹp. Với vị trí đắc địa ngay gần bãi biển, khách sạn của chúng tôi là điểm đến lý tưởng cho cả du khách nghỉ dưỡng và doanh nhân.
                  </p>
                  <a className="btn btn-primary py-3 px-5 mt-2" href="">
                    Explore More
                  </a>
                </div>
                <div className="col-lg-6">
                  <div className="row g-3">
                    <div className="col-6 text-end">
                      <img
                        className="img-fluid rounded w-75 wow zoomIn"
                        data-wow-delay="0.1s"
                        src="/src/assets/img/about-1.jpg"
                        style={{ marginTop: "25%" }}
                      />
                    </div>
                    <div className="col-6 text-start">
                      <img
                        className="img-fluid rounded w-100 wow zoomIn"
                        data-wow-delay="0.3s"
                        src="/src/assets/img/about-2.jpeg"
                      />
                    </div>
                    <div className="col-6 text-end">
                      <img
                        className="img-fluid rounded w-50 wow zoomIn"
                        data-wow-delay="0.5s"
                        src="/src/assets/img/about-3.jpg"
                      />
                    </div>
                    <div className="col-6 text-start">
                      <img
                        className="img-fluid rounded w-75 wow zoomIn"
                        data-wow-delay="0.7s"
                        src="/src/assets/img/about-4.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default About