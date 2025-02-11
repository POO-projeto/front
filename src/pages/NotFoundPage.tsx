import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
    const navigate = useNavigate();
  
    return (
      <Result
        status="404"
        title="404"
        subTitle="Oops! A página que você está procurando não existe."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>Voltar para a Home</Button>
        }
      />
    );
  };
  