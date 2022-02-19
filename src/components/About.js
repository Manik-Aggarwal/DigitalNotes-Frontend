import { React } from 'react';
// import { React, useContext, useEffect } from 'react';
// import noteContext from '../context/notes/noteContext';

const About = () => {
  return (
    <>
    <div className='container login-container'>
      <h1 className='mt-4'>About Me</h1>
      <div className='mt-4'>
      <h2>Hi, I am Manik Aggarwal,</h2>

      <p>I am a Full Stack MERN Developer, I’m looking to collaborate with other open source enthusiasts on some 😎 cool projects. I’m a self-taught developer with a passion for learning and problem solving. I’m currently working on a full stack MERN application.</p>

      Feel free to reach me at: <a href="mailto:manikaggarwal993@gmail.com">manikaggarwal993@gmail.com</a>

        <div className='social mt-4 mb-4'>
          <a className='socicons' href="https://t.me/ManikAggarwal" target="_blank" rel="noreferrer"><i className="fa-brands fa-telegram"></i></a>

          <a className='socicons' href="https://www.instagram.com/manikaggarwal_2407/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>

          <a className='socicons' href="https://www.linkedin.com/in/manik-aggarwal-640110188" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
        </div>

        <p className="foot">&#169; Manik Aggarwal 2022. All rights reserved.</p>
      </div>
    </div>
    </>
  )
}

export default About









  // const a = useContext(noteContext);
  // useEffect(() => {
  //   a.update();
  //   //eslint-disable-next-line
  // },[])

  // return (
    //for useeffect
    // <div>This is about {a.state.name} and he is in {a.state.class}</div>
  // )