import React from "react";
import Layout from "../../components/Layout/Layout";
import Profileform from "../../components/Form/TeacherProfileform";
import Tabs from "../../components/common/Tabs/Tabs";

const Personal = () => {
  return (
    <>
      <Layout heading="Profile">
       <Tabs />
        <Profileform />
      </Layout>
    </>
  );
};

export default Personal;
