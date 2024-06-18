import React, { useEffect, useState } from 'react'
import Update from '../componentes/board/UpdateForm'
import * as boards from '../apis/boards'
import { useNavigate } from 'react-router-dom'

const UpdateContainer = ({ no }) => {
  const navigate = useNavigate()
    // state
    const [board, setBoard] = useState({})
    const [isLoading, setLoading] = useState(false)

    // 함수
    const getBoard = async () => {
      setLoading(true)
      const response = await boards.select(no)
      const data = await response.data          // ⭐️ board 객체
      console.log(data);
      setBoard(data)
      setLoading(false)
    }
  
    const onUpdate = async (no, title, writer, content ) => {
      console.log(no, title, writer, content );
      try {
        const response = await boards.update(no, title, writer, content)
        const status = response.status
        console.log(`결과 : ${status}`);
        alert("게시글 수정 완료")

        // 게시글 목록 이동
        navigate("/boards")
      } catch (error) {
        console.log(error);
      }
    }

    const onDelete = async (no) => {
      const response = await boards.remove(no)
      const status = await response.status
      console.log(`게시글 삭제 요청결과 : ${status}`)
      alert("삭제 완료!")
    
      // 게시글 목록으로 이동
      navigate("/boards")
    }
    
    // ❓hook
    useEffect( () => {
      getBoard()
    }, [])
  return (
    <>
      <Update no={no} 
              board={board} 
              onUpdate={onUpdate}
              onDelete={onDelete}
              isLoading={isLoading}/>
    </>
  )
}

export default UpdateContainer