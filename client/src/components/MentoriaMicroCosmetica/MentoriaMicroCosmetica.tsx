import './MentoriaMicroCosmetica.css';

import img from "./../../assets/img/img_s1.png"

const MentoriaMicroCosmetica = () => {
    return (

        <div className="mentoria-microcosmetica">
            <div className="container">
                <div className="content-area">
                    <div className="text-container">
                        <h1>Mentoria <span className="MCDifFont">Microcirurgia Cosmética</span> na Prática</h1>
                        <p>Aprofunde seu conhecimento, aprenda na prática e atenda com excelência. Sua jornada na
                            estética começa aqui.</p>
                        <button>QUERO PARTICIPAR</button>
                    </div>
                    <div className="img-container">
                        <img src={img} alt="mentoria microcosmetica"/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MentoriaMicroCosmetica;