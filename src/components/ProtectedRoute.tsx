import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import { StoreModel } from "../model/storeModel";
import { useState } from "react";
import { AiOutlineHome, AiOutlineMessage, AiOutlineUser, AiOutlineBarChart, AiOutlineMenu } from "react-icons/ai";
import { LogoutOutlined } from "@ant-design/icons";
import styles from "./ProtectedRoute.module.css";
import { HiOutlineUsers } from "react-icons/hi2";


export const ProtectedRoute = () => {
    const navigate = useNavigate();

    const isAuthenticated = useStoreState<StoreModel>((state) => state.login.isAuthenticated);
    const logout = useStoreActions<StoreModel>((actions) => actions.login.logout);

    const [isExpanded, setIsExpanded] = useState(true);

    return isAuthenticated ? (
        <div className={styles.layout}>
            <aside className={isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}>
                <div className={styles.topSection}>
                    <div className={styles.logo}>
                        {isExpanded && <span className={styles.logoText}>SIGAD</span>}
                    </div>
                    <button className={styles.toggleBtn} onClick={() => setIsExpanded(!isExpanded)}>
                        <AiOutlineMenu />
                    </button>
                </div>

                <nav className={styles.menu}>
                    <button className={styles.menuItem} onClick={() => navigate("/profile")}>
                        <AiOutlineUser className={styles.icon} />
                        {isExpanded && "Perfil"}
                    </button>

                    <button className={styles.menuItem} onClick={() => navigate("/projects")}>
                        <AiOutlineHome className={styles.icon} />
                        {isExpanded && "Projetos"}
                    </button>

                    <button className={styles.menuItem} onClick={() => navigate("/user-dailies")}>
                        <AiOutlineMessage className={styles.icon} />
                        {isExpanded && "Minhas dailies"}
                    </button>

                    <button className={styles.menuItem} onClick={() => navigate("/dailies-history")}>
                        <AiOutlineBarChart className={styles.icon} />
                        {isExpanded && "Histórico de dailies"}
                    </button>

                    <button className={styles.menuItem} onClick={() => navigate("/users")}>
                        <HiOutlineUsers className={styles.icon} />
                        {isExpanded && "Usuários"}
                    </button>
                </nav>

                <div className={styles.logout}>
                    <button className={`${styles.menuItem} ${styles.logoutBtn}`} onClick={logout}>
                        <LogoutOutlined className={styles.icon} />
                        {isExpanded && "Logout"}
                    </button>
                </div>
            </aside>

            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    ) : (
        <Navigate to="/" />
    );
};
