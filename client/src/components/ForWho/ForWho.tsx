import './ForWho.css';
import icon from "../../assets/img/icon-flowers-.svg";
import foto from "../../assets/img/draWilsa2.png";

const ForWho = () => {

    interface WhyList {
        id: number;
        title: string;
    }


    const WhyList: WhyList[] = [
        {
            id: 1,
            title: "És recém-formado(a) na área da saúde ou estética"
        },
        {
            id: 2,
            title: "Queres dar os primeiros passos na estética avançada"
        },
        {
            id: 3,
            title: "Já atuas e queres oferecer procedimentos premiumstimulador"
        },
        {
            id: 4,
            title: "Procuras formação prática com casos reaisQuímico"
        },
        {
            id: 5,
            title: "Técnicas com base científica e ética profissional"
        }
    ]

    return (
        <div className="why-we for-who">
            <div className="why-we-container reverse-column">
                <div className="why-we-img-container">
                    <img src={foto} alt="Dra. Wilsa Santiago"/>
                </div>
                <div className="text-container">
                    <div className="text-area">
                        <h1>Para <span className="MCDifFont">quem</span> é esta Mentoria?</h1>
                        <p>Esta mentoria é ideal para ti se:</p>

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

            </div>
        </div>);
};

export default ForWho;


//                    <img src={foto} alt="Dra. Wilsa Santiago"/>
//                </div>
//                <div className="rRow">
//                    <div className="text-area">
//                        <h1>Para <span className="MCDifFont">quem</span> é esta Mentoria?</h1>
//                        <p>Esta mentoria é ideal para ti se:</p>
//                    </div>
//                    <div className="data_list_area">
//                        <div className="list_area">
//                            {WhyList.map(item => (
//                                <div className="list-item" key={item.id}>
//                                    <img src={icon} alt="Icon"/>
//                                    <h2>{item.title}</h2>
//                                </div>
//                            ))}
//                        </div>
//                    </div>
//                </div>