import React from "react";
import "./RecentNews.css";

const RecentNews = () => {
  const newsItems = [
    {
      title: "New Health Policy for Women Announced",
      date: "Sept 28, 2025",
      description:
        "The government has introduced a new women-focused health policy to improve wellness services nationwide.",
    },
    {
      title: "Yoga and Wellness Camps in Chennai",
      date: "Sept 25, 2025",
      description:
        "Free yoga and mental wellness camps are being organized for women in various community centers.",
    },
    {
      title: "Breast Cancer Awareness Month",
      date: "Sept 20, 2025",
      description:
        "Hospitals across India are offering free screenings and awareness sessions for women.",
    },
  ];

  return (
    <div className="RecentNews">
      <h3 className="RecentNewsTitle">Recent News</h3>
      <div className="NewsList">
        {newsItems.map((item, index) => (
          <div key={index} className="NewsCard">
            <h4 className="NewsCardTitle">{item.title}</h4>
            <p className="NewsCardDate">{item.date}</p>
            <p className="NewsCardDesc">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNews;
