-- Active: 1714701530602@@127.0.0.1@3306@joeun
CREATE TABLE `todo` (
    `no` int NOT NULL AUTO_INCREMENT,
    `name` text NOT NULL,
    `status` int DEFAULT '0',
    `reg_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `upd_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`no`)
) COMMENT='할일';

SELECT * FROM todo;

-- 기존 데이터 모두 삭제 (TRUNCATE)
TRUNCATE TABLE todo;

-- 새로운 데이터 삽입 (INSERT)
INSERT INTO todo (name, status)
VALUES 
    ('리액트 공부하기', 0),
    ('스프링 복습하기', 1),
    ('취업 사진 찍기', 0),
    ('자소서 초안 쓰기', 1);
