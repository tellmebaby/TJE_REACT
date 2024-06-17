package com.aloha.server.dto;
import java.util.Date;
import lombok.Data;

@Data
public class Board {
    private int no;
    private String title;
    private String writer;
    private String content;
    private Date reg_date;
    private Date upd_date;
    private int views;
}

