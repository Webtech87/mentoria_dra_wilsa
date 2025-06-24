import './WhyWe.css';
import icon from './../../assets/img/icon-flowers-.svg'
import foto from './../../assets/img/draWfoto1.png'


const WhyWe = () => {
    interface WhyList {
        id: number;
        title: string;
    }


    const WhyList: WhyList[] = [
        {
            id: 1,
            title: "Formação 100% prática e intensiva"
        },
        {
            id: 2,
            title: "Casos clínicos reais"
        },
        {
            id: 3,
            title: "Acompanhamento individualizado"
        },
        {
            id: 4,
            title: "Método exclusivo da Dra. Wilsa Santiago"
        },
        {
            id: 5,
            title: "Técnicas com base científica e ética profissional"
        }
    ]

    return (
        <div className="why-we">
            <div className="why-we-container">
                <div className="text-container">
                    <div className="text-area">
                        <h1>Por que esta Mentoria é <span className="MCDifFont">Diferente</span>?</h1>
                        <p>Vais aprender técnicas genéricas. Vais dominar protocolos reais usados diariamente numa
                            clínica estética de referência, com foco absoluto em resultados naturais, seguros e
                            premium.</p>

                        <div className="data_list_area">
                            <div className="list_area">
                                {WhyList.map(item => (
                                    <div className="list-item" key={item.id}>
                                        <div className="img_area"><img src={icon} alt="Icon"/></div>
                                        <div className="title-area"><h2>{item.title}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="why-we-img-container">
                    <img src={foto} alt="Dra. Wilsa Santiago"/>
                </div>
            </div>
        </div>);


};

export default WhyWe;