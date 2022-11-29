import { Routes, Route } from "react-router-dom";
import routers from "./routers";

function App() {
    return (
        <div className="App">
            <Routes>
                {routers.map((route, id) => {
                    const Page = route.component;

                    return (
                        <Route key={id} path={route.path} element={<Page />} />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
