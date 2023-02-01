import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

type AuthCompType = {
    children: React.ReactNode
}

const AuthComp = ({children}: AuthCompType) =>{
const isLoggedIn = useAppSelector((state) => state.auth.authInfo.isLoggedIn)

return (
    <>
   {isLoggedIn ? children : < Navigate replace to = '/signin'/>}
    </>
)

}

export default AuthComp