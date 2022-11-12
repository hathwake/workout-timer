import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";


export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    
    const goToHome = () => {
        navigate("/home");
    };
    
    return <>
        <Result
            status={404}
            title={"Page not found"}
            extra={<>
                <Button type="primary" onClick={goToHome}>Go to Home</Button>
            </>}
        ></Result>
    </>;
};