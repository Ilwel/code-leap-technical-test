import React from 'react';
import { useRouteError } from "react-router-dom";
import './ErrorPage.css'

const ErrorPage = () => {
  
  const error:any = useRouteError();
  console.log(error)

  return(

    <div className="l-error">
      <div className="c-card">
        <h2>Opps, um erro ocorreu:</h2>
        <p>{error.statusText || error.message}</p>
      </div>
    </div>

  )


};

export default ErrorPage;