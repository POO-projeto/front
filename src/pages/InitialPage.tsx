import { Button, ConfigProvider } from "antd";
import styles from "./InitialPage.module.css"
import { useStoreActions, useStoreState } from "easy-peasy";
import { StoreModel } from "../model/storeModel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const buttonTheme = {
    components: {
        Button: {
            colorPrimary: "#db4437",
            colorPrimaryHover: "#4285F4",
            colorPrimaryActive: "#a12a17",
            borderRadius: 5,
            contentFontSize: 50,
            controlHeight: 40,
        },
    },
};


export function InitialPage() {
    const navigate = useNavigate();

    const login = useStoreActions<StoreModel>((actions) => actions.login.login);
    const isAuthenticated = useStoreState<StoreModel>((state) => state.login.isAuthenticated);
    const loginCallback = useStoreActions<StoreModel>((actions) => actions.login.loginCallback);

    function handleGoogleLogin() {
        login();
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/profile");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('jwt');

        if (token) {
            loginCallback(token);
        }
    }, [loginCallback]);

    return (

        <div className={styles.container}>
            <h1 className={styles.title}>SIGAD</h1>

            <div className={styles.content}>
                <div className={styles.leftContent}>
                    <p className={styles.description}>
                        Sistema Integrado de Gerenciamento de Atividades Diárias
                    </p>

                    <div className={styles.googleButton}>

                        <ConfigProvider theme={buttonTheme}>
                            <Button
                                icon={<FaGoogle />}
                                className={styles.googleLoginbutton}
                                size="large"
                                onClick={handleGoogleLogin}
                            >
                                Faça login com Google
                            </Button>
                        </ConfigProvider>

                    </div>

                </div>

                <div className={styles.imageContainer}>
                    <img
                        src="public/assets/homepage.png"
                        alt="Ícone"
                        className={styles.icon}
                    />
                </div>
            </div>
        </div>
    )
}
