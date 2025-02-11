import {
    Card,
    Row,
    Col,
    Pagination,
    Avatar,
    Tooltip,
    DatePicker,
    Input,
    Select,
    InputRef,
} from "antd";
import styles from "./Users.module.css";
import { useStoreActions, useStoreState } from "easy-peasy";
import { StoreModel } from "../model/storeModel";
import { useEffect, useMemo, useRef, useState } from "react";

import {
    FaGithub,
    FaPhone,
    FaCalendarAlt,
    FaUserAlt,
    FaLink,
} from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import { User } from "../services/types/users-service-types";
import dayjs, { Dayjs } from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

export function Users() {
    const loading = useStoreState<StoreModel>((state) => state.users.loading);
    const users: User[] = useStoreState<StoreModel>(
        (state) => state.users.users
    );
    const countUsers = useStoreState<StoreModel>((state) => state.users.count);

    const getUsers = useStoreActions<StoreModel>(
        (actions) => actions.users.getUsers
    );

    const userNameFilter = useRef<InputRef>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [tempUserName, setTempUserName] = useState("");
    const [userName, setUserName] = useState("");
    const [selectedScholarShipId, setSelectedScholarshipId] = useState<
        number | null
    >(null);

    const updatePageSize = () => {
        const width = window.innerWidth;
        if (width < 576) {
            setPageSize(1);
        } else if (width < 768) {
            setPageSize(2);
        } else {
            setPageSize(3);
        }
    };

    const noValue = useMemo(() => {
        return "Sem informações";
    }, []);

    useEffect(() => {
        setTimeout(() => {
            userNameFilter.current?.focus({});
        }, 500);

        getUsers({
            per_page: pageSize,
            page: currentPage,
            name: userName ? userName : null,
            scholarship_id: selectedScholarShipId ?? null,
            birthday: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
        });
        updatePageSize();
        window.addEventListener("resize", updatePageSize);
        return () => window.removeEventListener("resize", updatePageSize);
    }, [pageSize, currentPage, selectedDate, selectedScholarShipId, userName]);

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

    return (
        <>
            <Card
                loading={loading}
                className={styles.card}
                title={
                    <span className={styles.customTitle}>
                        Lista de Usuários
                    </span>
                }
            >
                <div className={styles.filterUsersContainer}>
                    <DatePicker
                        placeholder="Nascimento"
                        allowClear
                        format={"DD/MM/YYYY"}
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                    />
                    <Input
                        ref={userNameFilter}
                        id="userName"
                        value={tempUserName}
                        placeholder="Nome"
                        className={styles.userNameFilter}
                        onChange={(e) => setTempUserName(e.target.value)}
                        onPressEnter={() => setUserName(tempUserName)}
                        allowClear
                        suffix={
                            <SearchOutlined
                                onClick={() => setUserName(tempUserName)}
                            />
                        }
                        onClear={() => setUserName("")}
                        maxLength={100}
                    />
                    <Select
                        className={styles.select}
                        id="scholarship"
                        value={selectedScholarShipId}
                        allowClear
                        placeholder="Tipo de bolsa"
                        onChange={(value) => setSelectedScholarshipId(value)}
                        options={[
                            { value: 2, label: "Remunerado" },
                            { value: 1, label: "Voluntário" },
                        ]}
                    />
                </div>

                <Row gutter={[16, 16]} justify="start">
                    {users ? (
                        users.map((user) => (
                            <Col
                                key={user.id}
                                xs={24}
                                sm={12}
                                md={8}
                                lg={8}
                                className={styles.responsiveCol}
                            >
                                <Card className={styles.userCard}>
                                    <div
                                        className={
                                            styles.userImageNameContainer
                                        }
                                    >
                                        <Avatar src={user.photo} size={64} />
                                        <p className={styles.userName}>
                                            {user.name}
                                        </p>
                                    </div>
                                    <div className={styles.userInfoContainer}>
                                        {[
                                            {
                                                icon: <FaUserAlt />,
                                                label: "E-mail",
                                                content: user.email ?? noValue,
                                            },
                                            {
                                                icon: <FaGithub />,
                                                label: "Github",
                                                content: user.github ?? noValue,
                                            },
                                            {
                                                icon: <FaCalendarAlt />,
                                                label: "Nascimento",
                                                content: user.birthday
                                                    ? dayjs(
                                                          user.birthday
                                                      ).format("DD/MM/YYYY")
                                                    : noValue,
                                            },
                                            {
                                                icon: <FaPhone />,
                                                label: "Telefone",
                                                content: user.telephone
                                                    ? formatPhoneNumber(
                                                          user.telephone
                                                      )
                                                    : noValue,
                                            },
                                            {
                                                icon: <HiAcademicCap />,
                                                label: "Bolsista",
                                                content: user.scholarship
                                                    ? user.scholarship.name
                                                    : noValue,
                                            },
                                            {
                                                icon: <FaLink />,
                                                label: "Lattes",
                                                content: user.lattes ?? noValue,
                                            },
                                        ].map((info, index) => (
                                            <div
                                                className={styles.userInfo}
                                                key={index}
                                            >
                                                {info.icon}
                                                <p>{info.label}: </p>
                                                <Tooltip title={info.content}>
                                                    <span
                                                        className={
                                                            styles.truncatedText
                                                        }
                                                    >
                                                        {info.content}
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <></>
                    )}
                </Row>

                <div className={styles.paginationContainer}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={countUsers}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            </Card>
        </>
    );
}
