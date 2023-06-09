import styled from 'styled-components';

export const p_navbar = styled.nav`
    position: fixed;
    z-index: 50;
    z-index: var(--nav-index);
    width: 100%;
    height: 60px;
    height: var(--navbar-height);
    border-bottom: 1px solid transparent;
    background-color: #fff;
    background-color: var(--white);
    left: 0;
    transition: background-color .2s ease;
`;

export const p_navbar__inner_container = styled.div` 
    width: 100%;
    height: 100%;
    display: flex;

    @media only screen and (max-width: 639px){
        flex-direction:column
    }
`;

export const p_navbar__logo_container = styled.div`
    display: flex;
    align-items: center;
    margin-right: 24px;
    min-height: 60px;
    min-height: var(--navbar-height);


`;

export const p_navbar__logo_icon = styled.a`
    display: flex;
`;

export const p_navbar__content = styled.div`
    display: flex;
    flex: 1;
    max-height: 100%;
    justify-content: space-between;
    @media screen and (max-width: 639px) {
        width:calc(100% + 48px);
        margin: 0 -24px;
        flex-direction: column;
        overflow-y: hidden;
    }
`;

export const p_navbar__item = styled.li`
    padding: 12px 10px;
    font-size: 20px;
    line-height: 80px;
    color: currentColor;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    background-color: transparent;
    text-decoration: none;
    text-align: left;
    :focus {
        outline: 0;
    }
`;

export const p_container = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    max-width: 1140px;

`;

export const p_container__inner = styled.div`
    height: 100%;
    margin:  auto;
    display: flex;
`;

export const p_icon = styled.span`
    display: inline-block;
    font-size: 20px;
    line-height: 0;

`;

export const p_navbar__menu = styled.ul`
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;

    @media screen and (max-width: 639px) {
        flex-direction:column;
    }
`;

export const p_navbar_hover = styled.a`
    :hover{
        color:inherit;
    }
`;