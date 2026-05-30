//packages & components
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
//assets
import logo from "../assets/logo.svg"

const HeaderWapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 100px;
  width: 100%;
  height: 70px;
  background: #000000;
`;
const LogoWapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  cursor: pointer;
`;
const Logo = styled.img`
  margin-left: 1px;
  margin-bottom: 3px;
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 2;
`;
const LogoText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 28px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  z-index: 1;
`;
const NavWapper = styled.div`
  display: flex;
  gap: 70px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const NavText = styled.span`
    font-size: 28px;
    font-weight: 700;
    color: white;
    cursor: pointer;
`;

export default function Header({name}){
    const navigate = useNavigate();
    const navItems = [
        {label: "백과사전", path: "/info", key: "info"},
        {label: "파츠 시뮬레이터", path: "/sim", key: "sim"},
        {label: "선호도", path: "/prefer", key: "prefer"},
        {label: "패치노트", path: "/patch", key: "patch"},
    ]
    return(
        <>
            <HeaderWapper>
                <LogoWapper onClick={() => navigate("/")}>
                    <Logo src={logo} />
                    <LogoText>PUBG.GG</LogoText>
                </LogoWapper>
                <NavWapper>
                    {navItems.map((item) => (
                        <NavText
                            key={item.key}
                            onClick={() => navigate(item.path)}
                            style={name === item.key ? {color: "#FFFF00"} : {}}
                        >
                            {item.label}
                        </NavText>
                    ))}
                </NavWapper>
            </HeaderWapper>
        </>
    )
}