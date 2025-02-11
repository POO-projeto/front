import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Profile } from "./pages/Profile";
import { Projects } from "./pages/Projects";
import { InitialPage } from "./pages/InitialPage";
import { UserDailies } from "./pages/UserDailies";
import { DailiesHistory } from "./pages/DailiesHistory";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Users } from "./pages/Users";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<InitialPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="projects" element={<Projects />} />
                    <Route
                        path="dailies-history"
                        element={<DailiesHistory />}
                    />
                    <Route path="user-dailies" element={<UserDailies />} />
                    <Route
                        path="users"
                        element={<Users />}
                    />
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
