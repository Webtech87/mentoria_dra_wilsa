import './Footer.css'
import whatsapp from '../../assets/img/whasapp-logo.png'
import {useTranslation} from "react-i18next";
import dws from './../../assets/img/dws-logo.svg'
import {Facebook, Instagram, Youtube} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const {t} = useTranslation();

    interface SubjectOption {
        value: string;
        label: string;
    }

    const subjectOptions: SubjectOption[] = [
        {value: '', label: t("ftr.form.flds.obj.lt.0")},
        {value: 'vacancies', label: "Quero garantir a minha vaga na mentoria"},
        {value: 'more_info', label:"Gostaria de receber mais informações detalhadas"},
        {value: 'requestion', label: "Tenho dúvidas sobre os pré-requisitos"},
        {value: 'others_subject', label: t("ftr.form.flds.obj.lt.4")}
    ];

    const [selectedSubject, setSelectedSubject] = useState<string>('');

    const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubject(event.target.value);
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        accepted: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        const value = target instanceof HTMLInputElement && target.type === 'checkbox'
            ? target.checked
            : target.value;
        const name = target.name;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.accepted) {
            alert(t("ftr.frm.errors.privacy"));
            return;
        }
        try {
            const response = await axios.post('url_to_bachend', formData);
            console.log('Success:', response.data);
            alert(t("ftr.frm.success_msg"));
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                accepted: false,
            });
            setSelectedSubject('');
        } catch (error: Error | unknown) {
            console.error('Error:', error);
            alert(t("ftr.frm.error_msg"));
        }
    };
    return (
        <div id="contact" className='page-container'>
            <div className='footer-container'>
                <div className='footer'>
                    <div className='footer-info'>
                        <img className="logo" src={dws} alt="SantiClinic Logo"/>
                        <span>{t("ftr.slogan")}</span>
                        <div className='social-media'>
                            <a href="https://www.instagram.com/santi_clinic/" target="_blank" rel="noopener noreferrer">
                                <Instagram size={24}/>
                            </a>
                            <a href="https://www.facebook.com/santiclinic/?locale=pt_BR" target="_blank"
                               rel="noopener noreferrer">
                                <Facebook size={24}/>
                            </a>
                            <a href="https://www.youtube.com/@Santiclinic" target="_blank" rel="noopener noreferrer">
                                <Youtube size={24}/>
                            </a>
                        </div>
                        <div className='contact-politics'>
                            <div className='contacts'>
                                <h3>{t("ftr.contact.title")}</h3>
                                <span>📞 (+351) 910 144-032</span>
                                <span>📍 Praceta Agostinho <br/> 8005-147, Faro</span>
                                <a href="https://wa.me/351915007427" target="_blank" rel="noopener noreferrer">
                                    <button><img src={whatsapp} alt=""/>{t("ftr.contact.btn")}</button>
                                </a>
                            </div>
                            <div className='politics'>
                                <h3>{t("ftr.policy.title")}</h3>
                                <Link to="/politica-privacidade">{t("ftr.policy.lt.0")}</Link>
                                <Link to="/politica-cookies">{t("ftr.policy.lt.1")}</Link>
                                <Link to="/termos-condicoes">{t("ftr.policy.lt.2")}</Link>
                            </div>
                        </div>
                    </div>
                    <div className='form-container'>
                        <div className='form'>
                            <h2>{t("ftr.form.title")}</h2>
                            <span>{t("ftr.form.p")}</span>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="">{t("ftr.form.flds.name")}</label>
                                <input type="text"/>
                                <div className='email-phone'>
                                    <div className="field">
                                        <label>Email*</label>
                                        <input type="email"/>
                                    </div>
                                    <div className="field">
                                        <label>{t("ftr.form.flds.phone")}*</label>
                                        <input type="tel"/>
                                    </div>
                                </div>
                                <label htmlFor="subject">{t("ftr.form.flds.obj.title")}*</label>
                                <select
                                    name="subject"
                                    id="subject"
                                    value={selectedSubject}
                                    onChange={(e) => {
                                        handleSubjectChange(e);
                                        handleChange(e);
                                    }}
                                    required
                                >
                                    {subjectOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="">{t("ftr.form.flds.msg")}*</label>
                                <textarea name="" id=""></textarea>
                                <div className='checkbox'>
                                    <input type="checkbox"/>
                                    <span>{t("ftr.form.flds.axept")} <Link to="/politica-privacidade" target="_blank"
                                                                           rel="noopener noreferrer">{t("ftr.policy.lt.0")}</Link></span>
                                </div>
                                <button>{t("ftr.form.flds.btn")}</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='copyright'>
                    <span>© {currentYear} SANTICLINIC. {t("ftr.bf")}.</span>
                </div>
            </div>
        </div>
    )
}

export default Footer