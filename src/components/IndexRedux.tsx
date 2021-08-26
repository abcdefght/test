import React from "react";
import {connect} from "react-redux";
import {rootStateType, setLoginAction} from "@/store";

interface IndexReduxProps {
    login?: boolean,
    setLogin?: (flag: boolean) => void
}

const IndexRedux: React.FC<IndexReduxProps> = (props) => {
    const {login, setLogin} = props;

    return (
        <div>
            {
                login ?
                    <div>用户已登录，<button onClick={()=>setLogin(false)}>退出登录</button></div> :
                    <div>用户未登录，<button onClick={()=>setLogin(false)}>登录</button></div>
            }
        </div>
    )
}

const mapStateToProps = (state:rootStateType): IndexReduxProps => {
    return {
        login:state.loginReducer.login
    }
}

const mapDispatchToProps = (dispatch): IndexReduxProps => {
    return {
        setLogin: flag => dispatch(setLoginAction(flag))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexRedux);
