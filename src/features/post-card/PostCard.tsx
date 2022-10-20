import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { Post } from "../../store/postsSlice";
import { selectUserById, User } from "../../store/usersSlice";

import './PostCard.css';

interface IProps {
    id: number, 
    userId: number, 
    body: string, 
    title: string
}

export const PostCard: React.FC<IProps> = ({id, userId, body, title} ) => {
    const [isUpdating, toggleIsUpdating] = useState<boolean>(false);

    const user : User = useAppSelector<User>(state => selectUserById(state,userId));
    
    useEffect(()=>{

    }, [id, userId, title, body]);

    return (
        <div id={`${id}`} className="card">
            <div className="card-banner">
                <p className="category-tag popular"><FaEdit /></p>
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
