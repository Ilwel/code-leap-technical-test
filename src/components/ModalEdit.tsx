import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import './ModalEdit.css'
import { ApiService } from '../services/ApiService';
import EditPostContext from '../contexts/EditPostContext';
import { ModalOpenContextType } from '../types/ModalOpenContextType';
import { useNavigate } from 'react-router-dom';

type ModalEditProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalEdit = ({open, setOpen}: ModalEditProps) => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()

  const apiService = new ApiService()

  const { id } = useContext(EditPostContext) as ModalOpenContextType

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!(title && content)) return
    const ok = await apiService.patch(id, {title, content})
    if(ok) navigate(0)
  }

  return (
    open ?
    <div className='c-modal edit'>
      <div className="c-card">
        <form onSubmit={e => handleSubmit(e)} action="">
        <h2>Edit item</h2>
            <div className="input-label">
              <p>Title</p>
              <input onChange={e => setTitle(e.target.value)} type="text" placeholder='Hello world' />
            </div>
            <div className="input-label">
              <p>Content</p>
              <textarea onChange={e => setContent(e.target.value)} className='border' name="content" id="content" placeholder='Content here'></textarea>
            </div>
            <div className="buttons">
              <button onClick={() => setOpen(false)} type='submit' className='border'>Cancel</button>
              <button type='submit' className={title && content ? 'success' : 'is-disabled'}>Save</button>
            </div>
        </form>
      </div>
    </div>
    : <></>
  );
};

export default ModalEdit;