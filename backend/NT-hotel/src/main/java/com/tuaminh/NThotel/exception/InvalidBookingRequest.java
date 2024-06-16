package com.tuaminh.NThotel.exception;

public class InvalidBookingRequest extends RuntimeException{
    public InvalidBookingRequest(String message) {
        super(message);
    }
}
