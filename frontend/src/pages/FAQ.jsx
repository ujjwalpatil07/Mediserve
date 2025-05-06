import React, { useState, useRef } from "react";
import { useSetTheme } from "../context/ThemeProvider";

export default function Faq({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  const [eventId, setEventId] = useState("q1");
  const [isExpanded, setIsExpanded] = useState(false);
  const faqSectionRef = useRef(null);
  const [currTheme] = useSetTheme()

  const scrollToSection = () => {
    faqSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const visibleFaqs = isExpanded ? faq : faq.slice(0, 6);

  return (
    <div
      ref={faqSectionRef}
      className={`doctor-faqs mt-8 flex w-[95%] flex-col items-center  py-8 px-4 mb-5 shadow-lg rounded-2xl overflow-x-hidden
        ${currTheme === "light" ? "bg-gradient-to-b from-violet-100 to-violet-200 " :"bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700"}`}
    >
      <h2 className={`mb-8 text-center font-serif text-4xl font-bold 
        ${currTheme === "light" ? "text-gray-800" : "text-slate-100"}`}>
        💬 Frequently Asked Questions
      </h2>

      {visibleFaqs.map((item, idx) => {
        const questionId = `q${idx + 1}`;
        const isCurrentOpen = isOpen && eventId === questionId;

        return (
          <div
            key={idx}
            className={`mb-4 w-full max-w-5xl rounded-tr-2xl rounded-bl-2xl shadow-lg p-5 transition-all duration-300 ${isCurrentOpen ? 
              ((currTheme === "light") ?
               "bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-md" :
                "bg-gradient-to-tl from-slate-600 via-slate-700 to-slate-800 p-6 shadow-md text-slate-50"
              ) : (currTheme === "light") ?
                "bg-gradient-to-bl from-white via-purple-50 to-purple-100 p-6 shadow-md" :
                "bg-gradient-to-bl from-slate-600 via-slate-700 to-slate-800 text-slate-100 p-6 shadow-md"
              }`}
          >
            <div className="flex items-center justify-between cursor-pointer" onClick={() => {
              if (eventId === questionId) {
                setIsOpen(!isOpen);
              } else {
                setIsOpen(true);
                setEventId(questionId);
              }
            }}>
              <h3 className="text-xl font-semibold">{item.question}</h3>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2">
                <i
                  className={`fa-solid ${isCurrentOpen ? "fa-minus" : "fa-plus"} text-2xl`}
                ></i>
              </div>
            </div>

            {/* Answer */}
            <div
              className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isCurrentOpen ? "max-h-[500px] mt-4 text-amber-400" : "max-h-0"
                }`}
            >
              <p className="text-lg">{item.answer}</p>
            </div>
          </div>
        );
      })}

      {/* Load more button */}
      <button
        className="mt-6 rounded-2xl border-2 border-gray-700 bg-white px-6 py-3 font-semibold hover:bg-gray-100"
        onClick={() => {
          setIsExpanded(!isExpanded);
          setTimeout(scrollToSection, 300); // Small timeout for smoother experience
        }}
      >
        {isExpanded ? "Show Less" : "Load More"}
        <i className={`fa-solid ms-3 ${isExpanded ? "fa-angles-up" : "fa-angles-down"}`}></i>
      </button>
    </div>
  );
}
