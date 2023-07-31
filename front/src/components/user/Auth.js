import React from "react";
import homepage from "../../Assets/images/homepage.webp";
import smielySocial from '../../Assets/images/logos/smielySocial.png'

const Auth = ({ children }) => {
  return (
    <div className="w-full h-full m-auto">
      <div className="flex justify-center w-full h-screen md:w-[55%] py-8 m-auto">
        <div className="rotate-45 hidden ml-8 w-[80%] mt-[5rem] opacity-60 rounded-md h-screen md:block bg-[url('https://img.freepik.com/free-vector/blue-background-with-colored-emoticons_23-2147630911.jpg?w=740&t=st=1687411831~exp=1687412431~hmac=8b2fcea572d2ee6bc596cf4058f5f809e22dbf0c8e108d78ec71d717fded1287')] bg-no-repeat">
          <img
            draggable="false"
            className="mr-[80px] mt-[1.8rem] ml-[15px] opacity-60 m-auto -rotate-45"
            src={smielySocial}
            alt="homepage"/>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-2/5 m-auto shadow-md pb-3 mr-10 z-10 rounded-md">
          {children}

          <p className="text-center text-sm my-2">Get the app.</p>
          <div className="flex gap-3 justify-center">
            <img
              draggable="false"
              width="130px"
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
              alt="appstore"
            />
            <img
              draggable="false"
              width="130px"
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
              alt="playstore"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
