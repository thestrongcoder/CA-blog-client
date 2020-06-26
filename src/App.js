import React, { useState, useEffect } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import blogData from './data/post_data'
import Nav from './components/Nav'
import BlogPosts from './components/BlogPosts'
import BlogPost from './components/BlogPost'
import NewBlogPost from './components/NewBlogPost'
import EditBlogPost from './components/EditBlogPost'

const App = () => {
  let x=0
  const [blogPosts, setBlogposts] = useState([])

  useEffect(()=>{
    setBlogposts(blogData)
  }, [])

  function getPostFromId (id) {
    //console.log(blogPosts)
    return blogPosts.find((post) => post._id === parseInt(id) )
  }

  function addBlogPost(post){
    setBlogposts([...blogPosts,post])
  }

  function deleteBlogPost(id){
    const otherBlogPosts = blogPosts.filter((post)=> post._id !== parseInt(id))
    setBlogposts(otherBlogPosts)
  }

  function updateBlogPost(updatedPost){
    const otherBlogPosts = blogPosts.filter((post)=> post._id !== parseInt(updatedPost._id))
    setBlogposts([...otherBlogPosts, updatedPost])
  }

  function getNextId(){
    const ids = blogPosts.map((post)=> post._id)
    return ids.sort()[ids.length - 1] + 1
  }

  return (
    <div >
      <BrowserRouter>
        <Nav />
        <h1>The Strong Coder</h1>
        <Switch>
          <Route exact path="/" render={(props) => <BlogPosts {...props} postData={blogPosts} /> }  />
          <Route exact path="/posts/new" render={(props)=> 
            <NewBlogPost {...props} addBlogPost={addBlogPost} nextId={getNextId()} /> } />
          <Route exact path="/posts/:id" render={(props) => 
            <BlogPost {...props} post={getPostFromId(props.match.params.id)} showControls deleteBlogPost={deleteBlogPost}/> } />
          <Route exact path="/posts/edit/:id" render={(props) => 
            <EditBlogPost {...props} post={getPostFromId(props.match.params.id)} updateBlogPost={updateBlogPost}/> }/>
        </Switch> 
        </BrowserRouter>
    </div>
  )
}

export default App
