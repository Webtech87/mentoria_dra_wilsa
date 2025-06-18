import './Practice.css';
import img from "./../../assets/img/draWilsa.png"

import {FaInstagram, FaFacebookF} from 'react-icons/fa';
import {SiTiktok} from 'react-icons/si';
import {useState} from "react";

const Practice = () => {

    interface PracticeList {
        id: number;
        title: string;
        description: string;
    }

    const practiceList: PracticeList[] = [
        {
            id: 1,
            title: "Fundamentos da Microcirurgia Cosmética",
            description: "description Fundamentos da Microcirurgia Cosmética"
        },
        {
            id: 2,
            title: "Técnicas Avançadas com Protocolos Exclusivos",
            description: "description Técnicas Avançadas com Protocolos Exclusivos"
        },
        {
            id: 3,
            title: "Aplicação Prática em Rosto e Corpo",
            description: "description Aplicação Prática em Rosto e Corpo"
        },
        {
            id: 4,
            title: "Materiais, Equipamentos e Biossegurança",
            description: "description Materiais, Equipamentos e Biossegurança"
        },
        {
            id: 5,
            title: "Gestão de Pacientes e Atendimento Premium",
            description: "description Gestão de Pacientes e Atendimento Premium"
        },
        {
            id: 6,
            title: "Precificação e Posicionamento de Mercado",
            description: "description Precificação e Posicionamento de Mercado"
        },
        {
            id: 7,
            title: "Marketing e Imagem Profissional",
            description: "description Marketing e Imagem Profissional"
        }
    ]


    const List = ({items}: { items: PracticeList[] }) => {
        const [openId, setOpenId] = useState<number | null>(null);

        const handleToggle = (id: number) => {
            setOpenId(prevId => (prevId === id ? null : id));
        };

        return (
            <div className="list">
                {items.map(item => (
                    <div className="list-item" key={item.id}>
                        <h2 onClick={() => handleToggle(item.id)}>
                            {item.title}
                        </h2>
                        {openId === item.id && (
                            <p>{item.description}</p>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="practice">
            <div className="practice-container">
                <div className="context-area">
                    <div className="lRow">
                        <div className="image-area">
                            <img src={img} alt="mentoria microcosmetica"/>
                        </div>
                        <div className="text-area">
                            <h1>Quem te guia nessa jornada?</h1>
                            <h1 className="MCDifFont">Dra. Wilsa Santiago</h1>
                            <p>Fundadora da <span className="MCDifFont">Santiclinic</span></p>
                            <p>+10 anos de experiência</p>
                        </div>
                        <div className="icons-area">
                            <div className="icon">
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={48}/>
                                </a>
                            </div>
                            <div className="icon">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF size={48}/>
                                </a>
                            </div>
                            <div className="icon">
                                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                                    <SiTiktok size={48}/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="rRow">
                        <div className="main-text">
                            <h1>O que vais aprender na <span className="MCDifFont">prática</span>?</h1>
                            <p>Vais adquirir conhecimento técnico, visão estratégica e segurança para aplicar os
                                procedimentos no teu dia a dia. Eis o que te espera:</p>
                            <div className="list-area">
                                <List items={practiceList}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Practice;