import React, { useEffect, useState } from 'react'
import List from '../componentes/board/List'
import * as boards from '../apis/boards'

const ListContainer = () => {
  // state
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setLoading] = useState(false) // true 일때는 로딩중 

  // 함수
  const getBoardList = async () => {
    // 로딩 시작
    setLoading(true)
    const response = await boards.list();
    const data = await response.data            // ⭐️boardList
    setBoardList(data);
    setLoading(false)
    // 로딩 끝
    
  }

  // ❓ hook
  useEffect( ()=> {
    getBoardList();
  }, []);

  return (
    <>
      {/* 게시글 목록 */}
      <List boardList={boardList} isLoading={isLoading}/>
    </>
  )
}

export default ListContainer