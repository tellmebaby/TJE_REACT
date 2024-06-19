import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../board/css/update.module.css'
import * as format from '../../apis/format'

const UpdateForm = ({no, board, fileList, onUpdate
                  , onDelete, isLoading, onDownload
                  , onDeleteFile, deleteCheckedFiles
                  }) => {
  // state
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const [filse, setFiles] = useState(null)
  const [fileNoList, setFileNoList] = useState([]) // 파일 선택 삭제
  const [checkAll, setCheckAll] = useState(false)
  // 함수
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
    }
    const handleChangeWriter = (e) => {
    setWriter(e.target.value)
    }
    const handleChangeContent = (e) => {
    setContent(e.target.value)
    }

    const onSubmit = () => {
      onUpdate(no, title, writer, content)
    }

    const handleDelete = () => {
      const check = window.confirm ("정말로 삭제 하시겠습니까?")
      if( check ) {
        onDelete(no)
      }
    }

    const handleDownload = (no, fileName) => {
      onDownload(no, fileName)
    }

    const handleDeleteFile = ( no ) => {
      const check = window.confirm("정말로 삭제하시겠습니까?")
      if( check )
        onDeleteFile( no )
    }

    // 파일 번호 체크
    const checkFileNo = ( no ) => {
      let duplicated = false;
      for (let i = 0; i < fileNoList.length; i++) {
        const fileNo = fileNoList[i];
        // 중복 : 체크박스 해제 🟩
        if( fileNo == no ) {
          fileNoList.splice(i, 1)
          duplicated = true
        }
      }
      // 중복 ❌ → 체크박스 지정 ✅ → 추가
      if(!duplicated)fileNoList.push(no)

      const checkedFileNoList = [...fileNoList] // 이거 어디감?
      console.log(`선택된 파일 번호 : ${checkedFileNoList}`);

      setFileNoList(checkedFileNoList)
    }

    const handleDeleteFiles = () => {
      const check = window.confirm("정말로 삭제하시겠습니까? \n" + fileNoList)
      if( check ) {
        deleteCheckedFiles(fileNoList)
      }
      setFileNoList([]) // 파일번호 체크박스 초기화
    }

    const fileCheckAll = () => {
      let checkList = document.getElementsByClassName('check-file')

      if( !checkAll ) {
        for (let i = 0; i < checkList.length; i++) {
          const check = checkList[i];
          // 이미 체크가 되어있는지 확인
          if ( !check.checked )
            checkFileNo( check.value )
          check.checked = true
        }
        setCheckAll(true)
      }
      else{
        for (let i = 0; i < checkList.length; i++) {
          const check = checkList[i];
          // 이미 체크가 되어있는지 확인
          if( check.checked )
            checkFileNo( check.value )
          check.checked = false
        }
        setCheckAll(false)
      }
    }

    useEffect( () => {
      if( board ) {
        setTitle(board.title)
        setWriter(board.writer)
        setContent(board.content)
      }
    }, [board, fileList])
    // [의존하는 객체 ] (⭐️ 의존성 배열)
    // : 지정한 객체가 변화했을때, 다시 useEffect를 실행한다.

  return (
    <div className='container'>
      <h1 className='title'>게시글 수정</h1>
          {
            isLoading &&
            <div>
              <img src="/img/loading.webp" alt="loading" width="100%" />
            </div>
          }
          {
            !isLoading && board && (
              <table className={styles.table}>
                <tbody>
                <tr>
                  <td>제목</td>
                  <td>
                    <input type="text" 
                          className={styles['form-input']}
                            value={title}
                            onChange={handleChangeTitle}/>
                  </td>
                </tr>
                <tr>
                  <td>작성자</td>
                  <td>
                    <input type="text" 
                    className={styles['form-input']}
                            value={writer} 
                            onChange={handleChangeWriter} />
                  </td>
                </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td colSpan={2}>내용</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <textarea cols="40" rows="10"
                      className={styles['form-input']}
                                value={content} 
                                onChange={handleChangeContent}></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>파일</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="flex-box">
                        <div className="item">
                          <button className="btn" onClick={ fileCheckAll }>전체선택</button>
                        </div>
                        <div className="item">
                          <button className='btn' onClick={ handleDeleteFiles}>선택삭제</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                    { fileList.map((file) => (
                      <tr key={file.no}>
                        <td className={styles.check}>
                          {/* ✅ 파일 선택 체크 박스 */}
                          <span>{file.checked}</span>
                          <input type="checkbox" 
                                  className='check-file'
                                  onChange={() => checkFileNo(file.no)}
                                  checked={file.checked}
                                  value={file.no} />
                           <img src={`/files/img/${file.no}`} alt={file.fileName} />
                           <div className={styles.item}>
                                  <button className="btn" onClick={ () => handleDownload(file.no, file.originName)}>다운로드</button>
                                  <button className='btn' onClick={ () => handleDeleteFile(file.no)}>삭제</button>
                          </div>
                        </td>
                        <td>
                              <div className="flex-box" >
                                <div className="item">
                                  <span>{file.originName} ({ format.byteToUnit(file.fileSize)})</span>
                                </div>
                              </div>
                        </td>
                      </tr>
                      ))}
                </tbody>
              </table>
            )}
        <div className="btn-box">
          <div className="item">
          <Link to="/boards" className='btn'>목록</Link>
          </div>
          <div className="item">
          <button className='btn' onClick={handleDelete}>삭제</button>
          <button className='btn' onClick={onSubmit}>수정</button>
          </div>
        </div>
    </div>
  )
}

export default UpdateForm