import {
    Button,
    Card,
    Col,
    DatePicker,
    Pagination,
    Row,
} from "antd";
import { CardModified } from "../components/CardModified";
import styles from "./UserDailies.module.css";
import { useEffect, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import { StoreModel } from "../model/storeModel";
import dayjs, { Dayjs } from "dayjs";
import { NewDailyModal } from "../components/NewDailyModal";
import { EditDailyModal } from "../components/EditDailiesModal";

interface FormData {
    items: string[];
    date: string;
    issue: string;
}

interface Item {
    id: number;
    description: string;
    task_id: number;
    daily_id: number;
}

interface User {
    id: number;
    email: string;
    photo: string;
    name: string;
    birthday: string;
    github: string;
    lattes: string;
    telephone: string;
}

interface Daily {
    id: number;
    user: User;
    date: string;
    items: Item[];
    issue: string;
}

interface EditFormData {
    id: number;
    date: string;
    items: {
        id: number;
        description: string;
    }[];
    issue: string;
}

export function UserDailies() {
    const userLogedIn = useStoreState<StoreModel>((state) => state.login.user);
    const userLogedInData = useStoreState<StoreModel>(
        (state) => state.users.selectedUser
    );
    const userDailies = useStoreState<StoreModel>(
        (state) => state.dailies.dailies
    );

    const countDailies = useStoreState<StoreModel>(
        (state) => state.dailies.count
    );

    const fetchUserInfo = useStoreActions<StoreModel>(
        (actions) => actions.login.fetchUserInfo
    );
    const loadingDailies = useStoreState<StoreModel>(
        (state) => state.dailies.loading
    );
    const loadingUsers = useStoreState<StoreModel>(
        (state) => state.users.loading
    );
    const loadingUserInfo = useStoreState<StoreModel>(
        (state) => state.login.loading
    );

    const getUniqueUser = useStoreActions<StoreModel>(
        (state) => state.users.getUniqueUser
    );

    const formDataOg = {
        items: [],
        date: "",
        issue: "",
    };

    const editFormDataOg = {
        id: 0,
        items: [],
        date: "",
        issue: "",
    };
    const [pageSize, setPageSize] = useState(3);

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

    const [todayDate, setTodayDate] = useState<Dayjs | null>(null);
    const [formData, setFormData] = useState<FormData>(formDataOg);
    const [editFormData, setEditFormData] =
        useState<EditFormData>(editFormDataOg);
    const [newDailyModalVisible, setNewDailyModalVisible] = useState(false);
    const [editDailyModalVisible, setEditDailyModalVisible] = useState(false);

    const getDailies = useStoreActions<StoreModel>(
        (actions) => actions.dailies.getDailies
    );
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchUserInfo();
        if (userLogedIn) {
            getDailies({
                user_id: userLogedIn.id,
                page: currentPage,
                per_page: pageSize,
            });
        }
        updatePageSize();
        window.addEventListener("resize", updatePageSize);
        return () => window.removeEventListener("resize", updatePageSize);
    }, []);

    useEffect(() => {
        if (userLogedIn) {
            getUniqueUser({ id: userLogedIn.id });
            getDailies({
                page: currentPage,
                user_id: userLogedIn.id,
                per_page: pageSize,
                date: todayDate ? todayDate.format("YYYY-MM-DD") : null,
            });
        }
    }, [userLogedIn, todayDate, currentPage]);

    return userLogedInData ? (
        <Card
            title={
                <span className={styles.customTitle}>
                    {userLogedInData.name + " - Dailies"}
                </span>
            }
            className={styles.card}
            loading={loadingDailies || loadingUserInfo || loadingUsers}
        >
            <div className={styles.newDailyAndDailyDateContainer}>
                <Button
                    className={styles.newDailyButton}
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setNewDailyModalVisible(true);
                    }}
                >
                    Nova daily
                </Button>
                <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Data da daily"
                    value={todayDate}
                    defaultValue={todayDate}
                    onChange={(date) => {
                        setTodayDate(date);
                    }}
                />
            </div>

            <Row gutter={[16, 16]}>
                {userDailies ? (
                    userDailies.map((daily: Daily) => (
                        <Col
                            key={daily.id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                            className={styles.cardButtonContainer}
                        >
                            <CardModified
                                className={styles.cardModified}
                                title={
                                    <span style={{ color: "var(--white)" }}>
                                        {userLogedInData.name}
                                    </span>
                                }
                                contents={daily.items.map(
                                    (value) => value.description
                                )}
                                issue={daily.issue}
                                ext={
                                    <span
                                        style={{
                                            color: "var(--white)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        {dayjs(daily.date).format("DD/MM/YYYY")}
                                        <EditOutlined
                                            style={{ color: "var(--white)" }}
                                            onClick={() => {
                                                setEditFormData({
                                                    id: daily.id,
                                                    date: daily.date,
                                                    issue: daily.issue,
                                                    items: daily.items.map(
                                                        (item) => ({
                                                            id: item.id,
                                                            description:
                                                                item.description,
                                                        })
                                                    ),
                                                });
                                                setEditDailyModalVisible(true);
                                            }}
                                        />
                                    </span>
                                }
                            />
                        </Col>
                    ))
                ) : (
                    <></>
                )}
            </Row>

            <NewDailyModal
                page={currentPage}
                per_page={pageSize}
                userId={userLogedIn.id}
                userDailies={userDailies}
                currentDate={todayDate}
                visible={newDailyModalVisible}
                setVisible={setNewDailyModalVisible}
                formDataOg={formDataOg}
                formData={formData}
                setFormData={setFormData}
                styles={styles}
            />
            <EditDailyModal
                page={currentPage}
                per_page={pageSize}
                userId={userLogedIn.id}
                currentDate={todayDate}
                visible={editDailyModalVisible}
                setVisible={setEditDailyModalVisible}
                editFormDataOg={editFormDataOg}
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                styles={styles}
                userDailies={userDailies}
            />

            <div className={styles.paginationContainer}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={countDailies}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                />
            </div>
        </Card>
    ) : (
        ""
    );
}
