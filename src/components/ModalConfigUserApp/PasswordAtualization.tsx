import React from "react";

import { useForm } from "react-hook-form";

import { Form, Row, Col, Container } from "react-bootstrap";
import { MyLableText, MyForm, MyButton, MyTitleForm } from "./styles";
import "./ModalConfigStyles.css";

import api from "../services/api";
import { getToken, logout, login } from "../services/auth";

type Passwords = {
  userPassword: string;
  userPasswordConfirm: string;
};

const ModalConfigUserApp: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<Passwords>();
  const [erros, setErros] = React.useState("");
  const [succes, setSucces] = React.useState(false);
  const [finalPassword, setFinalPassword] = React.useState("");

  const SubmitForm = async (data: Passwords) => {
    const userPassword = data.userPassword;
    const userPasswordConfirm = data.userPasswordConfirm;    

    if (userPassword === userPasswordConfirm) {
      setSucces(true);
      setFinalPassword(userPassword);
    } else {
      setSucces(false);
      setErros("As senhas não são iguais :c");
    }

    if (succes) {
      try {
        var config = {
          headers: {
            "x-new-password": finalPassword,
            "x-auth-token": getToken(),
          },
          validateStatus: function (status: any) {
            return status < 500; // Resolve only if the status code is less than 500
          },
        };
        const response = await api.put("/api/user/unlockpass/me", {}, config);
        if (response.data["Updated"]) {
          logout();
          var newToken = response.data[" New token"];
          login(newToken);
          alert("Sua senha foi alterada com sucesso!");
          window.location.reload();
        }
        if (!response.data["Updated"]) {
          setErros("Houve algum problema na atualização de dados");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="WrapperModalConfig">
      <Container fluid>
        <MyTitleForm style={{ marginBottom: "4%" }}>
          Altere sua Senha:
        </MyTitleForm>
        <Form onSubmit={handleSubmit(SubmitForm)}>
          <Row>
            <Col md={6}>
              <MyLableText> Alterar sua senha: </MyLableText>
              <MyForm className="firstColumn">
                <Form.Group>
                  <Form.Control
                    type="password"
                    name="userPassword"
                    id="userPassword"
                    placeholder="ex.: *******"
                    style={{ borderRadius: "10px" }}
                    ref={register({
                      minLength: {
                        value: 8,
                        message: "Insira no mínimo 8 caractéres",
                      },
                      required: true,
                    })}
                  />
                  {errors.userPassword &&
                    (errors.userPassword as any).type === "required" && (
                      <div className="error">A senha é obrigatória</div>
                    )}
                  {errors.userPassword &&
                    (errors.userPassword as any).type === "minLength" && (
                      <div className="error">
                        {(errors.userPassword as any).message}
                      </div>
                    )}
                </Form.Group>
              </MyForm>
            </Col>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Col md={6}>
              <MyForm className="firstColumn">
                <Form.Group>
                  <Form.Control
                    type="password"
                    name="userPasswordConfirm"
                    id="userPasswordConfirm"
                    placeholder="ex.: *******"
                    style={{ borderRadius: "10px" }}
                    ref={register({
                      minLength: {
                        value: 8,
                        message: "Insira no mínimo 8 caractéres",
                      },
                      required: true,
                    })}
                  />
                  {errors.userPasswordConfirm &&
                    (errors.userPasswordConfirm as any).type === "required" && (
                      <div className="error">A senha é obrigatória</div>
                    )}
                  {errors.userPasswordConfirm &&
                    (errors.userPasswordConfirm as any).type ===
                      "minLength" && (
                      <div className="error">
                        {(errors.userPasswordConfirm as any).message}
                      </div>
                    )}
                </Form.Group>
              </MyForm>
              <div style={{ fontFamily: "Poppins", color: "red" }}>{erros}</div>
            </Col>
            <Col md={6}>
              <MyButton
                type="submit"
                className="btn"
                style={{ marginTop: "13px", width: "40%" }}
              >
                Alterar senha
              </MyButton>              
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default ModalConfigUserApp;
