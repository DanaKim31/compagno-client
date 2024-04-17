// import {createlostBoard} from "../../api/lostBoard";
// import {useState, useEffect} from "react";


const CreateLostBoard=()=>{

    return (
        <>
        <h1>동물 분실 등록</h1>
        <input placeholder="글 제목 lostTitle"/>
        <input placeholder="분실동물이름 lostAnimalName"/>
        <input placeholder="분실 날짜 lostDate"/>
        <input placeholder="분실 동물 사진1장 lostAnimalName"/>
        <input placeholder="분실 지역 lostLocation"/>
        <input placeholder="분실 동물 종류 lostAnimalKind"/>
        <input placeholder="분실 동물 색깔 lostAnimalColor"/>
        <input placeholder="분실 동물 성별 lostAnimalGender"/>
        <input placeholder="분실 동물 나이 lostAnimalAge"/>
        <input placeholder="분실 동물 특징 lostAnimalFeature"/>
        <input placeholder="분실 동물 이거 뭔 번호냐 lostAnimalRFID"/>
       <input placeholder="게시글 올릴 때 이미지들 images"/>
        <button></button>
        </>
    );
};
export default CreateLostBoard;