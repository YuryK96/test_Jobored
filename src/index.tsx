import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {Provider} from "react-redux";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./pages/layout";
import {Vacancies} from "./pages/vacancies";
import {Favorites} from "./pages/favorites";
import '../src/scss/fonts.scss'
import {store} from "./redux-toolkit/store";
import {Vacancy} from "./pages/vacancy";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="/test_Jobored">
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route path='/' element={<Vacancies/>}/>
                        <Route path='/favorites' element={<Favorites/>}/>
                        <Route path='/vacancy' element={<Vacancy/>}/>
                    </Route>

                </Routes>
            </BrowserRouter></Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
