import { getInsts } from "../../api/registerPet";
import { useEffect, useState } from "react";

const RegisterInstList = () => {
  const [insts, setInsts] = useState([]);

  const instsAPI = async () => {
    const response = await getInsts();
    console.log(response.data);
    setInsts(response.data);
  };

  useEffect(() => {
    instsAPI();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {/* <th>No</th> */}
          <th>기관명</th>
          <th>주소</th>
          <th>대표자</th>
          <th>전화번호</th>
        </tr>
      </thead>
      <tbody>
        {insts?.map((inst) => (
          <tr key={inst.regiBoardCode}>
            <td>{inst.regiInstName}</td>
            <td>{inst.regiInstAddr}</td>
            <td>{inst.regiInstOwner}</td>
            <td>{inst.regiInstPhone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RegisterInstList;
