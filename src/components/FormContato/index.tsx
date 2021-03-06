import React from "react";
import { useForm } from "react-hook-form";
import loadingGif from "../../img/icones/loading.gif";
import { Container, Col, Row, Form } from "react-bootstrap";

import {
  MyForm,
  MyContainer,
  Social,
  MyTitleForm,
  MyRow,
  MyLableText,
  MyButton,
} from "./style";
import facebook from "../../img/icones/facebook.svg";
import instagram from "../../img/icones/instagram.svg";

import api from "../services/api";

type IFormInput = {
  userName: string;
  userEmail: string;
  userSubject: string;
  userMessage: string;
};

const FormContato: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<IFormInput>();
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    const destinatario = data.userEmail;
    const assunto = data.userSubject;
    const msg = data.userMessage;

    var config = {
      validateStatus: function (status: any) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    };
    try {
      const response = await api.post(
        "/api/send/email",
        { destinatario, assunto, msg },
        config
      );
      if (response.status === 200) {
        setLoading(false);
        alert("Email Enviado com sucesso!");
        window.location.reload();
      }

      if (response.status === 404) {
        alert("Houve algum problema!");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <MyContainer>
        <Container fluid style={{width:'80%'}}>
          <Row className="d-flex justify-content-center fluid">
            <MyTitleForm>
              Dê o seu feedback para podermos melhorar cada vez mais
            </MyTitleForm>
          </Row>
          <MyRow>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="d-flex justify-content-center fluid">
                <Col sm={12} md={6}>
                  <MyLableText> Qual o seu nome? </MyLableText>
                  <MyForm className="firstColumn">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="ex.: Robson da Silva"
                        style={{ borderRadius: "10px" }}
                        ref={register({
                          required: true,
                        })}
                      />
                      {errors.userName &&
                        (errors.userName as any).type === "required" && (
                          <div className="error">O nome é obrigatório</div>
                        )}
                    </Form.Group>
                  </MyForm>
                  

                  <MyLableText> E o seu E-mail? </MyLableText>
                  <MyForm className="firstColumn">
                    <Form.Group>
                      <Form.Control
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        placeholder="ex.: robson@gmail.com"
                        style={{ borderRadius: "10px" }}
                        ref={register({
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Insira um email válido",
                          },
                        })}
                      />
                      {errors.userEmail &&
                        (errors.userEmail as any).type === "required" && (
                          <div className="error">O Email é obrigatório</div>
                        )}
                      {errors.userEmail &&
                        (errors.userEmail as any).type === "pattern" && (
                          <div className="error">
                            {(errors.userEmail as any).message}
                          </div>
                        )}
                    </Form.Group>
                  </MyForm>

                  <div className="row" style={{ margin: 0 }}>
                    <MyLableText>
                      Assunto
                    </MyLableText>
                  </div>
                  <MyForm className="firstColumn">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="userSubject"
                        id="userSubject"
                        placeholder="ex.: Dúvida sobre as amizades"
                        style={{ borderRadius: "10px" }}
                        ref={register({
                          required: {
                            value:true,
                            message:"O assunto é obrigatório"
                          }
                        })}
                      />
                      {errors.userSubject &&
                        (errors.userSubject as any).type === "required" && (
                          <div className="error">
                            {(errors.userSubject as any).message}
                          </div>
                        )}
                    </Form.Group>
                  </MyForm>
                  {loading ? <div><img src={loadingGif} alt="Loading"/></div> : ""}
                </Col>

                <Col sm={12} md={6}>
                  <MyLableText style={{ marginBottom: "2% 0" }}>
                    Digite sua mensagem
                  </MyLableText>
                  <MyForm>
                    <div style={{ margin: "5%" }}>
                      <Form.Group>
                        <Form.Control
                          as="textarea"
                          name="userMessage"
                          id="userMessage"
                          rows={10}
                          style={{ borderRadius: "10px" }}
                          ref={register({
                            required: true,
                          })}
                        />
                        {errors.userMessage &&
                          (errors.userMessage as any).type === "required" && (
                            <div className="error">
                              A mensagem é obrigatória
                            </div>
                          )}
                      </Form.Group>

                      <MyButton
                        type="submit"
                        className="btn MyButtonSubmitModalLogin float-right"
                      >
                        Enviar
                      </MyButton>
                    </div>
                  </MyForm>
                </Col>
              </Row>
            </Form>
          </MyRow>

          <Social>
            <Row style={{ marginBottom: "3%" }}>
              <img
                src={facebook}
                alt="facebook logo"
                style={{
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                }}
              />
              <div style={{ marginLeft: "2%", cursor: "pointer" }}>
                ChumeCompany
              </div>
            </Row>
            <Row>
              <img
                src={instagram}
                alt="facebook logo"
                style={{ width: "32px", height: "32px", cursor: "pointer" }}
              />
              <div style={{ marginLeft: "2%", cursor: "pointer" }}>
                ChumeCompany
              </div>
            </Row>
          </Social>
        </Container>
      </MyContainer>
    </div>
  );
};

export default FormContato;
