import { Card, Image, Modal } from "antd";
import styles from "./Profile.module.css";
import { useStoreActions, useStoreState } from "easy-peasy";
import { StoreModel } from "../model/storeModel";
import { useEffect, useMemo, useState } from "react";
import { NewUserComponent } from "../components/NewUserComponent";
import dayjs from "dayjs";
import { HiAcademicCap } from "react-icons/hi2";
import {
    FaGithub,
    FaPhone,
    FaCalendarAlt,
    FaUserAlt,
    FaLink,
} from "react-icons/fa";

interface FormData {
    userName: string;
    birthDate: string;
    telephone: string;
    scholarship: number;
    github: string;
    lattes: string;
}

export function Profile() {
    function formatPhoneNumber(phone: string) {
        if (phone) {
            const cleaned = phone.replace(/\D/g, "");
            const match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
            if (match) {
                return `+${match[1]} ${match[2]} ${match[3]}-${match[4]}`;
            }
            return cleaned;
        }
        return "";
    }

    const formDataOg = {
        userName: "",
        birthDate: "",
        telephone: "",
        scholarship: 0,
        github: "",
        lattes: "",
    };

    function formatShowDate(dateString: string): string {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    const userInfo = useStoreState<StoreModel>((state) => state.login.user);
    const loading = useStoreState<StoreModel>((state) => state.login.loading);
    const fetchUserInfo = useStoreActions<StoreModel>(
        (actions) => actions.login.fetchUserInfo
    );
    const [modalVisible, setModalVisible] = useState(false);

    const uniqueUser = useStoreState<StoreModel>(
        (state) => state.users.selectedUser
    );
    const getUniqueUser = useStoreActions<StoreModel>(
        (actions) => actions.users.getUniqueUser
    );
    const updateUser = useStoreActions<StoreModel>(
        (actions) => actions.users.updateUser
    );

    const noValue = useMemo(() => {
        return "Sem informações";
    }, []);

    const [formData, setFormData] = useState<FormData>(formDataOg);

    function isFormDataInvalid(data: typeof formData): boolean {
        return Object.entries(data).some(([key, value]) => {
            if (value && key === "lattes" && value.length > 120) {
                return true;
            }

            if (value && key === "github" && value.length > 120) {
                return true;
            }

            if (value && key === "userName" && value.length > 100) {
                return true;
            }

            if (key === "lattes") {
                return false;
            }

            if (key === "birthDate") {
                return dayjs(value).isAfter(dayjs());
            }

            if (key === "telephone") {
                const phoneRegex = /\d{13}$/;
                return !phoneRegex.test(value as string);
            }

            return value === null || value === "" || value.length <= 0;
        });
    }

    function handleChange(
        name: string,
        value: string | null | dayjs.Dayjs | number
    ) {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleUpdateProfileClick() {
        if (uniqueUser) {
            setFormData({
                userName: uniqueUser.name,
                birthDate: uniqueUser.birthday ? uniqueUser.birthday : null,
                telephone: uniqueUser.telephone,
                scholarship: uniqueUser.scholarship
                    ? uniqueUser.scholarship.id
                    : 1,
                github: uniqueUser.github,
                lattes: uniqueUser.lattes,
            });
            setModalVisible(true);
        }
    }

    async function handleOk() {
        await updateUser({
            id: userInfo.id,
            name: formData.userName,
            birthday: formData.birthDate,
            github: formData.github,
            lattes: formData.lattes,
            telephone: formData.telephone,
            scholarship_id: formData.scholarship,
        });
        setFormData(formDataOg);
        setModalVisible(false);
        fetchUserInfo();
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo) getUniqueUser({ id: userInfo.id });
    }, [userInfo]);

    return uniqueUser && userInfo ? (
        <>
            <Card
                loading={loading}
                className={styles.card}
                title={<span className={styles.customTitle}>Meu perfil</span>}
            >
                <div className={styles.userImageNameContainer}>
                    
                        <Image
                            className={styles.image}
                            preview={false}
                            src={userInfo.photo}
                            alt="Foto de perfil do usuário"
                        />
                        <p>{uniqueUser.name}</p>
                    
                </div>
                <div className={styles.userInfoContainer}>
                    <div className={styles.userInfo}>
                        <FaUserAlt />
                        <p>E-mail: </p>
                        <span>{userInfo.email}</span>
                    </div>
                    <div className={styles.userInfo}>
                        <FaGithub />
                        <p>Usuário Github: </p>
                        <span>
                            {uniqueUser.github ? (
                                <a
                                    href={`https://github.com/${uniqueUser.github}`}
                                    target="_blank"
                                >
                                    {uniqueUser.github}
                                </a>
                            ) : (
                                noValue
                            )}
                        </span>
                    </div>
                    <div className={styles.userInfo}>
                        <FaCalendarAlt />
                        <p>Data de nascimento: </p>
                        <span>
                            {uniqueUser.birthday
                                ? formatShowDate(uniqueUser.birthday)
                                : noValue}
                        </span>
                    </div>
                    <div className={styles.userInfo}>
                        <FaPhone />
                        <p>Telefone: </p>
                        <span>
                            {uniqueUser.telephone
                                ? formatPhoneNumber(uniqueUser.telephone)
                                : noValue}
                        </span>
                    </div>

                    <div className={styles.userInfo}>
                        <HiAcademicCap />
                        <p>Bolsista: </p>
                        <span>
                            {uniqueUser.scholarship
                                ? uniqueUser.scholarship.name
                                : noValue}
                        </span>
                    </div>

                    <div className={styles.userInfo}>
                        <FaLink />
                        <p>Usuário Lattes: </p>
                        <span>
                            {uniqueUser.lattes ? (
                                <a
                                    href={`https://www.lattes.cnpq.br/${uniqueUser.lattes}`}
                                    target="_blank"
                                >
                                    {uniqueUser.lattes}
                                </a>
                            ) : (
                                noValue
                            )}
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleUpdateProfileClick}
                    className={styles.updateButton}
                >
                    Atualizar Perfil
                </button>
            </Card>

            <Modal
                title={
                    <span className={styles.modalTitle}>Atualizar dados</span>
                }
                open={modalVisible}
                okButtonProps={{
                    disabled: isFormDataInvalid(formData),
                }}
                onOk={handleOk}
                onCancel={() => {
                    setModalVisible(false);
                    setFormData(formDataOg);
                }}
                cancelText={"Cancelar"}
                okText="Atualizar"
                className={styles.modalContainer}
            >
                <NewUserComponent
                    formData={formData}
                    fieldContainer={styles.fieldContainer}
                    select={styles.select}
                    onChange={handleChange}
                />
            </Modal>
        </>
    ) : (
        <p>Não tem informação :(</p>
    );
}
