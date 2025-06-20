import './Certification.css';

const Certification = () => {
  return (
      <div className="certification">
          <div className="container">
              <div className="content-area">
                  <div className="certification_col">
                      <h1>+1000</h1>
                      <p>Técnicas exclusivas validadas em Pacientes</p>
                  </div>
                  <div className="certification_col">
                      <h1>Protocolos</h1>
                      <p>Protocolos prontos para aplicar na sua clínica</p>
                  </div>
                  <div className="certification_col">
                      <h1>Prática</h1>
                      <p>Com suporte direto da Dra. Wilsa Santiago</p>
                  </div>
                  <div className="certification_col">
                      <h1>Certificado</h1>
                      <p>Com possibilidade de estágio supervisionado</p>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Certification;