import { Outlet } from 'react-router-dom';
import './Root.css';
import ModalDelete from './components/ModalDelete';
import { useState } from 'react';
import DeletePostContext from './contexts/DeletePostContext';
import ModalEdit from './components/ModalEdit';
import EditPostContext from './contexts/EditPostContext';

function Root() {

  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [id, setId] = useState(0)

  return (
    <div className="l-general">
      <DeletePostContext.Provider value = {{ id, setId, open:openModalDelete, setOpen:setOpenModalDelete}} >
        <EditPostContext.Provider value = {{ id, setId, open:openModalEdit, setOpen:setOpenModalEdit}}>
          <ModalDelete open={openModalDelete} setOpen={setOpenModalDelete}/>
          <ModalEdit open={openModalEdit} setOpen={setOpenModalEdit}/>
          <Outlet/>
        </EditPostContext.Provider>
      </DeletePostContext.Provider>
    </div>
  );
}

export default Root;
