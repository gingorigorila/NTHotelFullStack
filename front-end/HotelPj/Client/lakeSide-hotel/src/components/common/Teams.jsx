/* eslint-disable no-unused-vars */
import React from "react";

import CommonHeading from "../layout/CommonHeading";
import { socialIcons, team } from "../Data/Data";
export default function Teams() {
  return (
    <>
      <div className="container py-3">
        <div className="container">
          <CommonHeading
            heading="nhóm chúng tôi"
            subtitle="Thành viên"
            title="Staffs"
          />
          <div className="row g-2 justify-content-md-center text-center">
            {team.map((item, index) => (
              <div
                className="col-lg-2 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
                key={index}
              >
                <div className="rounded shadow overflow-hidden">
                  <div className="position-relative">
                    <img className="img-fluid" src={item.image} alt="img" />
                    
                  </div>
                  <div className="text-center p-4 mt-3">
                    <h5 className="fw-bold mb-0">{item.name}</h5>
                    <small>{item.designation}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
