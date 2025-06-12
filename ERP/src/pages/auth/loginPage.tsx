import { Form, Card, Input, Spacer,Alert,Button, ButtonGroup,Spinner, Snippet } from "@nextui-org/react";
import { useAuth } from "../../contexts/AuthContext";
import { isValidElement, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React  from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from '../assets/Icons';
    const LoginPage = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        const [isloading, setLoading] = useState(false);
        const [isVisible, setIsVisible] = useState(false);
        const { login } = useAuth();
        const navigate = useNavigate();
        const location = useLocation();

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setError("");
            setLoading(true);

            try {
                await login({ email, password });
                navigate(from, { replace: true });
            } catch (err) {
                setError("Invalid email or password");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const from = location.state?.from?.pathname || "/";

        return (
            <div className="flex justify-center items-center h-screen">
            <Card  className="w-full max-w-md p-6 shadow-xl rounded-2xl bg-white" >
            <h2 className="text-center mb-2">后台管理系统</h2>
            <h3  className="text-sm neutral text-center mb-6">管理员/员工登录</h3>
            {error && 
            <Alert description={error}  title={"错误"} ></Alert>
            } 
            <Form onSubmit={handleSubmit}>
            <Input
            isClearable
            variant="bordered"
            size="lg"
            fullWidth
            label="邮箱"
            placeholder="请输入邮箱"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            />
            <Spacer y={1.5}/>
            <Input
            label="密码"
            placeholder="请输入密码"
            size="lg"
            variant="bordered"
            fullWidth
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            type={isVisible? "text":"password"}
            endContent={
                <Button
                type="button"
                onClick={()=>setIsVisible(!isVisible)}
                className="focus:outline-none text-default-500"
                >
                    { isVisible ?(
                        <EyeSlashFilledIcon className="text-2xl"/>
                    ) : (
                        <EyeFilledIcon className="text-2xl"/>
                    )
                    }
                </Button>
            }
            />
            <Spacer y={2}/>

            <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-bold"
            disabled={isloading}
            >
            {isloading ? (
                <Spinner size="md">登录中...</Spinner>
            ):(<Spinner size="md">登录</Spinner>)}

            </Button>
            </Form>
            <Snippet color="primary" className="mt-4  text-center">
            测试账号: admin@example.com / staff@example.com<br />
            密码: 任意非空密码
            </Snippet>

            </Card>
            
            
            </div>  
        );
    };

export default LoginPage;
