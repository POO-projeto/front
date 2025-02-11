import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

type NewUserProps = {
    formData: {
        userName: string;
        birthDate: string;
        telephone: string;
        scholarship: number;
        github: string;
        lattes: string;
    };
    onChange: (name: string, value: string | null | dayjs.Dayjs | number) => void;
    fieldContainer: string;
    select: string;
};

export function NewUserComponent(props: NewUserProps) {
    const { formData, onChange, fieldContainer, select } = props;

    const formatPhoneNumber = (phone: string) => {
        if (phone) {
            const cleaned = phone.replace(/\D/g, "");
            const match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
            
            if (match) {
                return `+${match[1]} ${match[2]} ${match[3]}-${match[4]}`;
            }
            return cleaned;
        }
        return ""
    };

    const [displayTelephone, setDisplayTelephone] = useState(formatPhoneNumber(formData.telephone));

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, "").slice(0, 13);
        formData.telephone = rawValue;
        setDisplayTelephone(formatPhoneNumber(rawValue));
        onChange("telephone", formData.telephone);
    };

    return (
        <>
            <div className={fieldContainer}>
                <label htmlFor="userName">Nome completo</label>
                <Input
                    id="userName"
                    value={formData.userName}
                    onChange={(e) => onChange("userName", e.target.value)}
                />
            </div>

            <div className={fieldContainer}>
                <label htmlFor="birthDate">Data de nascimento</label>
                <DatePicker
                    format="DD/MM/YYYY"
                    id="birthDate"
                    placeholder="Selecionar data"
                    value={
                        formData.birthDate ?
                        dayjs(formData.birthDate) : null
                    }
                    onChange={(date) => onChange("birthDate", date ? date.format("YYYY-MM-DD") : "")}
                    allowClear={false}
                />
            </div>

            <div className={fieldContainer}>
                <label htmlFor="telephone">Telefone</label>
                <Input
                    type="phone"
                    id="telephone"
                    value={displayTelephone}
                    defaultValue={formatPhoneNumber(formData.telephone)}
                    onChange={handlePhoneChange}
                />
            </div>

            <div className={fieldContainer}>
                <label htmlFor="scholarship">Tipo de bolsa</label>
                <Select
                    className={select}
                    id="scholarship"
                    value={formData.scholarship}
                    onChange={(value) => onChange("scholarship", value)}
                    options={[
                        { value: 2, label: "Remunerado" },
                        { value: 1, label: "Voluntário" },
                    ]}
                />
            </div>

            <div className={fieldContainer}>
                <label htmlFor="github">Github</label>
                <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) => onChange("github", e.target.value)}
                />
            </div>
 
            <div className={fieldContainer}>
                <label htmlFor="lattes">Lattes</label>
                <Input
                    id="lattes"
                    value={formData.lattes}
                    onChange={(e) => onChange("lattes", e.target.value)}
                />
            </div>
        </>
    );
}
