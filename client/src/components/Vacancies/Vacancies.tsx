import './Vacancies.css';
import { FaUser } from 'react-icons/fa';

import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';

import img from "./../../assets/img/vacancies.png"

const Vacancies = () => {
    return (
        <div className="vacancies">
            <div className="vacancies-container">
                <div className="image_container col">
                    <img src={img} alt="vacancies"/>
                </div>
                <div className="text_container col">
                    <div className="title_content">
                        <h1>As vagas são <span className="MCDifFont"> limitadas</span> e o teu futuro começa agora.</h1>
                        <p>Garante o teu lugar na Mentoria de Microcirurgia Cosmética da Dra.Wilsa Santiago e aprende as
                            técnicas que vão destacar-te no mercado e aumentar o teu valor como profissional.</p>
                    </div>
                    <div className="schedule_container">
                        <div className="sh_col">
                            <h3>Agenda Preliminar</h3>
                            <p><FaRegCalendarAlt /> Duração: 6 meses</p>
                            <p><GoLocation /> Santiclinic, Faro</p>
                        </div>
                        <div className="sh_col">
                            <p><FaUser /> Destinado a Médicos</p>
                            <p><FaRegClock /> Carga horária de 40 horas
                                Certificado entregue no final do curso</p>
                        </div>
                    </div>
                    <div className="buttons-area">
                        <button>FAZER INSCRIÇÃO</button>
                        <button>ver programa completo</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Vacancies;

