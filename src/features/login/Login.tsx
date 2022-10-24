import React, { useState, useEffect } from "react";
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

  const handleLogin = async (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;
    dispatch(login(await authService.login(username, password)));
  };

  return (
    <div>
      <h1>{t("h1")}</h1>
      <h2>{t("h2")}</h2>
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
          <Form>
            <Field name="username" />
            {errors.username && touched.username ? (
              <div>{errors.username}</div>
            ) : null}
            <Field type="password" name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">{t("submit")}</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
