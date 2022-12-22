import React from 'react'
import { useSelector } from 'react-redux'
import languageConfig from 'src/config/languageConfig'

const Dashboard = () => {
  const selectedLanguage = useSelector(state => state.ux.language)
  return (
    <>
      <h1 className="display-4">{languageConfig[selectedLanguage].welcomeTitle}</h1>
      <hr className="my-2" />
      <h3 className="lead">{languageConfig[selectedLanguage].welcomeSubtitle}</h3>
    </>
  )
}

export default Dashboard
