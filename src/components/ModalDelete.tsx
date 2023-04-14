import React, { Dispatch, SetStateAction, useContext } from 'react';
import './ModalDelete.css'
import DeletePostContext from '../contexts/DeletePostContext';
import { ModalOpenContextType } from '../types/ModalOpenContextType';
import { ApiService } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';

type ModalDeleteProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalDelete = ({open, setOpen}:ModalDeleteProps) => {

  const navigate = useNavigate()

  const { id } = useContext(DeletePostContext) as ModalOpenContextType

  const apiService = new ApiService()

  const handleDelete = async () => {
    const ok = await apiService.delete(id)
    if(ok) navigate(0)
  }

  return (
    open ?
    <div className='c-modal'>
      <div className="c-card">
        <h2>Are you sure you want to delete this item?</h2>
        <div className="buttons">
          <button onClick={() => setOpen(false)} className='border'>Cancel</button>
          <button onClick={handleDelete} className='danger'>Delete</button>
        </div>
      </div>
    </div>
    : <></>
  );
};

export default ModalDelete;