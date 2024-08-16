'use client'

import React, {useEffect, useState} from 'react';
import Nums from "@/components/theCriteria/icons/nums";
import styles from "../styles/location/Location.module.scss";
import {useSearchParams} from "next/navigation";
import Layout from "@/components/layout/Layout";
import TheAddAplication from "@/components/theAddAplication/TheAddAplication";
import classNames from "classnames";

const PageLocations = () => {
    const [active, setActive] = useState(false);
    const [idAplication, setIdAplication] = useState<number>(0);
    const [data, setData] = useState<any[]>([]);
    const [namePage, setNamePage] = useState();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/rent/${id}/`);
                if (!response.ok) {
                    throw new Error('Unable to fetch posts!');
                }
                const jsonData = await response.json();
                setData(jsonData.RentalItems);
                setNamePage(jsonData.address)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChangeActive = (id: number) => {
        setIdAplication(id);
        setActive(!active);
    }

    return (
        <Layout Header='home'>
            <div className={classNames(styles.shadow, {[styles.shadowNot]: !active})} onClick={() => setActive(!active)}></div>
            <div className={classNames(styles.application, {[styles.applicationNot]: !active})}>
                <TheAddAplication onActive={setActive} active={active} idAplication={idAplication}/>
            </div>
            <div className={styles.blockLocation} >
                <h2 className={styles.headerPage}>{namePage}</h2>
                <div className={styles.blockLoc}>
                    {data.map((elem: any) => (
                            <div key={elem.id} onClick={() => handleChangeActive(elem.id)}>
                                <img
                                    src={`http://localhost:5000/${elem.image}`}
                                    alt='tower'
                                    className={styles.imgesLocation}
                                />
                                <div className={styles.textLocation}>
                                    <div className={styles.nameLocation}>{elem.title}</div>
                                    <div><Nums/></div>
                                    <div className={styles.infoDay}>
                                        <div className={styles.prise}>{elem.price} сом</div>
                                        <div className={styles.day}>{elem.day} дней</div>
                                    </div>
                                    <div className={styles.desk}>{elem.description}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Layout>
    );
};

export default PageLocations;
