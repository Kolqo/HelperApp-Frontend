import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./add.module.css";
import Field from "../../../../components/field/field";
import Input from "../../../../components/input/input";
import Button from "../../../../components/button/button";
import ImageLoader from "../../../../components/imageLoader/imageLoader";

export default function add() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAEAAQADASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAQFAQIDBv/EADYQAAICAQEHAgUCBQQDAQAAAAABAgMRBAUSEyExQVFhcSIyQoGRofAjM1JTYhRDcsEVkrHx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGYxcnyAwDpwvU1cJLsBqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHatYgjkllpG2qnwtNOXphAQ3tGaseIxcM8jvXtCqXzJwf5RVHeWkvjFS3G0125gW0Z12r4ZRl7B1xfTkUnOL55TR2r1l0Ok8rxLmBZOtrpzNWmuqOFe0l/uQx6xJNepps6TWfD5AaA7uEX2/Bo6vDA5g2cJLsagAAAAAAAAAAAAAAAAAAAAAAAAAABvUsyz4Iu1LMRhWu7yyZUsRz5KnX2cTVT8R+FAaaaHFvhDs3z9i8KzZVebJ2P6VhFoBrOEJrE4qS9URp6CmXy5g/RksAVlmzrI/JJS/RkadNlfzwa+xeGAKSu6yv5JtemSTDaNi+eMZfoybZpabOsEn5XIi2bNX+3Z9pAdq9fTL5swfqjunCxZi4y9iqs0l9fWDa8x5nFNxfLKaAunUu3I1dcl05ldXrb4fVvL/Ik17Ri/5kGvVcwOrTXVA6Q1FNvyzT9GbOEX2wBxB0dT7M0cWuqAwAAAAAAAAAAAAAAAAAbQWZoDpOSqplJ/Ssnn2222+rLbalm5pt3vN4+xUwi5zjBdZPAFzs6vc0sX3l8RKMRioxUV0SwjIAAAAc7rY0w3pfZI5rUpQrlNYVkt1egEgAADSdcLF8cFL3RuAIdmz6pfI3B/lEazZ90flxNenItQBRThOt4nFx90bV6i2v5JtLx2LppNYayjhZo6J/RuvzHkBFr2jNfzIKXquRMo1Nd+VHKa7Mqb4Kq6UIvKT6kzZkOU7PsgJVkcS5dzQ3tfxY8GgAAAAAAAAAAAADDaistpLywMnSpdWQbdoaav695+I8yfVLNMZtbuVnD7AVe1bN7UqC6QX6s12ZXv6pSfSCyRbrOLdOb+p5LHZzVGlldJfNLCAsznbbCqOZP2Xk5PVwlB8Nre7KXIg2ucp5szl+QO9munLlBKK89WYjbOOkvucnvdE3+/UjHTXS4eiprXSfxP9/cDrGa11KlHlbDrHycto5hptPB8nzZAhOVclKEnGS7o7223a2cVu70orHwoCx0WthZR/Fmozh1z39SY2kstpIqKNnyi9/U4jCPNrPU6ai93S8QXRAWUZRnHei8rybEPS2qvS70uilh+mSWmn0eQMgAAaykoxcn0SybEXaNm5pWu8ngCqlJyk5Pq3kuNJDh6aC7tZZUUQ4l0IeWXk3iDA4t5bZgAAAAAAAA533RoqlZLou3kpbtfqLW/jcI+I8gLuy6upZsnGPuyHbtWmPKClN/hFO228vmwBNt2pfPlDdgvRZZEstnY8znKT9WagDrpauPqa6+0pc/buei2hZwtHNrq1ur7lXsKre1E7X0hHC92SNs2866l/wAn+/yBWFteuFRTT/THL9yv0NfF1dce2cv7E3Uz375PtnCA5GU2ljPIwABK3KdXXXXPfUoLHwoinZamca1CCUcd11YGZbP09Ms2Wya/p7sy9SoR3NPBVx/UjttvLeWAMylKXzNv3ZgADvUt7R6iP+ORsez+ZW/+SMWPhbNk+9rx9iHpL/8AT6iM+3R+wHoAYTTSa5pmQBVbVszbGtfSsv7loUGos4uonPs3y9gJey6966U+0V+rLC19EcNmV7mlUn1m8nWbzJgagAAAAAAAr9s54Ffje5/gqC/19fF0di7pby+xQAAAAAMwi5zjCPWTwgPQbGq4ehUmudjcis19vF1lkuyeF9i7sa0ujbXSuGF/0ebyBZbKjuQuvf0rdXv+8GDtGPB2dVDvP4n+/wAHEAAAABlYys9AMAt4VwhFKMVgy1HHNICnBZO7Td3H/wBQtRp49Gl7RAjarTWaiilVrG6ucZciN/4zUf4fksLNbWl8GZMhy1FsnlzkvZ4AnaKFtVCruxmPRp9juVcL7ITUnKTx2bOmqi42K2tvdnzTQErWWcLS2S74wiiinKSiureET9pWSjRTVJtyfxSycNm18TVxfaPxAXMYqqpRXSKwcTra/hx5OQAAAAAAAABrKw+jPN3Vuq6cH9LwekKba9e5qVNdJr9UBBAAAm7Iq4uui30gt5kIu9hVbtNlr6yeF7IDfbVu7p41rrN/oioordt0K19TSJW2LeJrXFdILBpsyyqvVqd0lFJPDfkCy1UZzu3YQk4xWFhHHgW/25fgtIWQsWYSjJeU8mwFRwbf7cvwOFZ/bl+C3AFPw5/0S/BlVWPpXL8FuAOGl4ipSsi01yWfB2MgCv1em3G5wXw914IpcTlGK+NpL1KieN+W78ueQGAAAJWllGyHAs85iRSRpWq423PpCIEPaNvE1k/EfhX2Jux68VTsf1PCKhtttvqz0Wkr4Olrg+qWX7gLXmXsaBvLyAAAAAAAAABB2tXv6XfXWDz9icaWwVlU4P6k0B5sBpxbT6rkAB6jSwWm0MIy5bkcy/8ArPPaGrjayqHbey/Zcy82tbwtDNJ85/CgPP2WOyyU31k2zBqZA2jOUHmEnF+U8Eynamqr5OSmvEkQQBd07ZrlytrlF+VzRNq1dFy/hWxb8N4Z5cyB6C2WrT9P8UcHqLu9kitp1uop+S2WPD5olw2tvctRRGfquTA7ce3+5L8mHbY+s5fkzG3Q3fLY6peJHR6SeN6txsj5iwI7eeoNpQlB4lFr3RqAAAA6auXB2bGPe2X6fvBpGLlJRXVvBptaxPURqXSuOP3+gHDR18bVVw7N5fsegseIe5VbFqzZZa/pWF9yztfNIDmAAAAAAAAAAAAAodo18PWT8S+JEYtds15hXauz3WVQFpsGCd9s31jHC+//AOGdvWN2VV9knIh7P1f+k1G81mEliSL+Nmm1kOTrtXh88fYDy4PQXbH01nOG9W/R8iDdsW+HOqUbF+GBWg6W6e6l/wAWuUfVrkcwBkwAMgwANjeu2yp5rnKL9Hg5gCwq2tqIrFm7ZH/JHeOu0dv8yuVT8x5oqDIF3Giu1Z098J+meZpOi2HzQePK5lOnh5RKp2hqaulra8S5gWOjindvPpBZZU32O26dj+ptkye1ZTonB1RU5rG9FkGqDstjBdZNIC/2XVw9FBvrP4mdJPMmzrhV14XRLCOIAAAAAAAAAAAAABw1tfF0tke+Mr7Hnz055zU18HUWQ7J8vYDmE2nlPDAAlU7R1VPS1yXiXMnU7c7XVfeD/wCinAHpatoaW9YVsU32lyFuz9LesuqKb7x5HmjpVqLqX/CslH0T5AWl2w+9Nv2mv+yDds7VU9anJeY8yRTtq+HK2MbF56MnU7X01nKe9W/VcgPPtNPD5MHqXDTauOWq7V5WGRLti0T51ylW/wAoChBPu2Pqa+cN2xejwyFZVZU8WQlB+qwBqZMADIMADYn7Hq4msUn0gsleXmxKt3TSsfWcv0X7YE+18kjkbWPM/Y1AAAAAAAAAAAAAABUbYr3boWL6lh+6LcibUr4mjk+8HvAUYAAAAABGLk8RTb8IlVbO1Fn0bi8yeAIoLarZMFztscvSPIl1aWir5K4p+XzYFJRp9RNqVUJr/Lp+pb6SOurxxb4uP9LW8/ySgB1Vq7oy9yaw8NPsziAOd2y9Lbz4e4/MHgg3bEmudNql6SWCzUmujN1a+6A83dotTT89UseVzRwPWqyL74Oduk09/wDMqjJ+ej/IHllzPVaetUaauv8Apjz9yJHZGnhfGyMp4i87rfInWPEceQOPUAAAAAAAAAAAAAAAAxKKlFxksprDMgCh1Whtom8Rc4dpJHKvT3WPEK5P7HowBT1bKulzslGC/LJdWzNPDnLM36smgDWFcK1iEYxXosGwAAAAAAAAAAAAAm10AA24kvJq3nqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z");

  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [imgError, setImgError] = useState(null);

  useEffect(() => {
    handleError2();
  }, [error]);

  function handleError() {
    setError(null);
    setNameError(null);
    setDescriptionError(null);
    setCityError(null);
    setPhoneError(null);
    setImgError(null);
  }

  function fetchData() {
    let data = JSON.stringify({
      name: name,
      description: description,
      city: city,
      phone: phone,
      img: img,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/v1/post/create",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("jwt"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        window.location.href = "/main_page";
      })
      .catch((error) => {
        setError(error.response.data.detail)
      });
  }

  function handleImg(img){
    setImg(img);
  }

  function handleError2() {
    if (error) {
      setNameError(error.includes("name") ? error : null);
      setDescriptionError(error.includes("description") ? error : null);
      setCityError(error.includes("city") ? error : null);
      setPhoneError(error.includes("phone") ? error : null);
      setImgError(error.includes("img") ? error : null);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <p>Create a request</p>
        <div className={styles.imageBox}>
          <ImageLoader setData={handleImg} className={styles.imageLoaderClass}></ImageLoader>
        </div>
        <div className={styles.writeBox}>
          <p>Request name</p>
          <Input
            setData={(e) => setName(e.target.value)}
            type="text"
            inputclassName={styles.inputClass}
            showError={<div className={styles.errorBox}>{nameError}</div>}
          ></Input>
        </div>
        <div className={styles.writeBox}>
          <p>More detailed description</p>
          <Field
            setData={(e) => setDescription(e.target.value)}
            className={styles.fieldDescription}
            rows="10"
            showError={<div className={styles.errorBox}>{descriptionError}</div>}
          ></Field>
        </div>
        <div className={styles.writeBox}>
          <p>Location</p>
          <Input
            setData={(e) => setCity(e.target.value)}
            type="text"
            inputclassName={styles.inputClass}
            showError={<div className={styles.errorBox}>{cityError}</div>}
          ></Input>
        </div>
        <div className={styles.writeBox}>
          <p>Phone number</p>
          <Input
            setData={(e) => setPhone(e.target.value)}
            type="text"
            inputclassName={styles.inputClass}
            showError={<div className={styles.errorBox}>{phoneError}</div>}
          ></Input>
        </div>
        <div className={styles.buttonBox}>
          <Button onClick = {fetchData} className={styles.addButton}>Confirm</Button>
        </div>
      </div>
    </>
  );
}
