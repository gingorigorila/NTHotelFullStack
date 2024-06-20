import logo2 from "../../assets/MemberImg/logo2.jpg";
import { FaReply } from "react-icons/fa";

const CommentForm = () => {
  return (
    <section className="gradient-custom">
      <h4 className="text-center">Comments</h4>
      <div className="container my-5 py-2">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-8">
            <div className="card">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col">
                    <div className="d-flex flex-start">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                        alt="avatar"
                        width="65"
                        height="65"
                      />
                      <div className="flex-grow-1 flex-shrink-1">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                              Đức Luận{" "}
                              <span className="small">- 2 hours ago</span>
                            </p>
                            <a href="#!">
                              <FaReply />
                              <span className="small"> reply</span>
                            </a>
                          </div>
                          <div style={{ textAlign: "left" }}>
                            Phòng thoải mái và sạch sẽ, nhân viên cũng thân
                            thiện nữa.
                          </div>
                        </div>

                        <div className="d-flex flex-start mt-4">
                          <a className="me-3" href="#">
                            <img
                              className="rounded-circle shadow-1-strong"
                              src={logo2}
                              alt="avatar"
                              width="65"
                              height="65"
                            />
                          </a>
                          <div className="flex-grow-1 flex-shrink-1">
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  Khách sạn Nha Trang
                                  <span className="small">- 3 hours ago</span>
                                </p>
                              </div>
                              <div style={{ textAlign: "left" }}>
                                Khách sạn Nha Trang xin chân thành cảm ơn lời
                                nhận xét của quý khách. Hy vọng có thể được phục
                                vụ quý khách hơn nữa trong tương lai.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-start mt-4">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://res.cloudinary.com/jnto/image/upload/w_750,h_503,fl_lossy,f_auto/v1531981666/fujiguide/SG010_6"
                        alt="avatar"
                        width="65"
                        height="65"
                      />
                      <div className="flex-grow-1 flex-shrink-1">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                              Minh JP
                              <span className="small">- 2 hours ago</span>
                            </p>
                            <a href="#!">
                              <FaReply />
                              <span className="small"> reply</span>
                            </a>
                          </div>
                          <div style={{ textAlign: "left" }}>
                            Phòng đẹp, nhân viên nhiệt tình, giá cả hợp lý.
                          </div>
                        </div>

                        <div className="d-flex flex-start mt-4">
                          <a className="me-3" href="#">
                            <img
                              className="rounded-circle shadow-1-strong"
                              src={logo2}
                              alt="avatar"
                              width="65"
                              height="65"
                            />
                          </a>
                          <div className="flex-grow-1 flex-shrink-1">
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  Khách sạn Nha Trang
                                  <span className="small">- 4 hours ago</span>
                                </p>
                              </div>
                              <div style={{ textAlign: "left" }}>
                                Khách sạn Nha Trang xin chân thành cảm ơn lời
                                nhận xét của quý khách. Sự ủng hộ của quý khách
                                là nguồn động viên lớn lao cho chúng tôi.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentForm;