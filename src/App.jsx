import React, { useState, useEffect } from "react";
import style from "./styles/singup.module.css";

function SignUp() {
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [emailDirty, setEmailDirty] = useState(false);

  const [nameDirty, setNameDirty] = useState(false);

  const [phoneDirty, setPhoneDirty] = useState(false);

  const [formValid, setForValid] = useState(false);

  const [emailError, setEmailError] = useState("Email is not valid");

  const [nameError, setNameError] = useState("Name is not valid");

  const [phoneError, setPhoneError] = useState("Phone is not valid");

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;

      case "phone":
        setPhoneDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;

      default:
        break;
    }
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 1) {
      setNameError("Short name!");
    } else {
      setNameError("");
    }
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
    const regex = /^((\+7|7|8)+([0-9]){10})$/;

    if (!e.target.value.match(regex)) {
      setPhoneError("Not russian phone!");
    } else {
      setPhoneError("");
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("It`s not email!");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    setPhone("");
    setEmail("");
  };

  useEffect(() => {
    nameError || phoneError || emailError
      ? setForValid(false)
      : setForValid(true);
  }, [nameError, phoneError, emailError]);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div>
          <h1 className={style.title}>Регистрация</h1>
          <div className={style.loginContainer}>
            <h3 className={style.loginTitle}>Уже есть аккаунт?</h3>
            <a href="/">Войти</a>
          </div>
        </div>
        <form className={style.singup} onSubmit={handleSubmit}>
          <div className={style.inputContainer}>
            <label htmlFor="name">Имя</label>
            <input
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChangeName(e)}
              value={name}
              type="text"
              name="name"
              id="name"
            />
            {nameDirty && nameError && (
              <div style={{ color: "red" }}>{nameError}</div>
            )}
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="email">Email</label>
            <input
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChangeEmail(e)}
              value={email}
              type="email"
              name="email"
              id="email"
            />
            {emailDirty && emailError && (
              <div style={{ color: "red" }}>{emailError}</div>
            )}
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="phone">Номер телефона</label>
            <input
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChangePhone(e)}
              value={phone}
              type="tel"
              name="phone"
              id="phone"
            />
            {phoneDirty && phoneError && (
              <div style={{ color: "red" }}>{phoneError}</div>
            )}
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="select">Язык</label>
            <select id="select" data-placeholder="Язык">
              <option value="RU">Русский</option>
              <option value="EN">Английский</option>
              <option value="ZH">Китайский</option>
              <option value="ES">Испанский</option>
            </select>
          </div>
          <div className={style.checkboxContainer}>
            <input type="checkbox" name="checkbox" id="checkbox" />
            <p className={style.checkboxRules}>
              Принимаю <a href="/"> условия</a> использования
            </p>
          </div>
          <button disabled={!formValid} type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
