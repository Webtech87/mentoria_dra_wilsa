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
                    {faqList.map(item => (
                    <div className="list-item" key={item.id}>
                        <h2
                            onClick={() => toggleDescription(item.id)}
                            style={
                                openId === item.id
                                    ? {
                                        borderBottomRightRadius: "0px",
                                        borderBottomLeftRadius: "0px",
                                        borderTopRightRadius: "20px",
                                        borderTopLeftRadius: "20px",
                                        boxShadow: "0px 0px 5px 1px",
                                    }
                                    : undefined
                            }
                        >
                            {item.id}. {item.quest}
                        </h2>
                        {openId === item.id && <p>{item.answer}</p>}
                    </div>
                ))}
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