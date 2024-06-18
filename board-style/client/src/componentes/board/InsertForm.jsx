import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../board/css/insert.module.css'

const InsertForm = ({ onInsert }) => {

  // state
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')

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
    // 유효성 검사
    onInsert(title, writer, content)

  }

  return (
    <div className='container'>
      <h1 className='title'>게시글 등록</h1>
        <table className={styles.table}>
          <tr>
            <td>제목</td>
            <td>
              {/*
                css module 의 클래스 선택자는 카멜케이스로 쓰는것이 관례
                - 카멜 케이스 : styles.formInput
                - 케밥 케이스 : styles['form-input']
              */}
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
                      onChange={handleChangeWriter}/>
                      
            </td>
          </tr>
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
          </tbody>
        </table>
        <div className="btn-box">
          <Link to="/boards" className='btn'>목록</Link>
          <button className='btn' onClick={onSubmit}>등록</button>
        </div>
    </div>
  )
}

export default InsertForm