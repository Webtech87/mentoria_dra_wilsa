import './Bonus.css';
import {useState} from "react";

const Bonus = () => {
    interface BonusItem {
        id: number;
        title: string;
        description: string;
    }

    const bonusList: BonusItem[] = [
        {
            id: 1,
            title: "E-book com Protocolos de Microcirurgia Cosmética",
            description: "Um guia completo com protocolos atualizados para tratamentos estéticos eficazes."
        },
        {
            id: 2,
            title: "Grupo VIP no WhatsApp com a Mentora",
            description: "Tira dúvidas diretamente com a mentora em um grupo exclusivo e interativo."
        },
        {
            id: 3,
            title: "Planilha de Precificação Inteligente",
            description: "Ferramenta adaptada ao mercado português para definir preços de forma estratégica."
        },
        {
            id: 4,
            title: "Conteúdos Bónus sobre Marketing Estético",
            description: "Dicas práticas e estratégias para atrair mais clientes e vender mais."
        }
    ];

    const [openId, setOpenId] = useState<number | null>(null);

    const toggleDescription = (id: number) => {
        setOpenId(prev => (prev === id ? null : id));
    };

    return (
        <div className="bonus">
            <div className="bonus-container">
                <div className="bonus-header">
                    <h1><span className="MCDifFont">Bónus</span> exclusivos para Alunas da Mentoria</h1>
                    <p>Inscreve-te agora e recebe materiais e apoios extra que vão acelerar os teus resultados na
                        estética avançada.</p>
                    <button>Sim, quero me inscrever!</button>
                </div>

                <div className="bonus-list">
                    {bonusList.map(item => (
                        <div className="bonus-item" key={item.id}>
                            <div className="bonus-title" onClick={() => toggleDescription(item.id)}>
                                <strong>{item.id}.</strong> {item.title}
                            </div>
                            {openId === item.id && (
                                <div className="bonus-description">
                                    {item.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Bonus;
