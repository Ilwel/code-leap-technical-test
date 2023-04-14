import React, { useState, useEffect, useContext } from 'react';
import './Home.css'
import { ApiService } from '../services/ApiService';
import Post from '../components/Post';
import { PostType } from '../types/PostType';
import { useNavigate } from 'react-router-dom';
import DeletePostContext from '../contexts/DeletePostContext';
import { ModalOpenContextType } from '../types/ModalOpenContextType';
import EditPostContext from '../contexts/EditPostContext';

const Home = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState<PostType []>()
  const apiService = new ApiService()

  const { open: openDelete } = useContext(DeletePostContext) as ModalOpenContextType
  const { open: openEdit } = useContext(EditPostContext) as ModalOpenContextType
  
  const navigate = useNavigate()
  
  useEffect(() => {
    const apiService = new ApiService()
    const username = localStorage.getItem('username')
    if(!username) navigate('/sign-up')
    const fetchData = async () => {
      const postsResponse = await apiService.listAll()
      setPosts(postsResponse.results)
    }
    fetchData()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const username = localStorage.getItem('username')
    if(!(title && content && username)) return
    const ok = await apiService.post({ username, title, content})
    if(ok) navigate(0)
  }

  const signOut = () => {
    localStorage.removeItem('username')
    navigate(0)
  }

  return (
    <div onSubmit={e => handleSubmit(e)} className='l-home'>
      <div className="sign-out">
        <p>Sign Out</p>
        <img onClick={signOut} src={'/signOut.svg'} alt="sign out icon"/>
      </div>
      <div className={openDelete || openEdit ? "c-card on-modal" : "c-card"}>
        <div className="c-header">
          <h2 className='ellipsis'>CodeLeap Network</h2>
        </div>
        <div className="content">
          <form className="c-card border">
            <h2>What’s on your mind?</h2>
            <div className="input-label">
              <p>Title</p>
              <input onChange={e => setTitle(e.target.value)} type="text" placeholder='Hello world' />
            </div>
            <div className="input-label">
              <p>Content</p>
              <textarea onChange={e => setContent(e.target.value)} className='border' name="content" id="content" placeholder='Content here'></textarea>
            </div>
            <button type='submit' className={title && content ? 'primary' : 'is-disabled'}>Create</button>
          </form>
          <div className="posts">
            {posts?.map(post => (
              <Post key={post.id} post={post}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;