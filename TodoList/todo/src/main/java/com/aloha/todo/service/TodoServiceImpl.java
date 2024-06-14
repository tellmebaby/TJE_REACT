package com.aloha.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.todo.dto.Todo;
import com.aloha.todo.mapper.TodoMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TodoServiceImpl implements TodoService{

    @Autowired
    private TodoMapper todoMapper;

    @Override
    public List<Todo> list() throws Exception {
    log.info("리스트 서비스 왔어요");
    List<Todo> todoList = todoMapper.list();
    log.info("갔다왔어요" + todoList);
    
    if ( todoList != null ){
        log.info("받아왔어요");
        return todoList;
    }else{
        log.info("받아왔어요"); 
    }
    return todoList;
    }
    
    @Override
    public Todo select(int no) throws Exception {
    log.info("셀렉트 서비스 왔어요");

    return todoMapper.select(no);
    }
    
    @Override
    public int insert(Todo todo) throws Exception {
    log.info("인서트 서비스 왔어요");
    return todoMapper.insert(todo);
    }
    
    @Override
    public int update(Todo todo) throws Exception {
    log.info("업데이트 서비스 왔어요");
    return todoMapper.update(todo);
    }
    
    @Override
    public int delete(int no) throws Exception {
    log.info("델리트 서비스 왔어요");
    return todoMapper.delete(no);
    }
    
}
