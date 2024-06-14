package com.aloha.product.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.aloha.product.dto.Product;

public interface ProductService {
    
    public List<Product> list () throws Exception ;

    public Product read ( @Param("id") String id ) throws Exception;

    public int insert ( Product product ) throws Exception;

    public int update ( Product product ) throws Exception;

    public int delete ( @Param("id") String id ) throws Exception;

}
