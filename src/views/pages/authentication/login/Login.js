import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Mail, Lock, Check, Facebook, Twitter, GitHub } from "react-feather";
import { history } from "../../../../history";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import googleSvg from "../../../../assets/img/svg/google.svg";

import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { checkLogin, user, checkPhone } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    let phonePetern = /^(01[3456789])(\d{8})$/;
    if (phone.match(phonePetern)) {
      setError(null);
      checkPhone(phone);
    } else {
      setError("insert your correct number");
    }
  };
  const handleConfirm = () => {
    checkLogin(phone);
    // window.location.href = '/admin-home';
  };
  useEffect(() => {
    if (user.auth) {
      window.location.href = "/";
    }
    console.log("user", user);
  });
  return (
    <div>
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card
                  className="rounded-0 mb-0 px-2"
                  style={{ background: "#27B3B9" }}
                >
                  <CardBody>
                    <h2>Login  </h2>
                    <p
                      style={{
                        color: "#016b61",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Your opt is: {user.checkPhone ? user.checkPhone.otp : "Welcome back, please login to your account."}

                    </p>
                    {/* <Form onSubmit={(e) => e.preventDefault()}>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="text"
                          placeholder="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <div className="form-control-position">
                          <Mail size={15} />
                        </div>
                        <Label>Phone</Label>
                      </FormGroup>
                      <div className="d-flex justify-content-between">
                        <Button.Ripple color="danger">Register</Button.Ripple>
                        <Button.Ripple
                          color="warning"
                          type="submit"
                          onClick={handleLogin}
                        >
                          Login
                        </Button.Ripple>
                      </div>
                    </Form> */}
                    <form>
                      {user.checkPhone ? (
                        <div>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="text"
                              placeholder="OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                            <div className="form-control-position">
                              <Mail size={15} />
                            </div>
                            <Label>Phone</Label>
                          </FormGroup>
                          {
                          otp == user.checkPhone.otp ? <Button.Ripple
                          color="warning"
                          type="submit"
                          onClick={handleConfirm}
                        >
                          CONFIRM
                        </Button.Ripple> : null
                           }
                        </div>
                      ) : (
                        <div>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="text"
                              required
                              name="phone"
                              placeholder="Phone Number eg: 01XXXXXXXXX"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <div className="form-control-position">
                              <Mail size={15} />
                            </div>
                            <Label>Phone</Label>
                            {error ? (
                              <div class="alert alert-danger" role="alert">
                                {error}
                              </div>
                            ) : null}
                          </FormGroup>

                          <Button.Ripple
                            color="warning"
                            type="submit"
                            onClick={handleLogin}
                          >
                            LOGIN
                          </Button.Ripple>
                        </div>
                      )}
                    </form>
                  </CardBody>
                  <div className="auth-footer">
                    <div className="divider">
                      <div className="divider-text">EnCash</div>
                    </div>
                    <div className="footer-btn">
                      <p>COPYRIGHT © 2021 AMBIT SYSTEMS LTD.</p>
                      {/* <Button.Ripple className="btn-facebook" color="">
                        <Facebook size={14} />
                      </Button.Ripple>
                      <Button.Ripple className="btn-twitter" color="">
                        <Twitter size={14} stroke="white" />
                      </Button.Ripple>
                      <Button.Ripple className="btn-google" color="">
                        <img
                          src={googleSvg}
                          alt="google"
                          height="15"
                          width="15"
                        />
                      </Button.Ripple>
                      <Button.Ripple className="btn-github" color="">
                        <GitHub size={14} stroke="white" />
                      </Button.Ripple> */}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
