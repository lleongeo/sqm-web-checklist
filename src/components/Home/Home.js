import React from 'react';
import { useSelector } from 'react-redux';
import languageConfig from '../../config/languageConfig';

const Home = () => {

    const selectedLanguage = useSelector(state => state.ux.language);

    return (
        !languageConfig[selectedLanguage] ? null :
            <div className="container-fluid">
                <h1 className="display-4">{languageConfig[selectedLanguage].welcomeTitle}</h1>
                <hr className="my-2" />
                <h3 className="lead">{languageConfig[selectedLanguage].welcomeSubtitle}</h3>
            </div>
    );
}

export default Home;
