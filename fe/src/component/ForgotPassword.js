import React, { useState ,useEffect} from "react";
import "../css/account.css";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";
import { updateUser  } from "../redux/slice";

export default function ForgotPassword(){
    const navigate = useNavigate()
    const [email,setEmail] = useState("")

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios.post(`${API_URL}account/send-mail`,{
                email : email
            })
            navigate(`/account/${email}`)
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <section>
            <h1>Quên mật khẩu</h1>
            <form onSubmit={handleSubmit}>
                <label for="">Nhập email</label>
                <input type="email" name="" value={email}  onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit">Xác nhận</button>
            </form>
        </section>
    )
}