import React, { useEffect, useState } from "react";

import { API } from "../../config";
import Footer from "../../components/Footer";
import Form from "./Form";
import Nav from "../../components/Nav";
// import Trip from "./Trip";
import TripList from "./TripList";
// import styled from "styled-components";
// import { withRouter } from "react-router-dom";

const Trips = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${API}/user/tripstate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUpcoming(res.data[0].up_coming);
        setPast(res.data[0].past_booking);
      })
      .catch((err) => alert(err));
  }, []);

  const tab = {
    upcoming: (
      <div>
        {upcoming.length === 0 ? (
          "다시 여행을 떠나실 준비가 되면 에어비앤비가 도와드리겠습니다."
        ) : (
          <TripList list={upcoming} activeTab={activeTab} />
        )}
      </div>
    ),
    past: (
      <div>
        {past.length === 0 ? (
          "과거 여행이 없습니다. 하지만 여행을 완료하면 여기에서 확인하실 수 있습니다."
        ) : (
          <TripList list={past} activeTab={activeTab} />
        )}
      </div>
    ),
  };

  return (
    <>
      <Wrap>
        <Nav />
        {/* <Form /> */}
        <TripsWrapper>
          <section>
            <h2>여행</h2>
            <Buttons>
              <button
                style={
                  activeTab === "upcoming"
                    ? {
                      color: "black",
                    }
                    : undefined
                }
                onClick={() => setActiveTab("upcoming")}
              >
                예정된 예약
              </button>
              <button
                style={
                  activeTab === "past"
                    ? {
                      color: "black",
                    }
                    : undefined
                }
                onClick={() => setActiveTab("past")}
              >
                이전 예약
              </button>
            </Buttons>
            <Tab>{tab[activeTab]}</Tab>
            <div>
              <svg
                focusable="false"
                viewBox="0 0 1002 330"
                preserveAspectRatio="xMaxYMid slice"
                class="_y6l2f9"
              >
                <g style={{ isolation: "isolate" }}>
                  <path
                    d="M228.08 187v-8.92a11.54 11.54 0 1 1 23.07 0v.28a4.2 4.2 0 0 1 4.23.82l6.36-1.39v-20.68h-94l.17.15h-94v21l4.17.91a4.23 4.23 0 0 1 4.7-.64v-.3a11.54 11.54 0 0 1 23.08 0v8.89a7.16 7.16 0 0 1 3.45 2.74l5 2h41v-13.8a11.54 11.54 0 0 1 23.08 0v13.78h41l4.81-2a6.83 6.83 0 0 1 3.88-2.84z"
                    fill="#ffd46b"
                  ></path>
                  <path
                    fill="#ffd46b"
                    d="M84.9 91.96h164.23v65.31H84.9z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M111.27 131.96v13.48H99.22v-13.48zM111.28 106.75v13.48H99.23v-13.48zM142 131.96v13.48h-12.05v-13.48zM142.01 106.74v13.48h-12.05v-13.48zM173.04 106.75v13.48h-12.05v-13.48zM234.63 131.8v13.48h-12.05V131.8zM234.63 106.59v13.48h-12.05v-13.48zM203.89 131.8v13.48h-12.05V131.8zM203.9 106.58v13.48h-12.05v-13.48z"
                  ></path>
                  <path
                    d="M189.28 82.42a5.24 5.24 0 0 0-4.82-5.22 8.83 8.83 0 0 1-5.38-1.2 8.33 8.33 0 0 1-3.16-4.76 9.09 9.09 0 0 0-17.52 1.26 7.8 7.8 0 0 1-2.8 3.63 8.79 8.79 0 0 1-5.37 1.23A5.24 5.24 0 0 0 149 87.57h36.09a5.27 5.27 0 0 0 4.19-5.15z"
                    fill="#ffd46b"
                  ></path>
                  <circle
                    cx="167.36"
                    cy="73.82"
                    r="4.61"
                    fill="#ffb436"
                    style={{ mixBlendMode: "multiply" }}
                  ></circle>
                  <path
                    fill="#ffb436"
                    d="M184.08 155.58v-14.52h-34.8v14.52H73.83v3.38h187.91v-3.38h-77.66z"
                    style={{ mixBlendMode: "multiply" }}
                  ></path>
                  <path
                    fill="none"
                    stroke="#fdf4d3"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    d="M186.03 142.21l-19.19-10.41-19.66 10.41"
                  ></path>
                  <path
                    fill="#fdf4d3"
                    d="M149.35 141.06h3.76v14.42h-3.76zM164.72 141.06h3.76v14.42h-3.76zM180.34 141.06h3.76v14.42h-3.76z"
                  ></path>
                  <path
                    fill="none"
                    stroke="#fdf4d3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M122.41 173.88h15.48M125.42 182.99h16.26M118.63 164.47h15.73M128.89 192.11l-13.84-36.47H73.83M213.16 173.88h-15.48M210.15 182.99h-16.26M216.95 164.47h-15.73M206.69 192.11l13.84-36.47h41.21M190.58 191.95l13.84-36.47H131.16L145 191.95"
                  ></path>
                  <path
                    fill="none"
                    stroke="#ffb436"
                    stroke-miterlimit="10"
                    d="M79.63 87.57h174.81"
                    style={{ mixBlendMode: "multiply" }}
                  ></path>
                  <path
                    d="M661.65 83.86C655.76 77.37 656 68 661 63c3.66-3.68 9.58-4.77 15.08-2.94 3.87-8.42 11.79-14.11 20.49-14.55 11.06-.57 21.68 7.43 24.68 19.38C730.53 43 755 32.79 774.71 40.41c18.84 7.27 25.74 30.45 25.64 35.88a8.93 8.93 0 0 1-1.85 5.6 8.17 8.17 0 0 1-5.56 2.36h-44.66M726.17 84.25h-8.51M741.57 84.25h-8.51M710.89 84.25h-8.51"
                    fill="none"
                    stroke="#75b4b4"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    style={{ mixBlendMode: "multiply" }}
                  ></path>
                  <path
                    d="M867.77 256.75l-13-27.28h-71.12v51a4.74 4.74 0 0 0 1.14 3.49 4.84 4.84 0 0 0 3.85 1.51h110.78v-23.93z"
                    fill="#ffd46b"
                  ></path>
                  <circle
                    cx="817.22"
                    cy="285.49"
                    r="11.85"
                    fill="none"
                    stroke="#407f7f"
                    stroke-miterlimit="10"
                    style={{ mixBlendMode: "multiply" }}
                  ></circle>
                  <circle
                    cx="866.66"
                    cy="285.49"
                    r="11.85"
                    fill="none"
                    stroke="#407f7f"
                    stroke-miterlimit="10"
                    style={{ mixBlendMode: "multiply" }}
                  ></circle>
                  <path
                    fill="none"
                    stroke="#ec5d57"
                    stroke-miterlimit="10"
                    d="M775.24 284.46h-34.8M775.24 275.09H759.7M752.34 275.24h-15.55M730.26 275.17h-15.54"
                  ></path>
                  <path
                    fill="#ff8e8f"
                    d="M788.35 207.8h35.12v21.67h-35.12z"
                  ></path>
                  <path
                    fill="#c6e7e0"
                    d="M823.47 213.74h28.19v15.73h-28.19z"
                  ></path>
                  <path
                    d="M894.22 272a5.2 5.2 0 0 0 5.2 5.21v-10.46a5.2 5.2 0 0 0-5.2 5.25zM820.09 257.48h38.1l-8.12-18.95H792.6v18.95h27.49z"
                    fill="#fdf4d3"
                  ></path>
                  <path
                    fill="none"
                    stroke="#75b4b4"
                    stroke-miterlimit="10"
                    d="M834.07 236.03v25.3M811.65 236.03v24.33"
                  ></path>
                  <path
                    d="M0 284.46h602.81M621.83 284.41h22.83M661.38 284.41h22.83M700.16 284.41H723M909.52 285.5H1002"
                    fill="none"
                    stroke="#b0b0b0"
                    stroke-miterlimit="10"
                  ></path>
                  <g fill="none" stroke="#407f7f">
                    <path
                      d="M830.76 132.83l8.88-29.94a6.08 6.08 0 0 1 11-2.11q3.3 6.52 6.61 13h8c9.52 19.16 34.82 72 34.82 72"
                      stroke-miterlimit="10"
                    ></path>
                    <path
                      d="M865.23 113.49s16.33-21.55 26.95-20.23c0 0 10 0 11.28 15.27 0 0 1.32 14.37-7.3 13.49 0 0-4.65-1.11-2.21-6.86 0 0 7.07-10.17 15.26-5.53 0 0 8 2.21 6.19 20.79h38.42"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M182.26 202c4.22-.22 8.7-.2 12.33 2 6 3.66 7.55 11.68 10.18 18.34a42.82 42.82 0 0 0 13.53 18.06h462.62c73.79-4.57 92.35-54.61 92.35-54.61h8a9.7 9.7 0 0 0 3.36-1 11.31 11.31 0 0 0 2.61-2c11.92-12.91 32.34-47.14 32.34-47.14a5 5 0 0 1 1.91-2.2 4.84 4.84 0 0 1 3-.55h15.76s7.79-.37 8.16-8c0 0 .74-3.89-2.41-4.82 0 0-4.82-.92-4.45 7.24 0 0-.37 7.41 8.16 6.67 0 0 7.79.93 15.21-19.65q5.85-11.1 12.23-22.5 8.38-15 16.82-28.87c4.68-6.79 10.25-10.74 13.72-9.39 2.23.87 3.29 3.83 5.19 9.15a52.17 52.17 0 0 1 2.47 9.76h8.78a6 6 0 0 1 3.09 1.24 6 6 0 0 1 1.78 2.43c1 2.46 10.94 24 24.48 53.65l6.79 14.19s16.48 39.61 41.73 69.46M156.69 192.73s1.42 8.32-7.7 9.33M177.47 192.73s-1.32 8.19 7.2 9.18M148 202c-4.25-.22-8.76-.2-12.42 2-6.09 3.66-7.6 11.7-10.25 18.37a43 43 0 0 1-13.63 18.09H0"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                  <g style={{ mixBlendMode: "multiply" }}>
                    <circle
                      cx="680.92"
                      cy="163.63"
                      r="45.89"
                      fill="none"
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                    ></circle>
                    <circle
                      cx="680.92"
                      cy="163.63"
                      r="39.44"
                      fill="none"
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                    ></circle>
                    <path
                      fill="none"
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                      d="M680.92 117.73v91.79"
                    ></path>
                    <path
                      fill="#ffb436"
                      d="M680.92 167.5l-15.9 64.21h31.79l-15.89-64.21z"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <circle
                      cx="680.92"
                      cy="105.42"
                      r="6.23"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></circle>
                    <path
                      fill="none"
                      stroke="#61a0a0"
                      stroke-linejoin="round"
                      d="M676.78 117.97l4.14-6.32 4.13 6.32"
                    ></path>
                    <path
                      fill="none"
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                      d="M648.56 130.95l64.9 64.9"
                    ></path>
                    <circle
                      cx="622.47"
                      cy="163.36"
                      r="6.23"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></circle>
                    <path
                      fill="none"
                      stroke="#61a0a0"
                      stroke-linejoin="round"
                      d="M635.02 167.5l-6.32-4.14 6.32-4.13"
                    ></path>
                    <circle
                      cx="739.36"
                      cy="163.63"
                      r="6.23"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></circle>
                    <path
                      fill="none"
                      stroke="#61a0a0"
                      stroke-linejoin="round"
                      d="M726.81 167.76l6.32-4.13-6.32-4.14"
                    ></path>
                    <circle
                      cx="639.68"
                      cy="122.07"
                      r="6.23"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></circle>
                    <path
                      fill="none"
                      stroke="#61a0a0"
                      stroke-linejoin="round"
                      d="M645.63 133.87l-1.54-7.39 7.39 1.55"
                    ></path>
                    <circle
                      cx="722.15"
                      cy="204.91"
                      r="6.23"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></circle>
                    <path
                      fill="none"
                      stroke="#61a0a0"
                      stroke-linejoin="round"
                      d="M710.35 198.96l7.39 1.55-1.54-7.4"
                    ></path>
                    <path
                      fill="none"
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                      d="M648.37 195.85l64.9-64.9"
                    ></path>
                    <circle
                      cx="639.5"
                      cy="204.73"
                      r="6.23"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></circle>
                    <path
                      fill="none"
                      stroke="#61a0a0"
                      stroke-linejoin="round"
                      d="M651.3 198.77l-7.4 1.55 1.55-7.39"
                    ></path>
                    <circle
                      cx="722.34"
                      cy="122.26"
                      r="6.23"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></circle>
                    <path
                      fill="none"
                      stroke="#61a0a0"
                      stroke-linejoin="round"
                      d="M716.38 134.06l1.55-7.39-7.39 1.54"
                    ></path>
                    <circle
                      cx="680.92"
                      cy="163.36"
                      r="4.13"
                      fill="#ffb436"
                      style={{ mixBlendMode: "multiply" }}
                    ></circle>
                  </g>
                  <g fill="none" style={{ mixBlendMode: "multiply" }}>
                    <circle
                      cx="529.13"
                      cy="172.92"
                      r="14.09"
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                    ></circle>
                    <circle
                      cx="509.77"
                      cy="209.97"
                      r="6.21"
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                    ></circle>
                    <circle
                      cx="529.13"
                      cy="109.63"
                      r="9.92"
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                    ></circle>
                    <circle
                      cx="529.13"
                      cy="88.15"
                      r="4.96"
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                    ></circle>
                    <path
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                      d="M512.9 204.62l11.27-18.51"
                    ></path>
                    <path
                      stroke="#61a0a0"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M496.58 231.43l9.87-16.22M515.05 213.22l14.08 18.21v-44.42"
                    ></path>
                    <circle
                      cx="548.5"
                      cy="209.97"
                      r="6.21"
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                    ></circle>
                    <path
                      stroke="#61a0a0"
                      stroke-miterlimit="10"
                      d="M545.36 204.62l-11.27-18.51"
                    ></path>
                    <path
                      stroke="#61a0a0"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M561.69 231.43l-9.88-16.22M543.22 213.22l-14.09 18.21M543.04 170.69h-27.82M543.04 175.16h-27.8M526.74 158.84v-39.3M531.47 158.84v-39.3"
                    ></path>
                    <path
                      stroke="#ff5a5f"
                      stroke-miterlimit="10"
                      d="M529.13 83.06V54.43"
                    ></path>
                    <path
                      stroke="#61a0a0"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M526.77 99.71v-6.6M531.49 99.71v-6.6M538.93 108.05h-19.59M538.93 111.2h-19.58"
                    ></path>
                  </g>
                  <g>
                    <path
                      fill="#bce8e0"
                      d="M633.8 155.99h-58.07v76.11h88.1v-47.39l-29.97-28.45-.06-.27z"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M454.2 232.1h124V116c-1.37-.13-19.12-1.46-30.41 12.66-9.43 11.8-7.25 25.47-6.87 27.6h-55.65v39.14H454.2z"
                      fill="#f6c5bf"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                  </g>
                  <g>
                    <path
                      d="M478.49 135.47v-24c-.43-21.68-9.74-49.93-9.74-49.93s-9.31 28.28-9.75 49.96v24h-7.14v96.6h33.75v-96.63z"
                      fill="#c6e7e0"
                    ></path>
                    <path
                      d="M459.19 107.22c.92-6.68 4.75-11.56 9.19-11.82 4.64-.26 8.84 4.58 9.9 11.52M461 92.57c1.21-4.71 4.28-7.86 7.69-7.88s6.53 3.14 7.75 7.88M463.8 79.41c1-2.75 2.88-4.47 4.95-4.48s4 1.72 5 4.48M468.76 62.89V36.97M459.19 142.83h6.18v9.74h-6.18zM472.09 142.83h6.18v9.74h-6.18zM459.19 160.58h6.18v9.74h-6.18zM472.09 160.58h6.18v9.74h-6.18zM459.22 178.33h6.18v9.74h-6.18zM472.12 178.33h6.18v9.74h-6.18zM459.22 196.08h6.18v9.74h-6.18zM472.12 196.08h6.18v9.74h-6.18zM459.38 213.83h6.18v9.74h-6.18zM472.28 213.83h6.18v9.74h-6.18z"
                      fill="none"
                      stroke="#61a0a0"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                  </g>
                  <g>
                    <rect
                      x="370.91"
                      y="105.47"
                      width="11.88"
                      height="11.88"
                      rx="3.26"
                      ry="3.26"
                      fill="#ff8e8f"
                    ></rect>
                    <path
                      d="M376.85 23c-19.07 0-34.58 15.82-34.58 35.26s15.51 35.27 34.58 35.27 34.57-15.82 34.57-35.27S395.91 23 376.85 23z"
                      fill="#f6c5bf"
                    ></path>
                    <path
                      d="M376.69 93c-23.11-37.26 0-69.72 0-69.72M372.71 106.31l-17.73-21.28"
                      fill="none"
                      stroke="#ec5d57"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M375 106.1l-3.72-12.86c-42.84-38.87 2-69.55 2-69.55M376.69 93c23.12-37.26 0-69.72 0-69.72M380.68 106.31l17.73-21.28"
                      fill="none"
                      stroke="#ec5d57"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M378.42 106.1l3.71-12.86c42.84-38.87-2-69.55-2-69.55"
                      fill="none"
                      stroke="#ec5d57"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                  </g>
                  <g>
                    <path
                      fill="none"
                      stroke="#f9d479"
                      stroke-miterlimit="10"
                      d="M359.72 172.83l.13 56.5"
                    ></path>
                    <path
                      d="M440.84 227.8c-.41-8.7-6.73-15.61-14.26-16.08-8.14-.51-15.55 6.64-16 16.08-.41-8.7-6.73-15.61-14.26-16.08-8.14-.51-15.55 6.64-16 16.08-.41-8.7-6.73-15.61-14.26-16.08-8.14-.51-15.55 6.64-16 16.08-.42-8.7-6.73-15.61-14.26-16.08-8.14-.51-15.55 6.64-16 16.08"
                      fill="none"
                      stroke="#388287"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M376.69 175.32s-.92-1.61-1.45-2.34a25.34 25.34 0 0 1-3-8.88c-.41-3 1-10.77 1-12.43a13.42 13.42 0 1 0-26.83 0c0 1.66 1.41 9.44 1 12.43a25.34 25.34 0 0 1-3 8.88 18.66 18.66 0 0 0-1.43 2.29 19 19 0 1 0 33.69 0z"
                      fill="none"
                      stroke="#75b4b4"
                      stroke-miterlimit="10"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <circle
                      cx="400.41"
                      cy="158.25"
                      r="17.72"
                      fill="none"
                      stroke="#75b4b4"
                      stroke-miterlimit="10"
                      style={{ mixBlendMode: "multiply" }}
                    ></circle>
                    <circle
                      cx="418.14"
                      cy="190.17"
                      r="10.47"
                      fill="none"
                      stroke="#75b4b4"
                      stroke-miterlimit="10"
                      style={{ mixBlendMode: "multiply" }}
                    ></circle>
                    <path
                      fill="none"
                      stroke="#f9d479"
                      stroke-miterlimit="10"
                      d="M400.41 207.32l17.73-17.15M400.41 229.33v-71.08"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                  </g>
                  <g>
                    <path
                      d="M46.44 118.2V93.85a3.86 3.86 0 0 0-1.36-3.17 2.46 2.46 0 0 0-1.74-.53c-1.19.16-2 1.47-2.29 1.88-1.15 1.81-2.07 8.11-2.26 16.64a8 8 0 0 0-4.24 2c-3.17 3-2.49 13.29-2.64 16-1 1.06-6.36 6.73-5.82 14.9.12 1.71.48 7.27 5 11.2a15.48 15.48 0 0 0 10.35 3.52 16.41 16.41 0 0 0 10.75-3.61c5.4-4.65 5.29-11.82 5.23-16.4 0-1.88-.22-14.48-7.34-17.45a8.68 8.68 0 0 0-3.64-.63z"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      fill="none"
                      stroke="#f9d479"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M41.73 175.1v-40.97"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <g
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        stroke="#407f7f"
                        d="M6.35 207.63l52.52-31.96"
                      ></path>
                      <path
                        d="M45.74 183.66c5.27-18.67 13.13-8 13.13-8M32.61 191.65c5.27-18.67 13.13-8 13.13-8M19.48 199.64c5.27-18.67 13.13-8 13.13-8M6.35 207.63c5.27-18.67 12.89-8.28 12.89-8.28l.24.29"
                        stroke="#75b4b4"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                    </g>
                    <path
                      d="M333.28 185.76c-14.9-8.09-32.29-11.25-49.49-10.73"
                      fill="none"
                      stroke="#407f7f"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M109.23 189.88s-7.86-10.68-13.13 8M83 205.86c5.28-18.67 13.14-8 13.14-8M69.83 213.85c5.27-18.67 13.13-8 13.13-8"
                      fill="none"
                      stroke="#75b4b4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M56.7 221.84c5.27-18.67 12.9-8.27 12.9-8.27l.23.28"
                      fill="none"
                      stroke="#75b4b4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <g stroke-linecap="round" stroke-linejoin="round">
                      <path
                        d="M33.4 213.15l52.53-32s12.71 4 16.73 5.93"
                        fill="none"
                        stroke="#407f7f"
                      ></path>
                      <path
                        d="M72.8 189.17c5.27-18.67 13.13-8 13.13-8"
                        fill="#fff"
                        stroke="#75b4b4"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                      <path
                        d="M59.67 197.17c5.27-18.68 13.13-8 13.13-8M46.53 205.16c5.28-18.67 13.14-8 13.14-8M33.4 213.15c5.27-18.67 12.9-8.28 12.9-8.28l.23.29"
                        fill="none"
                        stroke="#75b4b4"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                    </g>
                    <path
                      d="M0 185.9s18.35-11.83 49.49-10.73M58.87 175.67S71.4 177.5 78 179.19"
                      fill="none"
                      stroke="#407f7f"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <g
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        stroke="#407f7f"
                        d="M327.04 207.63l-52.53-31.96"
                      ></path>
                      <path
                        d="M287.64 183.66c-5.27-18.67-13.13-8-13.13-8M300.78 191.65c-5.28-18.67-13.14-8-13.14-8M313.91 199.64c-5.27-18.67-13.13-8-13.13-8"
                        stroke="#75b4b4"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                      <path
                        d="M327 207.63c-5.27-18.67-12.9-8.28-12.9-8.28l-.23.29"
                        stroke="#75b4b4"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                    </g>
                    <g
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M56.7 221.84l52.53-32 8.71 3.6c56.22 23.87 106.22-3.6 106.22-3.6l52.53 32"
                        stroke="#407f7f"
                      ></path>
                      <path
                        d="M237.29 197.87c-5.27-18.67-13.13-8-13.13-8M250.42 205.86c-5.27-18.67-13.13-8-13.13-8M263.55 213.85c-5.27-18.67-13.13-8-13.13-8M276.69 221.84c-5.28-18.67-12.9-8.27-12.9-8.27l-.24.28"
                        stroke="#75b4b4"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                    </g>
                    <g stroke-linecap="round" stroke-linejoin="round">
                      <path
                        d="M300 213.15l-52.52-32s-12.71 4-16.74 5.93"
                        fill="none"
                        stroke="#407f7f"
                      ></path>
                      <path
                        d="M260.59 189.17c-5.27-18.67-13.13-8-13.13-8"
                        fill="#fff"
                        stroke="#75b4b4"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                      <path
                        d="M273.72 197.17c-5.27-18.68-13.13-8-13.13-8M286.85 205.16c-5.27-18.67-13.13-8-13.13-8M300 213.15c-5.27-18.67-12.89-8.28-12.89-8.28l-.24.29"
                        fill="none"
                        stroke="#75b4b4"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                    </g>
                    <path
                      d="M274.51 175.67s-12.52 1.83-19.13 3.52"
                      fill="none"
                      stroke="#407f7f"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M21.3 166.13a4.43 4.43 0 0 0 .43-1.92 4.72 4.72 0 0 0-9.44 0 4.43 4.43 0 0 0 .43 1.92 32.5 32.5 0 0 0 4.29 8 32.5 32.5 0 0 0 4.29-8z"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      fill="none"
                      stroke="#ec5d57"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.01 168.74v9.9"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M26 218.86a4.52 4.52 0 0 0 .42-1.91A4.72 4.72 0 0 0 17 217a4.53 4.53 0 0 0 .43 1.91 32.28 32.28 0 0 0 4.29 8 32.52 32.52 0 0 0 4.28-8.05z"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M26 218.86a4.52 4.52 0 0 0 .42-1.91A4.72 4.72 0 0 0 17 217a4.53 4.53 0 0 0 .43 1.91 32.28 32.28 0 0 0 4.29 8 32.52 32.52 0 0 0 4.28-8.05z"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      fill="none"
                      stroke="#ec5d57"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.73 221.47v9.91"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M228.45 213.28a4.54 4.54 0 0 0 .43-1.92 4.72 4.72 0 0 0-9.44 0 4.53 4.53 0 0 0 .42 1.92 32.74 32.74 0 0 0 4.3 8 32.5 32.5 0 0 0 4.29-8z"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      fill="none"
                      stroke="#ec5d57"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M224.16 215.89v9.91"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M248.15 220.3a4.58 4.58 0 0 0 .43-1.92 4.73 4.73 0 0 0-9.45 0 4.58 4.58 0 0 0 .43 1.92 32.74 32.74 0 0 0 4.3 8 32.5 32.5 0 0 0 4.29-8z"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      fill="none"
                      stroke="#ec5d57"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M243.86 222.91v9.9"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      d="M100.39 218.86a4.53 4.53 0 0 0 .43-1.91 4.73 4.73 0 0 0-9.45 0 4.53 4.53 0 0 0 .43 1.91 32.52 32.52 0 0 0 4.3 8 32.28 32.28 0 0 0 4.29-8z"
                      fill="#c6e7e0"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <path
                      fill="none"
                      stroke="#ec5d57"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M96.1 221.47v9.91"
                      style={{ mixBlendMode: "multiply" }}
                    ></path>
                    <g>
                      <path
                        d="M319.12 165.63a4.43 4.43 0 0 0 .43-1.92 4.72 4.72 0 0 0-9.44 0 4.43 4.43 0 0 0 .43 1.92 32.5 32.5 0 0 0 4.29 8 32.5 32.5 0 0 0 4.29-8z"
                        fill="#c6e7e0"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                      <path
                        fill="none"
                        stroke="#ec5d57"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M314.83 168.24v9.9"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                    </g>
                    <g fill="none">
                      <path
                        d="M294.62 120.13V96.69a3.65 3.65 0 0 0-1.34-3 2.48 2.48 0 0 0-1.71-.51 3.68 3.68 0 0 0-2.24 1.8c-1.13 1.74-2 7.81-2.22 16a7.84 7.84 0 0 0-4.16 2c-3.11 2.91-2.45 12.79-2.59 15.35-1 1-6.24 6.48-5.71 14.34.11 1.65.47 7 4.89 10.78a15.35 15.35 0 0 0 10.16 3.39 16.29 16.29 0 0 0 10.55-3.48c5.3-4.47 5.19-11.37 5.13-15.78 0-1.81-.21-13.93-7.2-16.8a8.62 8.62 0 0 0-3.56-.65z"
                        stroke="#75b4b4"
                        stroke-miterlimit="10"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                      <path
                        stroke="#f9d479"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M289.99 174.9v-39.44"
                        style={{ mixBlendMode: "multiply" }}
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </section>
        </TripsWrapper>
      </Wrap>
      <Footer />
    </>
  );
};

export default withRouter(Trips);

const Wrap = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

const TripsWrapper = styled.div`
  margin-top: 36px;
  padding: 0 80px;
  h2 {
    font-size: 34px;
    color: ${(props) => props.theme.color.black};
  }
`;
const Buttons = styled.div`
  border-bottom: solid 1px #dddddd;
  margin-bottom: 20px;
  button {
    padding: 0;
    border: none;
    color: ${(props) => props.theme.color.gray};
    background: none;
    font-size: 16px;
    margin: 30px 30px 20px 0;
  }
`;

const Tab = styled.span`
  color: ${(props) => props.theme.color.gray};
`;