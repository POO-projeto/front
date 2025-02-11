
import { Outlet  } from "react-router-dom";


export function DefaultLayout() {

    return (
        <div className="container">
            <Outlet />
        </div>
    );
}
