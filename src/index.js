import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./Styles/Style.scss"
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import {VideoInputScreen} from "./Components/VideoComponents/VideoCreator/VideoInputScreen";
import {VideoEditScreen} from "./Components/VideoComponents/VideoCreator/VideoEditScreen";
import {VideoPreviewScreen} from "./Components/VideoComponents/VideoPreview/VideoPreviewScreen";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<VideoInputScreen/>}/>
            <Route path={"/edit-video"} element={<VideoEditScreen/>}/>
            <Route path={"/preview-video"} element={<VideoPreviewScreen/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
