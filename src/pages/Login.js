import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://backend-pettycash-manager-capstone-24zoffjz1-gkavin57.vercel.app/users/login",
        values
      );
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="resgister-page ">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="loogin">
            <Link to="/register">Not a User ? Click Here to Regsiter</Link>
            <button className="btn btn-primary mt-3">Login</button>
          </div>
          <div className="testing">
            <h6>testing credentials </h6>
            <span className="test-left">email : test@gmail.com</span>
            <span className="test-left">password : kavin123</span>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
