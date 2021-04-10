// import "./Footer.css"
import React from "react";
import styled from "styled-components";

function Footer() {
    const Footer = styled.footer`
      background-color: #D62130;
      height: 160px;
      position: relative;
    `

    const FooterImage = styled.img`
      position: relative;
      left: 20px;
      top: 50%;
      transform: translate(0, -50%);
    `

    // const Statistics = styled.div`
    //   position: absolute;
    //   right: 40px;
    //   top: 50%;
    //   transform: translate(0, -50%);
    //   text-align: right;
    // `
    //
    // const Paragraph = styled.div`
    //   padding-bottom: 10px;
    //   font-size: 18px;
    //   font-weight: bold;
    //   color: white;
    // `
    //
    // const ListItem = styled.li`
    //   padding: 3px 0;
    // `
    //
    // const Anchor = styled.a`
    //   font-size: 14px;
    //   color: white;
    //   &:hover {
    //     text-decoration: #303030 underline;
    //   }
    // `

    return (
        <Footer>
            <FooterImage src={process.env.PUBLIC_URL + "/images/logos/footer-logo.png"} alt="footer-logo"/>
            {/*<Statistics>*/}
            {/*    <Paragraph>Справки</Paragraph>*/}
            {/*    <ul>*/}
            {/*        <ListItem><Anchor href="/">Задачи</Anchor></ListItem>*/}
            {/*        <ListItem><Anchor href="/">Проекти</Anchor></ListItem>*/}
            {/*        <ListItem><Anchor href="/">Клиенти</Anchor></ListItem>*/}
            {/*    </ul>*/}
            {/*</Statistics>*/}
        </Footer>
    )
}

export default Footer;