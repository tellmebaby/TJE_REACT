package com.aloha.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.aloha.product.dto.Product;

@Mapper
public interface ProductMapper { 

    public List<Product> list () throws Exception ;

    public Product read ( @Param("id") String id ) throws Exception;

    public int insert ( Product product ) throws Exception;

    public int update ( Product product ) throws Exception;

    public int delete ( @Param("id") String id ) throws Exception;

}