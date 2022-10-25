import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";

import { AppDispatch } from "../../store/store";
import { useAppSelector } from "../../store/hooks";
import { selectUserById, User } from "../login/usersSlice";
import { postDelete, postUpdate } from "../post-feed/postsSlice";
import { namespaces } from "../../config/i18n/i18n.constants";

import "./PostCard.css";

interface IProps {
  id: number;
  userId: number;
  body: string;
  title: string;
}

export const PostCard: React.FC<IProps> = ({ id, userId, body, title }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation(namespaces.card.card);

  const [isUpdating, toggleIsUpdating] = useState<boolean>(false);

  const user: User = useAppSelector<User>((state) =>
    selectUserById(state, userId)
  );
  useEffect(() => {
    toggleIsUpdating(false);
  }, [id]);

  const onClickDelete = () => {
    dispatch(postDelete({ id }));
  };
  const onClickUpdate = () => {
    if (!isUpdating) toggleIsUpdating(true);
  };

  const submitForm = ({ title, body }: { title: string; body: string }) => {
    dispatch(
      postUpdate({
        id,
        title,
        body,
      })
    );
    toggleIsUpdating(false);
  };

  return (
    <div id={`${id}`} className="card">
      <div className="card-banner">
        <p className="action-buttons">
          <FaEdit onClick={onClickUpdate} />
          <FaTrashAlt onClick={onClickDelete} />
        </p>
      </div>

      <div className="card-body">
        {isUpdating ? (
          <Formik
            initialValues={{
              title,
              body,
            }}
            onSubmit={submitForm}
          >
            {() => (
              <Form>
                <div className="webflow-style-input">
                  <Field
                    name="title"
                    className="input"
                    type="text"
                    placeholder=" "
                  />
                </div>
                <div className="webflow-style-input">
                  <Field name="body" as="textarea" />
                </div>
                <div className="webflow-style-input">
                  <button type="submit">{t("submit")}</button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div>
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{body}</p>
          </div>
        )}

        <div className="card-profile">
          <div className="card-profile-info">
            <h3 className="profile-name">{user.name}</h3>
            <p className="profile-followers">{user.followers} followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
