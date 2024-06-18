import React, { useEffect, useState } from 'react'
import Read from '../componentes/board/Read'
import * as boards from '../apis/boards'

const ReadContainer = ({ no }) => {
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

  // ❓hook
  useEffect( () => {
    getBoard()
  }, [])

  return (
    <>
      <Read no={ no } board={board} isLoading={isLoading}/>
    </>
  )
}

export default ReadContainer