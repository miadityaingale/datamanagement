import { useState } from 'react';
import './App.css';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Toaster, toast } from 'react-hot-toast';
import Navv from './Nav';

function App() {

  let [formData, setFormData] = useState(
    {
      uname: '',
      uemail: '',
      uphone: '',
      umessage: '',
      index: ''
    }
  );

  let [userData, setUserData] = useState([]);

  let getFormData = (event) => {
    let oldData = { ...formData }
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
  }

  let handleFormSubmit = (event) => {
    let currentUserData = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umessage: formData.umessage
    }

    if (formData.index === '') {
      let checkFilterUser = userData.filter((v) => v.uemail === formData.uemail || v.uphone === formData.uphone);
      if (checkFilterUser.length === 1) {
        toast.error('Email or Phone already exists!', {
          style: {
            border: '1px solid #fc1c03',
            marginTop: '20px'
          }
        });
      }
      else {
        let oldUserData = [...userData, currentUserData];
        setUserData(oldUserData);
        toast.success('Data Saved', {
          style: {
            border: '1px solid #00d431',
            marginTop: '20px'
          }
        });
        setFormData(
          {
            uname: '',
            uemail: '',
            uphone: '',
            umessage: '',
            index: ''
          }
        )
      }
    }
    else
    {
      let editIndex=formData.index;
      let oldData = userData;

      let checkFilterUser = userData.filter((v,i)=>(v.uemail===formData.uemail || v.uphone===formData.uphone) && i!==editIndex)

      if(checkFilterUser.length===0)
        {
      oldData[editIndex]['uname']=formData.uname;
      oldData[editIndex]['uemail']=formData.uemail;
      oldData[editIndex]['uphone']=formData.uphone;
      oldData[editIndex]['umessage']=formData.umessage;
      setUserData(oldData);
      setFormData(
        {
          uname: '',
          uemail: '',
          uphone: '',
          umessage: '',
          index: ''
        }
      )
      toast.success('Updated Succesfully', {
        style: {
          border: '1px solid #00d431',
          marginTop: '20px'
        }
      });
    }
    else{
      toast.error('Email or Phone already exists!', {
        style: {
          border: '1px solid #fc1c03',
          marginTop: '20px'
        }
      });
    }
    }

    event.preventDefault();
  }

  let deleteRow = (indexNumber) => {
    let filterDataAfterDelete = userData.filter((v, i) => i !== indexNumber);
    setUserData(filterDataAfterDelete);
    toast.success('Data deleted', {
      style: {
        marginTop: '20px'
      }
    });
    setFormData(
      {
        uname: '',
        uemail: '',
        uphone: '',
        umessage: '',
        index: ''
      }
    )
  }

  let editRow = (indexNumber) => {
    let editData = userData.filter((v, i) => i === indexNumber)[0];
    editData['index'] = indexNumber;
    setFormData(editData);

  }



  return (
    <div className="App">

      <Toaster position="top-center" reverseOrder={false} />

      <Navv/>

      <Container fluid>
        <Row>
          <Col lg={3}>
            <form className='bordered-1' onSubmit={handleFormSubmit}>
              <h5 className='center'>Add Data</h5>
              <div className='pb-3'>
                <input type='text' onChange={getFormData} value={formData.uname} name='uname' placeholder='Name' className='form-control' required/>
              </div>
              <div className='pb-3'>
                <input type='email' onChange={getFormData} value={formData.uemail} name='uemail' placeholder='Email' className='form-control' required/>
              </div>
              <div className='pb-3'>
                <input type='number' onChange={getFormData} value={formData.uphone} name='uphone' placeholder='Phone' className='form-control' required/>
              </div>
              <div className='mb-3'>
                <textarea onChange={getFormData} value={formData.umessage} className='form-control' placeholder='Message' rows={3} name='umessage' />
              </div>
              <div className="d-grid gap-2">
              <button className='btn btn-primary'>
                {
                  formData.index !== '' ? 'Update' : 'Save'
                }
              </button>
              </div>
            </form>
          </Col>
          <Col lg={9}>
          <h5 className='center'>Data Table</h5>
            <Table bordered striped responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length >= 1 ?
                  userData.map((obj, i) => {
                    return (
                      <>
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{obj.uname}</td>
                          <td>{obj.uemail}</td>
                          <td>{obj.uphone}</td>
                          <td>{obj.umessage}</td>
                          <td>
                            <center>
                              <Button onClick={() => deleteRow(i)} variant='outline-warning'>❌</Button>{'  '}
                              <Button onClick={() => editRow(i)} variant='outline-primary'>📝</Button>
                            </center>
                          </td>
                        </tr>
                      </>
                    )
                  })
                  :
                  <tr><td colSpan={6}><center>No data Found</center></td></tr>
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
