import React, { useEffect } from "react";
// Absolutely overkill. No one needs these libraries for these yee-yee ass looking app. Nevertheless.
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store/store";
import { namespaces } from "../../config/i18n/i18n.constants";
import { login, selectUser, UserState } from "./loginSlice";
import authService from "../../services/login/auth.service";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

import "./Login.css";

export const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation(namespaces.login.login);

  const user: UserState = useAppSelector<UserState>((state) =>
    selectUser(state)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user.status && user.status.status === "OK") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, t("short"))
      .max(50, t("long"))
      .required(t("required")),
    password: Yup.string()
      .min(2, t("short"))
      .max(50, t("long"))
      .required(t("required")),
  });

  const handleLogin = async (formValue: {
    username: string;
    password: string;
  }) => {
    const { username, password } = formValue;
    dispatch(login(await authService.login(username, password)));
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="control">
              <h1>{t("h1")}</h1>
              <h1>{t("h2")}</h1>
            </div>
            <div className="control block-cube block-input">
              <Field
                name="username"
                className="control block-cube block-input"
              />
              <div className="bg-top">
                <div className="bg-inner"></div>
              </div>
              <div className="bg-right">
                <div className="bg-inner"></div>
              </div>
              <div className="bg">
                <div className="bg-inner"></div>
              </div>
            </div>
            {errors.username && touched.username ? (
              <div>{errors.username}</div>
            ) : null}
            <div className="control block-cube block-input">
              <Field
                type="password"
                name="password"
                className="control block-cube block-input"
              />
              <div className="bg-top">
                <div className="bg-inner"></div>
              </div>
              <div className="bg-right">
                <div className="bg-inner"></div>
              </div>
              <div className="bg">
                <div className="bg-inner"></div>
              </div>
            </div>
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button className="btn block-cube block-cube-hover" type="submit">
              <div className="bg-top">
                <div className="bg-inner"></div>
              </div>
              <div className="bg-right">
                <div className="bg-inner"></div>
              </div>
              <div className="bg">
                <div className="bg-inner"></div>
              </div>
              <div className="text">{t("submit")}</div>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
