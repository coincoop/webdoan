import React, { useEffect, useState } from "react";
import "../css/contact.css";
import { Helmet } from "react-helmet";
import { API_URL } from "../config";

import axios from "axios";
export default function Contact() {
  const [mota, setMota] = useState("");
  const [diachi, setDiachi] = useState("");
  const [sdt, setSdt] = useState("");
  const [url, setUrl] = useState("");
  const [map, setMap] = useState("");
  const [gmail, setGmail] = useState("");

  useEffect(() => {
    fetchContact();
  }, []);
  const fetchContact = async () => {
    const response = await axios.get(`${API_URL}contact/status`);
    setSdt(response.data.sdt);
    setMota(response.data.mota);
    setDiachi(response.data.diachi);
    setUrl(response.data.url);
    setMap(response.data.map);
    setGmail(response.data.gmail);
  };
  return (
    <>
      <nav
        class="breadcrumbs-style_1 breadcrumb g-breadcrumb lazyload text-center"
        role="navigation"
        aria-label="breadcrumbs"
      >
        <div class="container-fluid"></div>
        <div class="container-fluid">
          <a className="linkhome" href="/" title="Home">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="home"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="icon icon-home"
            >
              <path
                fill="currentColor"
                d="M541 229.16l-61-49.83v-77.4a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v51.33L308.19 39.14a32.16 32.16 0 0 0-40.38 0L35 229.16a8 8 0 0 0-1.16 11.24l10.1 12.41a8 8 0 0 0 11.2 1.19L96 220.62v243a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-128l64 .3V464a16 16 0 0 0 16 16l128-.33a16 16 0 0 0 16-16V220.62L520.86 254a8 8 0 0 0 11.25-1.16l10.1-12.41a8 8 0 0 0-1.21-11.27zm-93.11 218.59h.1l-96 .3V319.88a16.05 16.05 0 0 0-15.95-16l-96-.27a16 16 0 0 0-16.05 16v128.14H128V194.51L288 63.94l160 130.57z"
                class=""
              ></path>
            </svg>{" "}
            Trang chủ
          </a>

          <span aria-hidden="true" className="iconhome">
            ›
          </span>
          <span>Liên hệ</span>
        </div>
      </nav>
      <div className="container">
        <Helmet>
          <title>{`Liên hệ - Gaming Zone`}</title>
        </Helmet>

        <div className="contact-content">
          <div className="row mb-2 mb-md-5">
            <div class="col d-flex left-content-contact">
              <div class="align-self-center pl-lg-3">
                <p>
                  <div dangerouslySetInnerHTML={{ __html: mota }} />
                </p>
                <ul class="list-unstyled contact-page__info">
                  <li>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fal"
                      data-icon="home"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      class="icon icon-home"
                    >
                      <path
                        fill="currentColor"
                        d="M541 229.16l-61-49.83v-77.4a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v51.33L308.19 39.14a32.16 32.16 0 0 0-40.38 0L35 229.16a8 8 0 0 0-1.16 11.24l10.1 12.41a8 8 0 0 0 11.2 1.19L96 220.62v243a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-128l64 .3V464a16 16 0 0 0 16 16l128-.33a16 16 0 0 0 16-16V220.62L520.86 254a8 8 0 0 0 11.25-1.16l10.1-12.41a8 8 0 0 0-1.21-11.27zm-93.11 218.59h.1l-96 .3V319.88a16.05 16.05 0 0 0-15.95-16l-96-.27a16 16 0 0 0-16.05 16v128.14H128V194.51L288 63.94l160 130.57z"
                        class=""
                      ></path>
                    </svg>
                    {diachi}
                  </li>
                  <li>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fal"
                      data-icon="phone-alt"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="icon icon-mobile-phone"
                    >
                      <path
                        fill="currentColor"
                        d="M493.09 351.3L384.7 304.8a31.36 31.36 0 0 0-36.5 8.9l-44.1 53.9A350 350 0 0 1 144.5 208l53.9-44.1a31.35 31.35 0 0 0 8.9-36.49l-46.5-108.5A31.33 31.33 0 0 0 125 .81L24.2 24.11A31.05 31.05 0 0 0 0 54.51C0 307.8 205.3 512 457.49 512A31.23 31.23 0 0 0 488 487.7L511.19 387a31.21 31.21 0 0 0-18.1-35.7zM456.89 480C222.4 479.7 32.3 289.7 32.1 55.21l99.6-23 46 107.39-72.8 59.5C153.3 302.3 209.4 358.6 313 407.2l59.5-72.8 107.39 46z"
                        class=""
                      ></path>
                    </svg>
                    {sdt}
                  </li>
                  <li>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fal"
                      data-icon="envelope-open-text"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="icon icon-email"
                    >
                      <path
                        fill="currentColor"
                        d="M352 248v-16c0-4.42-3.58-8-8-8H168c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h176c4.42 0 8-3.58 8-8zm-184-56h176c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8H168c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8zm326.59-27.48c-1.98-1.63-22.19-17.91-46.59-37.53V96c0-17.67-14.33-32-32-32h-46.47c-4.13-3.31-7.71-6.16-10.2-8.14C337.23 38.19 299.44 0 256 0c-43.21 0-80.64 37.72-103.34 55.86-2.53 2.01-6.1 4.87-10.2 8.14H96c-17.67 0-32 14.33-32 32v30.98c-24.52 19.71-44.75 36.01-46.48 37.43A48.002 48.002 0 0 0 0 201.48V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V201.51c0-14.31-6.38-27.88-17.41-36.99zM256 32c21.77 0 44.64 16.72 63.14 32H192.9c18.53-15.27 41.42-32 63.1-32zM96 96h320v173.35c-32.33 26-65.3 52.44-86.59 69.34-16.85 13.43-50.19 45.68-73.41 45.31-23.21.38-56.56-31.88-73.41-45.32-21.29-16.9-54.24-43.33-86.59-69.34V96zM32 201.48c0-4.8 2.13-9.31 5.84-12.36 1.24-1.02 11.62-9.38 26.16-21.08v75.55c-11.53-9.28-22.51-18.13-32-25.78v-16.33zM480 464c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16V258.91c42.75 34.44 99.31 79.92 130.68 104.82 20.49 16.36 56.74 52.53 93.32 52.26 36.45.26 72.27-35.46 93.31-52.26C380.72 338.8 437.24 293.34 480 258.9V464zm0-246.19c-9.62 7.75-20.27 16.34-32 25.79v-75.54c14.44 11.62 24.8 19.97 26.2 21.12 3.69 3.05 5.8 7.54 5.8 12.33v16.3z"
                        class=""
                      ></path>
                    </svg>
                    {gmail}
                  </li>
                  <li>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fal"
                      data-icon="globe-europe"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                      class="icon icon-globe-europe fa-w-16 fa-2x"
                    >
                      <path
                        fill="currentColor"
                        d="M184 119.2c0-7-5.7-12.7-12.7-12.7h-.1c-3.4 0-6.6 1.3-8.9 3.7l-28.5 28.5c-2.4 2.4-3.7 5.6-3.7 8.9v.1c0 7 5.7 12.7 12.7 12.7h18c3.4 0 6.6-1.3 8.9-3.7l10.5-10.5c2.4-2.4 3.7-5.6 3.7-8.9v-18.1zM248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm48 458.4V432c0-26.5-21.5-48-48-48h-20.2c-3.9 0-13.1-3.1-16.2-5.4l-22.2-16.7c-3.4-2.5-5.4-6.6-5.4-10.8v-23.9c0-4.7 2.5-9.1 6.5-11.6l42.9-25.7c2.1-1.3 4.5-1.9 6.9-1.9h31.2c3.2 0 6.3 1.2 8.8 3.2l52.2 44.8h30.2l17.3 17.3c9.5 9.5 22.1 14.7 35.5 14.7h16.8c-29.9 49.1-78.7 85.3-136.3 98.4zM448.5 336h-32.9c-4.8 0-9.5-1.9-12.9-5.3l-17.3-17.3c-6-6-14.1-9.4-22.6-9.4h-18.3l-43.2-37.1c-8.2-7.1-18.7-10.9-29.6-10.9h-31.2c-8.2 0-16.3 2.2-23.4 6.5l-42.9 25.7c-13.7 8.2-22.1 23-22.1 39v23.9c0 14.3 6.7 27.8 18.2 36.4l22.2 16.7c8.6 6.5 24.6 11.8 35.4 11.8h20.2c8.8 0 16 7.2 16 16v39.2c-5.3.4-10.6.8-16 .8-119.1 0-216-96.9-216-216 0-118.9 96.5-215.6 215.3-216L232 51.1c-10.2 7.7-16 19.2-16 31.4v23.2c0 6.4 3.1 17 5.9 22.3-.8 2.1-21.1 15-24.6 18.5-8.6 8.6-13.3 20-13.3 32.1V195c0 25 20.4 45.4 45.4 45.4h25.3c11 0 21.2-3.9 29.2-10.6 3.9 1.4 8.2 2.1 12.6 2.1h13.4c25.6 0 32.2-20.2 36.1-21.5 5.1 9.1 13.5 16.2 23.5 19.5-4.3 14.2-.9 30.3 10.1 41.6l18.2 19.1c8.7 8.9 20.6 13.9 32.7 13.9h27.7c-2.4 10.8-5.7 21.3-9.7 31.5zm-17.8-63.6c-3.6 0-7.1-1.5-9.6-4L402.6 249a9.93 9.93 0 0 1 .1-14c12.6-12.6 10.5-8.6 10.5-17.8 0-2.5-1-4.9-2.8-6.7l-7.9-7.9c-1.8-1.8-4.2-2.8-6.7-2.8h-13.4c-8.5 0-12.6-10.3-6.7-16.2l7.9-7.3c1.8-1.8 4.2-2.8 6.7-2.8h8.3c5.2 0 9.5-4.2 9.5-9.5v-10.2c0-5.2-4.2-9.5-9.5-9.5h-28.2c-7.4 0-13.4 6-13.4 13.4v5.6c0 5.8-3.7 10.9-9.2 12.7l-26.5 8.8c-4.3 1.4-4.6 5-4.6 8.2 0 3.7-3 6.7-6.7 6.7h-13.4c-3.7 0-6.7-3-6.7-6.7 0-8.4-12.5-8.6-15.3-3-9 12.4-11.5 18.2-19.9 18.2h-25.3c-7.4 0-13.4-6-13.4-13.4v-16.4c0-3.6 1.4-7 3.9-9.5 19.5-14 29.6-17.6 29.6-31.5 0-2.9 1.8-5.5 4.6-6.4l33.6-11.2c1.4-.5 2.7-1.2 3.7-2.3L313.9 95c5-5 3.5-14.9-6.7-14.9h-17.4L276.4 99v6.7c0 3.7-3 6.7-6.7 6.7h-15c-3.7 0-6.7-3-6.7-6.7V82.5c0-2.1 1-4.1 2.7-5.4l44-31.9C391.4 66.7 464 153 464 256c0 5.5-.4 11-.8 16.4h-32.5z"
                        class=""
                      ></path>
                    </svg>
                    {url}
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-12 col-md-8">
              <div class="gmap-iframe">
                <div class="mapouter">
                  <div class="gmap_canvas">
                    <iframe
                      width="1080"
                      height="500"
                      id="gmap_canvas"
                      src={map}
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    ></iframe>
                    Google Maps Generator by{" "}
                    <a href="https://www.embedgooglemap.net">
                      embedgooglemap.net
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-from-wrap">
          <div className="row">
            <div className="col-md-12">
              <form
                action=""
                method="post"
                className="contact-form"
                id="ContactForm"
              >
                <input type="hidden" name="form_type" value="customer_login" />
                <input type="hidden" name="utf8" value="✓" />
                <div className="contact__fields">
                  <div className="field">
                    <input
                      className="field__input"
                      autoComplete="name"
                      type="text"
                      id="ContactForm-name"
                      name="contact[Name]"
                      defaultValue=""
                      placeholder="Name"
                    />
                    <label className="field__label" htmlFor="ContactForm-name">
                      Họ tên
                    </label>
                  </div>
                  <div className="field field--with-error">
                    <input
                      autoComplete="email"
                      type="email"
                      id="ContactForm-email"
                      className="field__input"
                      name="contact[email]"
                      spellCheck="false"
                      autoCapitalize="off"
                      defaultValue=""
                      aria-required="true"
                      placeholder="Email"
                    />
                    <label className="field__label" htmlFor="ContactForm-email">
                      Email <span aria-hidden="true">*</span>
                    </label>
                  </div>
                </div>
                <div className="field phone">
                  <input
                    type="tel"
                    id="ContactForm-phone"
                    className="field__input"
                    autoComplete="tel"
                    name="contact[Phone number]"
                    pattern="[0-9\-]*"
                    defaultValue=""
                    placeholder="Phone number"
                  />
                  <label className="field__label" htmlFor="ContactForm-phone">
                    Số điện thoại
                  </label>
                </div>
                <div className="field area">
                  <textarea
                    rows="10"
                    id="ContactForm-body"
                    className="text-area field__input"
                    name="contact[Comment]"
                    placeholder="Comment"
                  ></textarea>
                </div>
                <div className="contact__button">
                  <button type="submit" className="button">
                    Gửi
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
