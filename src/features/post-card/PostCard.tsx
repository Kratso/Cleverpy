import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store/store";
import { useAppSelector } from '../../store/hooks';
import { selectUserById, User } from "../login/usersSlice";
import { postDelete } from "../post-feed/postsSlice";

import './PostCard.css';

interface IProps {
    id: number, 
    userId: number, 
    body: string, 
    title: string
}

export const PostCard: React.FC<IProps> = ({id, userId, body, title} ) => {
    const dispatch = useDispatch<AppDispatch>();

    const [isUpdating, toggleIsUpdating] = useState<boolean>(false);

    const user : User = useAppSelector<User>(state => selectUserById(state,userId));
    
    useEffect(()=>{

    }, [id, userId, title, body]);

    const onClickDelete = () => {
        dispatch(postDelete({id}))
    } 

    return (
        <div id={`${id}`} className="card">
            <div className="card-banner">
                <p className="action-buttons"><FaEdit /><FaTrashAlt onClick={onClickDelete} /></p>
            </div>

            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{body}</p>

                <div className="card-profile">
                <div className="card-profile-info">
                    <h3 className="profile-name">{user.name }</h3>
                    <p className="profile-followers">{user.followers} followers</p>
                </div>
                </div>

            </div>
        </div>
    )
}
