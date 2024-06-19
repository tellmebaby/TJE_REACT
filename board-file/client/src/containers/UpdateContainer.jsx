import React, { useEffect, useState } from 'react'
import Update from '../componentes/board/UpdateForm'
import * as boards from '../apis/boards'
import { useNavigate } from 'react-router-dom'
import * as files from '../apis/files'

const UpdateContainer = ({ no }) => {
  console.log("::::::::처음 넘버 " + no);
  const navigate = useNavigate()
    // state
    const [board, setBoard] = useState({})
    const [fileList, setFileList] = useState([])
    const [isLoading, setLoading] = useState(false)

    // 함수
   const getBoard = async () => {
    // 로딩시작
    setLoading(true)
    const response = await boards.select(no)
    const data = await response.data          // ⭐️ board + fileList

    const board = data.board
    const fileList = data.fileList

    setBoard(board)
    setFileList(fileList)

    setLoading(false)
    // 로딩끝
  }

    //다운로드
    const onDownload = async (no, fileName) => {
      const response = await files.download(no)
      console.log(response);
  
      // 서버에서 반환된 파일 데이터를 Blob으로 변환
      // 브라우저를 통해 데이터를 a 태그로 등록하고 다운로드하도록 요청
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
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

    const onDeleteFile = async (fileNo) => {
      try {
        // 파일 삭제 요청
        const fileResponse = await files.remove(fileNo)
        console.log(fileResponse);

        // 파일 목록 갱신
        const boardResponse = await boards.select(no)
        const data = boardResponse.data
        const fileList = data.fileList
        setFileList(fileList)

      } catch (error) {
        console.log(error);
      }
    }
    
    const deleteCheckedFiles = async ( fileNoList ) => {
      const fileNos = fileNoList.join(",")
      console.log(fileNos);

      
      try {
        // 파일 선택 삭제
        const response = await files.removeFiles(fileNos)
        console.log(response.status)
        
         // 파일 목록 갱신
         const boardResponse = await boards.select(no)
         const data = boardResponse.data
         const fileList = data.fileList
         setFileList(fileList)
      } catch (error) {
        
      }

    }


    // ❓hook
    useEffect( () => {
      getBoard()
    }, [])
  return (
    <>
      <Update no={no} 
              board={board} 
              fileList={fileList}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onDownload={onDownload}
              onDeleteFile={onDeleteFile}
              deleteCheckedFiles={deleteCheckedFiles}
              isLoading={isLoading}/>
    </>
  )
}

export default UpdateContainer