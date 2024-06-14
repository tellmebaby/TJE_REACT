package com.aloha.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.product.dto.Product;
import com.aloha.product.mapper.ProductMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<Product> list() throws Exception {

        List<Product> productList = productMapper.list();
        if ( productList != null ){
            log.info("왜 안돼냐 도대체");
        }
        return productList;
    }

    @Override
    public Product read(String id) throws Exception {
        return productMapper.read(id);
    }

    @Override
    public int insert(Product product) throws Exception {
        return productMapper.insert(product);
    }

    @Override
    public int update(Product product) throws Exception {
        return productMapper.update(product);
    }

    @Override
    public int delete(String id) throws Exception {
        return productMapper.delete(id);
    }
    
}
