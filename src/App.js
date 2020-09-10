import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles, modalStyle } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed'


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([
    // {
    //   username:'vishalstark',
    //   caption:'Classic since 1998',
    //   imageUrl:'https://reactjs.org/logo-og.png'
    // },
    // {
    //   username:'iamha13',
    //   caption:'Vintage since 1998', 
    //   imageUrl:'https://cdn.s3waas.gov.in/s31141938ba2c2b13f5505d7c424ebae5f/uploads/bfi_thumb/2019072782-olw7a11t3ku887si7euiyla2c3im3mzfh7n0gbxyva.jpg'
    // }
  ]);

  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser) {
          console.log(authUser);
          setUser(authUser);

          if(authUser.displayName) {
            //dont update username
          }
          else {
            // if we just created someone
            return authUser.updateProfile({
              displayName: username,
            })
          }
        }
        else {
          //user has logged out
          setUser(null);
        }
      })

      return () => {
        //perform some cleanup actions
        unsubscribe();
      }
  }, [user, username]);


  //useEffectRuns a piece of code on a specific condition
  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);


  const signUp = (event) => {
      event.preventDefault();

      auth.createUserWithEmailAndPassword(email,password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
      setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

      setOpenSignIn(false);
  }

  return (
    <div className="app">
    
       <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
              <center>
                <img
                  className='app__headerImage'
                  src='https://i.ibb.co/44WBRPP/logo1.png'
                  alt=''
                />
              </center>
                <Input 
                  placeholder='username'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input 
                  placeholder='email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                  placeholder='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type='submit' onClick={signUp}>Sign Up</Button>
          </form>
    </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
              <center>
                <img
                  className='app__headerImage'
                  src='https://i.ibb.co/44WBRPP/logo1.png'
                  alt=''
                />
              </center>
                
                <Input 
                  placeholder='email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                  placeholder='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type='submit' onClick={signIn}>Sign In</Button>
          </form>
    </div>
      </Modal>
      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://i.ibb.co/44WBRPP/logo1.png'
          alt=''
        />
         {user ? (
            <Button onClick={() => auth.signOut()}>LogOut</Button>  
          ) : (
            <div className='app__loginContainer'>
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
          )}
      </div>

     
      <div className='app__posts'>
        <div className='app__postsLeft'>
        {
        posts.map(({id, post}) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
        }
        </div>
      
        <div className='app__postsRight'>
        <InstagramEmbed  
        url='https://www.instagram.com/p/BSbdHbplnEC/'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />

      <InstagramEmbed  
              url='https://www.instagram.com/p/B84Dc0flgQK/'
              maxWidth={320}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />

      <InstagramEmbed  
              url='https://www.instagram.com/p/BTYjHXohpfn/'
              maxWidth={320}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
        </div>
      </div>
      

      { user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ) : (
              <h3>Login To Upload</h3>
            )}  
      {/* Posts */}
      {/* */}
      {/* */}
    </div>
  );
}

export default App;
