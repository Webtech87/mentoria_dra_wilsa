import './Faq.css'
import {useState} from "react";
import { FaWhatsapp } from 'react-icons/fa';


const Faq = () => {

    interface FaqList {
        id: number;
        quest: string;
        answer: string;
    }

    const faqList: FaqList[] = [
        {
            id: 1,
            quest: "A mentoria é presencial ou online?",
            answer: "Answer A mentoria é presencial ou online?"
        },
        {
            id: 2,
            quest: "Preciso de ter experiência para participa?",
            answer: "Answer Preciso de ter experiência para participa?"
        },
        {
            id: 3,
            quest: "Recebo certificado no final?",
            answer: "Answer Recebo certificado no final?"
        },
        {
            id: 4,
            quest: "É possível pagar em prestações?",
            answer: "Answer É possível pagar em prestações?"
        },
        {
            id: 5,
            quest: "Quantas vagas estão disponíveis?",
            answer: "Answer Quantas vagas estão disponíveis?"
        }, {
            id: 6,
            quest: "Como recebo os bónus??",
            answer: "Answer Como recebo os bónus??"
        },
        {
            id: 7,
            quest: "Como recebo os bónus?",
            answer: "Answer Como recebo os bónus?"
        }
    ]

    const [openId, setOpenId] = useState<number | null>(null);

    const toggleDescription = (id: number) => {
        setOpenId(prev => (prev === id ? null : id));
    };

    return (
        <div className="faq-section">
            <div className="faq-container">
                <div className="faq-list">
                    {
                        faqList.map(item => (
                            <div className="faq-item" key={item.id}>
                                <div className="faq-quest" onClick={() => toggleDescription(item.id)}>
                                <strong>{item.id}.</strong> {item.quest}
                            </div>
                            {openId === item.id && (
                                <div className="faq-answer">
                                    {item.answer}
                                </div>
                            )}
                            </div>
                        ))
                    }
                </div>
                <div className="faq-text">
                    <h1>Dúvidas <span className="MCDifFont">Frequentes</span> sobre a Mentoria</h1>
                    <button className="watsapp_button"> <FaWhatsapp/> Fala connosco no Whatsapp</button>
                </div>
            </div>
        </div>
    );
};

export default Faq;