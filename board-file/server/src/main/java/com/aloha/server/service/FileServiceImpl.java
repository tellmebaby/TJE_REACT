package com.aloha.server.service;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.dto.Files;
import com.aloha.server.mapper.FileMapper;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileMapper fileMapper;

    @Value("${upload.path}")            // application.properties 에 설정한 업로드 경로 속성명
    private String uploadPath;          // 업로드 경로

    @Override
    public List<Files> list() throws Exception {
        List<Files> fileList = fileMapper.list();
        return fileList;
    }

    @Override
    public Files select(int no) throws Exception {
        Files file = fileMapper.select(no);
        return file;
    }

    @Override
    public int insert(Files file) throws Exception {
        int result = fileMapper.insert(file);
        return result;
    }

    @Override
    public int update(Files file) throws Exception {
        int result = fileMapper.update(file);
        return result;
    }


  
    // @Override
    // public int uploadFiles(Files fileInfo, List<MultipartFile> fileList) throws Exception {
    //     int result = 0;
    //     for (MultipartFile file : fileList) {
    //         result += uploadFile( fileInfo, file );
    //     }
    //     log.info(result + "개 파일을 업로드하였습니다.");
    //     return result;
    // }

  

    @Override
    @Transactional
    public Files upload(Files file) throws Exception {
        Files uploadedFile = uploadFile(file, file.getFile());
        if( uploadedFile !=  null ){
            log.info("파일 업로드 성공!");
        }       
        return uploadedFile;
    }


        // 파일 업로드 로직

        public Files uploadFile(Files fileInfo, MultipartFile file) throws Exception {
        int result = 0;
        if( file.isEmpty() ) return null;
            
        // 💻 파일 정보 : 원본파일명, 파일 용량, 파일 데이터 
        String originName = file.getOriginalFilename();
        long fileSize = file.getSize();
        byte[] fileData = file.getBytes();

        // 업로드 경로
        // 파일명 중복 방지 방법(정책)
        // - 날짜_파일명.확장자
        // - UID_파일명.확장자

        // UID_강아지.png
        String fileName = UUID.randomUUID().toString() + "_" + originName;

        // upload.path + UID_강아지.png
        String filePath = uploadPath + "/" + fileName;

        // - 파일 시스템에 복사 (업로드)
        File uploadFile = new File(uploadPath, fileName);
        FileCopyUtils.copy(fileData, uploadFile);

        // DB에 파일 정보 등록
        Files uploadedFile = new Files();
        uploadedFile.setParentTable(fileInfo.getParentTable());
        uploadedFile.setParentNo(fileInfo.getParentNo());
        uploadedFile.setFileName(fileName);
        uploadedFile.setOriginName(originName);
        uploadedFile.setFilePath(filePath);
        uploadedFile.setFileSize(fileSize);
        uploadedFile.setFileCode(0);

        // DB 에 데이터 등록
        result = fileMapper.insert(uploadedFile);

        return uploadedFile;

        }

    @Override
    public List<Files> uploadFiles(Files fileInfo, List<MultipartFile> fileList) throws Exception {
       
        List<Files> uploadedFileList = new ArrayList<Files>();
        for (MultipartFile file : fileList) {
            Files uploadedFile = uploadFile(fileInfo, file);
            uploadedFileList.add(uploadedFile);
            log.info("업로드된 파일 : " + uploadedFile);
        }
        return uploadedFileList;
    }
   
    @Override
    public List<Files> listByParent(Files file) throws Exception {
        List<Files> fileList = fileMapper.listByParent(file);
        return fileList;
    }

        // 파일 다운로드
    @Override
    public int download(int fileNo, HttpServletResponse response) throws Exception {
        // result 
        // 0 : 파일 다운로드 처리 실패
        // 1 : 파일 다운로드 성공
        Files file = fileMapper.select(fileNo);

        if( file == null ) {
            // BAD_REQUEST : 400, 클라이언트의 요청이 잘못되었음을 알려주는 상태코드
            // response.setStatus(response.SC_BAD_REQUEST);
            return 0;
        }

        String filePath = file.getFilePath();       // 파일 경로
        String fileName = file.getFileName();       // 파일 이름

        // 다운로드 응답을 위한 헤더 세팅
        // - ContentType            : application/octet-stream
        // - Content-Disposition    : attachment, filename="파일명.확장자"
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        // 파일 다운로드
        // - 파일 입력
        File downloadFile = new File(filePath);
        FileInputStream fis = new FileInputStream(downloadFile);

        // - 파일 출력
        ServletOutputStream sos = response.getOutputStream();

        // 다운로드
        FileCopyUtils.copy(fis, sos);

        fis.close();
        sos.close();

        return 1;
    }
    
    @Override
    public int delete (int no) throws Exception {

        // 1. 파일 정보 조회
        Files file = fileMapper.select(no);
        // 2. 파일 경로로 파일 객체 접근
        String filePath = file.getFilePath();
        File deleteFile = new File(filePath);
        // 3. 파일 시스텡의 파일 삭제
        // - 파일 존재여부 확인
        if (!deleteFile.exists() )return 0;
        // - 파일 삭제
        boolean deleted = deleteFile.delete();

        // 4. DB의 파일 데이터 삭제
        int result = 0;
        if ( deleted ){
            result = fileMapper.delete(no);
            return result;
        }
        return result;
    }

    @Override
    public int deleteFiles(String no) throws Exception {
        String[] noList = no.split(",");

        int result = 0;
        for (String deleteNo : noList) {
            int fileNo = Integer.parseInt(deleteNo);
            result += delete(fileNo);
        }
        return result;
    }

    @Override
    public int deleteByParent(Files file) throws Exception {
        return fileMapper.deleteByParent(file);
    }

    
}