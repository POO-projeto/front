import { Dispatch, SetStateAction } from "react";
import { Input, Modal } from "antd";
import { useStoreActions } from "easy-peasy";
import { StoreModel } from "../model/storeModel";
import dayjs, { Dayjs } from "dayjs";


interface FormDataEdit {
    id: number;
    date: string;
    items: Item[];
    issue: string;
}

interface Item {
    id: number;
    description: string;
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

interface Props {
    page: number;
    per_page: number;
    userId: number;
    currentDate: Dayjs | null;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    editFormDataOg: FormDataEdit;
    editFormData: FormDataEdit;
    setEditFormData: Dispatch<SetStateAction<FormDataEdit>>;
    styles: Record<string, string>;
    userDailies: any
}

export function EditDailyModal({
    page,
    per_page,
    userId,
    currentDate,
    visible,
    setVisible,
    editFormDataOg,
    editFormData,
    setEditFormData,
    styles,
    userDailies
}: Props) {
    const putDaily = useStoreActions<StoreModel>(
        (action) => action.dailies.putDaily
    );

    const getDailies = useStoreActions<StoreModel>(
        (action) => action.dailies.getDailies
    );

    function handleChangeItemDescription(index: number, value: string) {
        setEditFormData((prev) => {
            const updatedItems = [...prev.items];
            updatedItems[index] = {
                ...updatedItems[index],
                description: value,
            };
            return { ...prev, items: updatedItems };
        });
    }

    function handleChangeIssue(value: string) {
        setEditFormData((prev) => ({
            ...prev,
            issue: value,
        }));
    }

    async function handleOk() {
        await putDaily({
            id: editFormData.id,
            items: editFormData.items,
            issue: editFormData.issue,
        });
        setEditFormData(editFormDataOg);
        setVisible(false);
        await getDailies({
            user_id: userId,
            date: currentDate ? currentDate.format("YYYY-MM-DD") : null,
            page: page,
            per_page: per_page,
        });
    }

    function onModalCancel() {
        setEditFormData(editFormDataOg);
        setVisible(false);
    }

    function isFormDataInvalid(data: FormDataEdit) {
        return Object.entries(data).some(([key, value]) => {
            if (key === "items" && Array.isArray(value)) {
                return value.some((item) => item.description === "");
            }
            if (key === "date" && value) {
                const selectedDate = dayjs(value);

                const dateExists = userDailies.some((daily: Daily) =>
                    dayjs(daily.date).isSame(selectedDate) && daily.id !== editFormData.id
                );

                if (dateExists) {
                    return true;
                }
            }

            return value === null || value === "" || value.length <= 0;
        });
    }

    return (
        <Modal
            title="Editar daily"
            open={visible}
            okButtonProps={{
                disabled: isFormDataInvalid(editFormData),
            }}
            onOk={handleOk}
            onCancel={onModalCancel}
            cancelText="Cancelar"
            okText="Salvar"
        >
            <p>O que você fez?</p>
            {editFormData.items.map((item, index) => (
                <div key={item.id} className={styles.tasksItemsContainer}>
                    <Input
                        value={item.description}
                        onChange={(e) =>
                            handleChangeItemDescription(index, e.target.value)
                        }
                    />
                </div>
            ))}
            <p>Problemas?</p>
            <Input.TextArea
                value={editFormData.issue}
                onChange={(e) => handleChangeIssue(e.target.value)}
            />
        </Modal>
    );
}
