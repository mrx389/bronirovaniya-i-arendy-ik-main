'use client'

import React, {useEffect, useState} from 'react';
import Layout from "@/components/layout/Layout";
import styles from "@/app/styles/location/Location.module.scss";

const PageApplicationLocation = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/rent')
            if (!response.ok) {
                throw new Error('Unable to fetch posts!')
            }
            const jsonData = await response.json()
            setData(jsonData)
        }

        fetchData()
    }, []);

    return (
        <Layout Header='home'>
            <div className={styles.blockLocation}>
                <h2 className={styles.headerPage}>Бостери</h2>
                <div className={styles.blockLoc}>
                    {data.map((elem: any) => (
                        <div key={elem.id}>

                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default PageApplicationLocation;