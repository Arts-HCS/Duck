"use client";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import RegisterForm from "@/components/utils/registerform";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function register() {

  const [baseText, setBaseText] = useState("Comienza a \nenamorarte");

  const [baseTyped, setBaseTyped] = useState("");
  const [nameTyped, setNameTyped] = useState("");
  const [gottenName, setGottenName] = useState("");
  const [success, setSuccess] = useState(false);

  // Animar texto base SOLO al cargar
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      i++;

      setBaseTyped(baseText.slice(0, i));

      if (i >= baseText.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [baseText]); // <- solo una vez

  useEffect(() => {
    if (!gottenName) return;

    let i = 0;
    setNameTyped(""); // reinicia solo el nombre

    const interval = setInterval(() => {
      i++;

      setNameTyped(gottenName.slice(0, i));

      if (i >= gottenName.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [gottenName]);

  /* ===============================
     Estrellas
  =============================== */

  const starRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    starRefs.current.forEach((star) => {
      if (!star) return;

      function randomizePosition() {
        const left = Math.random() * 100;
        star.style.left = `${left}%`;
      }

      star.addEventListener("animationiteration", randomizePosition);
      randomizePosition();

      return () => {
        star.removeEventListener("animationiteration", randomizePosition);
      };
    });
  }, []);

  return (
    <main className="flex flex-col min-h-screen px-4 overflow-hidden relative">
      <div className="second-blur-window-big"></div>
      {[1, 4, 9, 16].map((delay, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) starRefs.current[i] = el;
          }}
          className="star-bottom"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      <Header></Header>
      <section className="flex items-start justify-start z-10 h-[90vh]">
        <div className="w-[45%] rounded-br-3xl rounded-tr-3xl glass-dark-all-borders h-[90vh] p-9">
          <h3 className="text-[53px] text-(--white-color) font-medium mb-2">
            Crear cuenta
          </h3>
          {success ? (
            <div className="w-full h-fit py-10 flex items-center justify-end flex-col gap-5 glass-dark-all-borders text-(--whtite-color) rounded-2xl">
              <h1 className="text-xl">¡Tu cuenta ha sido creada, {gottenName}!</h1>
              <Link className="text-2xl text-(--white-color) glass-dark-all-borders bg-[rgba(0,0,0,0.7)] px-10 py-5 rounded-full hover:bg-[rgba(0,0,0,0.4)] transition-all" href={"/login"}>Iniciar sesión</Link>
            </div>
            
          ): (
            <RegisterForm setBaseText={setBaseText} setGottenName={setGottenName} setSuccess={setSuccess}></RegisterForm>
          )}
          
        </div>
        <div className="h-full w-[55%] flex items-center justify-start pt-20 px-5 flex-col">
          <h4 className="text-9xl whitespace-pre-line font-medium register-color text-center h-[62%]">
            {baseTyped}
            <span className="capitalize">{gottenName && `, ${nameTyped}`}</span>
          </h4>
          {baseText === "Tu cuenta ya existe" && (
            <Link className="text-2xl text-(--white-color) glass-dark-all-borders bg-[rgba(0,0,0,0.7)] px-10 py-5 rounded-full hover:bg-[rgba(0,0,0,0.4)] transition-all" href={"/login"}>Iniciar sesión</Link>
          )}
        </div>
      </section>

      <Footer></Footer>
    </main>
  );
}
