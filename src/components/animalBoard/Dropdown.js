import Dropdown from "react-bootstrap/Dropdown";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import React from "react";
import { useState } from "react";
const DropdownToggle = ({ comment }) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <HiOutlineDotsHorizontal
      className="dropdown-toggle"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  const [edit, setEdit] = useState({});
  const onUpdate = async (comment) => {
    console.log(comment);
    setEdit(comment);
    console.log(edit);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        id="dropdown-custom-components"
      ></Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item
          onClick={() => {
            onUpdate(comment);
          }}
        >
          수정하기
        </Dropdown.Item>
        <Dropdown.Item>삭제하기</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownToggle;
