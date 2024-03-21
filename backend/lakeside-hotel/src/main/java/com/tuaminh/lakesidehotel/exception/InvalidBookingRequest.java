package com.tuaminh.lakesidehotel.exception;

public class InvalidBookingRequest extends RuntimeException{
    public InvalidBookingRequest(String message) {
        super(message);
    }
}
