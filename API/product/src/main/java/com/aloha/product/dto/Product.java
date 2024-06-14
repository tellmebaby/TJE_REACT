package com.aloha.product.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Product {
    //no, id, name, price, img, created_at, updated_at
    private int no;
    private String id;
    private String name;
    private int price;
    private String img;
    private Date created_at;
    private Date updated_at;
}
