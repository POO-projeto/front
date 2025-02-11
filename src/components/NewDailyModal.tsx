import { Dispatch, SetStateAction, useState } from "react";
import { Button, DatePicker, Input, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { useStoreActions } from "easy-peasy";
import { StoreModel } from "../model/storeModel";

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

interface FormData {
    items: string[];
    date: string;
    issue: string;
}

interface Props {
    page: number;
    per_page: number;
    userId: number;
    userDailies: Daily[];
    currentDate: Dayjs | null;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    formDataOg: FormData;
    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;
    styles: Record<string, string>;
}

export function NewDailyModal({
    page,
    per_page,
    userId,
    userDailies,
    currentDate,
    visible,
    setVisible,
    formDataOg,
    formData,
    setFormData,
    styles,
}: Props) {
    const [currentTaskInputValue, setCurrentTaskInputValue] = useState("");

    const getDailies = useStoreActions<StoreModel>(
        (state) => state.dailies.getDailies
    );

    const createDaily = useStoreActions<StoreModel>(
        (action) => action.dailies.createDaily
    );

    function isFormDataInvalid(data: FormData) {
        return Object.entries(data).some(([key, value]) => {
            if (key === "items" && Array.isArray(value)) {
                return value.some((item) => item === "") || value.length <= 0;
            }

            if (key === "date" && value) {
                const selectedDate = dayjs(value);

                const dateExists = userDailies.some((daily) =>
                    dayjs(daily.date).isSame(selectedDate)
                );

                const isNextDay = selectedDate.isAfter(dayjs());

                return dateExists || isNextDay;
            }

            return value === null || value === "" || value.length <= 0;
        });
    }

    function handleChange(name: string, value: any) {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleOk() {
        await createDaily({
            ...formData,
        });
        await getDailies({
            user_id: userId,
            date: currentDate ? currentDate.format("YYYY-MM-DD") : null,
            page: page,
            per_page: per_page,
        });
        setFormData(formDataOg);
        setVisible(false);
    }

    function onModalCancel() {
        setFormData(formDataOg);
        setVisible(false);
    }

    return (
        <Modal
            title="Criar daily"
            open={visible}
            okButtonProps={{
                disabled: isFormDataInvalid(formData),
            }}
            onOk={handleOk}
            onCancel={onModalCancel}
            cancelText="Cancelar"
            okText={"Criar"}
        >
            <div className={styles.fieldContainer}>
                <label htmlFor="date">Data da daily</label>
                <DatePicker
                    format="DD/MM/YYYY"
                    id="date"
                    placeholder="Selecionar data"
                    defaultValue={currentDate}
                    value={formData.date ? dayjs(formData.date) : null}
                    onChange={(date) => handleChange("date", date)}
                />
            </div>
            <p>O que você fez?</p>
            {formData.items.map(
                (value, index) =>
                    value && (
                        <div key={index} className={styles.tasksItemsContainer}>
                            <p>{value}</p>
                            <DeleteOutlined
                                className={styles.deleteOut}
                                onClick={() => {
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        items: prevData.items.filter(
                                            (_, i) => i !== index
                                        ),
                                    }));
                                }}
                            />
                        </div>
                    )
            )}
            <div className={styles.tasksInputContainer}>
                <Input
                    placeholder="Digite sua atividade"
                    value={currentTaskInputValue}
                    onChange={(e) => setCurrentTaskInputValue(e.target.value)}
                />
                <Button
                    disabled={!currentTaskInputValue}
                    onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            items: [...prevData.items, currentTaskInputValue],
                        }));
                        setCurrentTaskInputValue("");
                    }}
                >
                    Adicionar
                </Button>
            </div>
            <p>Problemas?</p>
            <Input.TextArea
                value={formData.issue}
                onChange={(e) =>
                    setFormData((prevData) => ({
                        ...prevData,
                        issue: e.target.value,
                    }))
                }
            />
        </Modal>
    );
}
