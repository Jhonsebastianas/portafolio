import React from "react";
import BlogLayout from "@modules/blog/layouts/blog.layout";
import AppsHub from "@modules/apps/components/AppsHub/AppsHub";

const AppsPage = () => {
  return (
    <BlogLayout>
      <div className="section" style={{ paddingTop: "1.5rem" }}>
        <AppsHub />
      </div>
    </BlogLayout>
  );
};

export default AppsPage;
