import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import Api from '../services/Api'
import dislike from '../assets/dislike.svg';
import './Main.css';

export default function Main({match}){
    const [users,setUsers] = useState([]); 

    useEffect(() => {
        async function loadUsers(){
            const response = await Api.get('/devs', {
                headers:{
                    user:match.params.id
                }
            });
            setUsers(response.data)            
        }
        loadUsers();
    },
     [match.params.id]);

    async function handleDislike(id){
        await Api.post(`/devs/${id}/dislike`, null, {
            headers:{
                user:match.params.id
            }
        });
        setUsers(users.filter(user => user._id !== id));
    }
    async function handleLike(id){
        await Api.post(`/devs/${id}/like`, null, {
            headers:{
                user:match.params.id
            }
        });
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleLikes(){
        const response = await Api.get('/like', {
            headers:{
                user:match.params.id
            }
        });
            setUsers(response.data)           
        }
    async function handleDevs(){
        const response = await Api.get('/devs', {
            headers:{
                user:match.params.id
            }
        });
            setUsers(response.data)           
        }

    return(
        <div className="main-container">
            <Link to="/" >
                <img src ={logo} alt="Tindev"/>
            </Link>
            <div class="tab">
                <button class="buttons"onClick={() => {handleDevs()}}>Procurar Devs</button>
                <button class="buttons" onClick={() => {handleLikes()}}>Curtidas</button>
            </div>
            {users.length > 0 ? 
                <ul>
                    {
                        users.map(user => (
                        <li key = {user._id} >
                            <img src={user.avatar} alt="Avatar"/>
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className= "buttons">
                                <button type="button" onClick={() => {handleDislike(user._id)}}>
                                    <img src = {dislike} alt="Dislike"/>
                                </button> 
                                <button type="button" onClick={() => {handleLike(user._id)}}>
                                    <img src = {like} alt="Like"/>
                                </button>
                            </div>
                        </li>
                        ))
                    } 
                </ul>
                :<div className= "empty"> Ops... Não há Devs </div>
                }
        </div>    
    );
}

