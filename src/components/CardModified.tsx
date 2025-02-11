import { Card, Divider } from "antd";
import { ReactNode } from "react";

interface CardMProps {
    title: string | ReactNode;
    className: string;
    contents: string[];
    issue: string;
    ext?: string | ReactNode;
}

export function CardModified(props: CardMProps) {
    const { title, className, contents, issue, ext } = props;

    return (
        <Card title={title} extra={ext ? ext : ""} className={className}>
            <p>O que foi feito:</p>
            {contents.map((content) => {
                return <p key={content}>{content}</p>;
            })}
            <Divider />
            <p>Problemas:</p>
            <p>{issue}</p>
        </Card>
    );
}
