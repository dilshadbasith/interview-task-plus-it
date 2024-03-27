import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [assembly, setAssembly] = useState();
  const [selectedAssembly, setSelectedAssembly] = useState();
  const[local,setLocal]=useState()
  const [selectedlocal, setSelectedlocal] = useState();
//   console.log(selectedlocal)


  async function getDistricts() {
    const list = await axios?.get(
      "https://dccbackend.plusitpark.com/api/admin/districtV4"
    );
    setDistrict(list.data);
  }
  useEffect(() => {
    getDistricts();
  }, []);

  async function getassembly() {
    const assemblylist = await axios?.get(
      `https://dccbackend.plusitpark.com/api/admin/districtV4?district=${selectedDistrict}&constituency=${selectedDistrict}&assembly`
    );
    setAssembly(assemblylist?.data);
  }
  useEffect(() => {
    getassembly();
  }, [getDistricts]);

  async function getLocal() {
    const locallist = await axios?.get(
      `https://dccbackend.plusitpark.com/api/admin/districtV4?district=${selectedDistrict}&constituency=${selectedDistrict}&assembly=${selectedAssembly}&local=${selectedlocal}`
      );
      console.log(locallist)
  }
  useEffect(() => {
    getLocal();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center gap-4    ">
        <input type="text" placeholder="name" id="name" required />
        <input type="email" placeholder="Email" id="email" required />
        <input
          type="number"
          placeholder="Enter Phone Number"
          id="number"
          required
        />
        <input type="date" placeholder="Birthday" id="birthday" required />
        <select
          name="Districts"
          id="Districts"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e?.target?.value)}
        >
          {district?.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        {assembly ? (
            <div>
          <select name="assembly" id="assembly" value={selectedAssembly} onChange={(e)=>setSelectedAssembly(e?.target?.value)}>
            {assembly?.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <select name="local" id="local" value={selectedlocal} onChange={(e)=>setSelectedlocal(e?.target?.value)}>
          <option value="panchayath">Panjayath</option>
          <option value="municipality">Municipality</option>
          <option value="corporation">corporation</option>
      </select>
      </div>
        ) : null}

      </div>
    </div>
  );
}

export default Home;
