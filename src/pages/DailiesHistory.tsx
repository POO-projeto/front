import { useStoreActions, useStoreState } from "easy-peasy";
import { StoreModel } from "../model/storeModel";
import styles from "./DailiesHistory.module.css";
import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Card, Col, DatePicker, Pagination, Row, Select } from "antd";
import { CardModified } from "../components/CardModified";

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

export function DailiesHistory() {
    const dailies: Daily[] = useStoreState<StoreModel>(
        (state) => state.dailies.dailies
    );
    const users = useStoreState<StoreModel>((state) => state.users.users);
    const loadingUsers = useStoreState<StoreModel>(
        (state) => state.users.loading
    );
    const loadingDailies = useStoreState<StoreModel>(
        (state) => state.dailies.loading
    );
    const countDailies = useStoreState<StoreModel>(
        (state) => state.dailies.count
    );

    const getDailies = useStoreActions<StoreModel>(
        (actions) => actions.dailies.getDailies
    );
    const getUsers = useStoreActions<StoreModel>(
        (actions) => actions.users.getUsers
    );

    const options = useMemo(() => {
        if (users) {
            const usersToShow = users.map((user: any) => ({
                value: user.id,
                label: <span>{user.name}</span>,
            }));
            return usersToShow;
        }
    }, [users]);

    const [todayDate, setTodayDate] = useState<Dayjs | null>(null);
    const [idUser, setIdUser] = useState<number | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
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
    useEffect(() => {
        getUsers({});
        updatePageSize();
        window.addEventListener("resize", updatePageSize);
        return () => window.removeEventListener("resize", updatePageSize);
    }, []);
    
    useEffect(() => {
        getDailies({
            page: currentPage,
            per_page: pageSize,
            date: todayDate ? todayDate.format("YYYY-MM-DD") : null,
            user_id: idUser ?? null,
        });
    }, [todayDate, idUser, currentPage]);

    return (
        <Card
            title={<span className={styles.customTitle}>Dailies</span>}
            className={styles.card}
            loading={loadingDailies || loadingUsers}
        >
            <div className={styles.filterDailiesContainer}>
                <DatePicker
                    className={styles.filterDailiesDate}
                    format="DD/MM/YYYY"
                    placeholder="Data da daily"
                    value={todayDate}
                    defaultValue={todayDate}
                    onChange={(date) => setTodayDate(date)}
                />
                <Select
                    className={styles.filterDailiesSelect}
                    value={idUser}
                    allowClear
                    showSearch
                    placeholder={"Usuários"}
                    loading={loadingUsers}
                    options={options}
                    onChange={(value) => setIdUser(value || null)}
                />
            </div>

            <Row gutter={[16, 16]}>
                {dailies && users ? (
                    dailies.length > 0 && users.length > 0 ? (
                        dailies.map((daily) => (
                            <Col key={daily.id} xs={24} sm={12} md={8} lg={8}>
                                <CardModified
                                    key={daily.id}
                                    title={
                                        <span style={{ color: "var(--white)" }}>
                                            {daily.user.name}
                                        </span>
                                    }
                                    contents={daily.items.map(
                                        (item) => item.description
                                    )}
                                    issue={daily.issue}
                                    className={styles.cardModified}
                                    ext={
                                        <span style={{ color: "var(--white)" }}>
                                            {dayjs(daily.date).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </span>
                                    }
                                />
                            </Col>
                        ))
                    ) : (
                        <p>Sem dailies :(</p>
                    )
                ) : null}
            </Row>

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
    );
}
