import React, { useState } from 'react';
import { Button, Card, Table } from 'antd';
import useFetchData from './hooks/useFetchData';
import FormModal from './FormModal';
import { endpoint } from './endpoints';
// import { render } from '@testing-library/react';
function App() {

  const columns = [
    {
      title: "S/N",
      dataIndex: "key",
      key: "1"
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "2"
    },
    {
      title: "LGA😎🤩",
      dataIndex: "lga",
      key: "3"
    },{
      title: "CODE😊",
      dataIndex: "code",
      key: "4"
    },
    {
      title: "Time 😂In",
      dataIndex: "timeIn",
      key: "5",
      render: (_, record) => {
        return (<p>
          {record.timeIn}
          {parseInt(record.timeIn?.split(":")[0]) >= 12 ? "pm" : "am"}
          </p>)
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "6",
      width: "100px",
      render: (_, record) => {
        return (
          <Button type='primary'className=' bg-blue-800 px-5 font-semibold'>Clock Out</Button>
          
        )
      }
    },
  ]


  const [open, setOpen] = useState(false)
  // import your custom hook here
  const { data, loading } = useFetchData(endpoint.getAllStudentClockedIn);
  const dataSource = Array.isArray(data) ? data.map((x, index) => {
    return {
      ...x,
      key: index + 1,
    }
  }) : []

  return (
    <div className=" min-h-[100svh]">
      <FormModal open = {open} setOpen={setOpen} />
     <header className=' h-[4rem] outline outline-1 outline-[#c4c4c4] text-3xl flex items-center justify-center font-bold '>
      STUDENT REGISTER
     </header>
     <main className=' p-10'>
      <Button type='primary' className=' bg-blue-800 float-right px-5 font-semibold' onClick={() => setOpen(true)}>
        Clock In
      </Button>
      <Card className=' mt-[2.5rem!important]'>
      <Table bordered loading = {loading} columns={columns} dataSource={Array.isArray(dataSource) ? dataSource : []}/>
      </Card>
     </main>

    </div>
  );
}

export default App;
