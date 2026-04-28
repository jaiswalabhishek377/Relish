import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className="app-play-store" id='app-download'>
      <h1>For Better Experience Download</h1> 
      <h1>Relish App</h1>
      <div className="app-play-imgs">
        <img src={assets.play_store} alt="playstore" />
        <img src={assets.app_store} alt="appstore" />
      </div>
    </div>
  )
}

export default AppDownload
