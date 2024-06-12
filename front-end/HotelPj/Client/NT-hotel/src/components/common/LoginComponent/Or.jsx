/* eslint-disable no-unused-vars */
import React from "react";

const Or = () => {
    return(
    <div className="col-12 col-lg-12 d-flex align-items-center justify-content-center gap-3 flex-lg-column">
        <div className="bg-dark h-100 d-none d-lg-block" style={{ width: '1px', '--bs-bg-opacity': '.1' }}></div>
        <div className="bg-dark w-100 d-lg-none" style={{ height: '1px', '--bs-bg-opacity': '.1' }}></div>
        <div>or</div>
        <div className="bg-dark h-100 d-none d-lg-block" style={{ width: '1px', '--bs-bg-opacity': '.1' }}></div>
        <div className="bg-dark w-100 d-lg-none" style={{ height: '1px', '--bs-bg-opacity': '.1' }}></div>
      </div>
    )
}

export default Or;