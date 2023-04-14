import React, { useContext, useEffect, useState } from 'react';
import { PostType } from '../types/PostType';
import "./Post.css"
import { timeSince } from '../utils/timeSince';
import DeletePostContext from '../contexts/DeletePostContext';
import { ModalOpenContextType } from '../types/ModalOpenContextType';
import EditPostContext from '../contexts/EditPostContext';

type PostProps = {
  post: PostType
}

const Post = ({ post }:PostProps) => {

  const [isSessionUser, setIsSessionUser] = useState(false)

  const { setOpen: setOpenDelete, setId: setIdDelete } = useContext(DeletePostContext) as ModalOpenContextType
  const { setOpen: setOpenEdit, setId: setIdEdit} = useContext(EditPostContext) as ModalOpenContextType

  useEffect(() => {
    const username = localStorage.getItem('username')
    if(username === post.username) setIsSessionUser(true)
    else setIsSessionUser(false)
  }, [post.username])

  return (
    <div className='c-post border'>
      <div className="c-header">
        <h2>
          {post.title}
        </h2>
        {isSessionUser ? (
          <div className="user-edit">
            <img onClick={() => {
                setOpenDelete(true)
                setIdDelete(post.id)
              }
            } src="/delete.svg" alt='delete icon'/>
            <img onClick={() => {
                setOpenEdit(true)
                setIdEdit(post.id)
              } 
            } src="/edit.svg" alt='edit icon'/>
          </div>
        ): ''}
      </div>
        <div className="content">
          <div className="titles">
            <p className='bold'>
              @{post.username}
            </p>
            <p>
              {timeSince(new Date(post.created_datetime))}
            </p>
          </div>
          <p className='ellipsis'>
            {post.content}
          </p>
        </div>
    </div>
  );
};

export default Post;