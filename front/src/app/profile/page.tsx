"use client"

import styles from '../styles/profile/Profile.module.scss'
import Layout from "@/components/layout/Layout";
import {useSession} from "next-auth/react";
import ApProfile from "@/components/apProfile/ApProfile";

const Profile = () => {
    const session = useSession();


    return (
        <Layout Header='home'>
      <div className={styles.wrapperProfile}>
          {session?.data?.user?.image &&
              <img className={styles.imgProfile} src={session.data?.user.image} alt="image"/>
          }
          <h1 className={styles.nameProfile}>{session?.data?.user?.name}</h1>
      </div>
            <ApProfile/>
        </Layout>
  )
}

export default Profile
