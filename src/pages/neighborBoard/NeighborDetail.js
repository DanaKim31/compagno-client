import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getNeighborBoard,
  updateNeighborBoard,
  deleteNeighborBoard,
  getNeighborComments,
  registerNeighborComment,
  registerNeighborReply,
  updateNeighborComment,
  deleteNeighborComment,
} from "../../api/sitterBoard";
import { useSelector } from "react-redux";
import styled from "styled-components";

const NeighborDetail = () => {
  return (
    <>
      <h1>우리동네 게시판 게시글 상세페이지</h1>
    </>
  );
};

export default NeighborDetail;
