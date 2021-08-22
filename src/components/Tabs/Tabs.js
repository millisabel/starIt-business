import React from 'react';
import TabsResponsive from 'react-responsive-tabs';

import Cabinet from "../Cabinet/Cabinet";
import Profile from "../Profile/Profile";
import Objects from "../Objects/Objects";
import Feedbacks from "../Feedbacks/Feedbacks";

import tabs from "./Tabs.module.css";
import 'react-responsive-tabs/styles.css';

const Tabs = ({isAuth, setAuth}) => {

    const items = [
        {
            label: 'Personal cabinet (default)',
            component: <Cabinet/>
        },
        {
            label: 'Profile',
            component: <Profile/>
        },
        {
            label: 'My Objects',
            component: <Objects/>
        },
        {
            label: 'My Feedbacks',
            component: <Feedbacks/>
        }
    ];

    function getTabs() {
        return items.map((item, index) => ({
            title: item.label,
            getContent: () => item.component,
            key: index,
            tabClassName: tabs.link,
            panelClassName: tabs.body,
        }));
    }

    const out = () => {
        setAuth(false);
        if(sessionStorage.getItem("isAuth")){
            sessionStorage.removeItem("isAuth")
        }
    };

    return (
        <>
            <TabsResponsive items={getTabs()}
                            transform={false}
                            transformWidth={600}
                            tabsWrapperClass={tabs.list}
                            panelClassName={tabs.body}
            />
            <button className={tabs.btnOut} onClick={out}/>
        </>

    );
};

export default Tabs;