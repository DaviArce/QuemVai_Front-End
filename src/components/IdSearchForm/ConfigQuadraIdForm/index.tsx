import React from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Button } from "react-bootstrap";

import { ErrorMessage } from "./styles";
import ConfigQuadrasAdmin from "../../ConfigQuadrasAdmin";

type ConfigQuadraIdForm = {
  id: number;
};

const QuadraInformation = {
  nomeQuadra: "Nome da Quadra",
  enderecoQuadra: "Rua tal tal tal",
  CepQuadra: 12345677,
  UfQuadra: "SP",
  LatitudeQuadra: 101,
  LongitudeQuadra: 111,
  DescricaoQuadra: "Quadra com pista de skate",
  StatusQuadra: true,
};
let IdTyped: number;
const ConfigQuadraIdForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<ConfigQuadraIdForm>();
  const [existingId, setExistingId] = React.useState(false);
  const [erros, setErros] = React.useState(false);
  

  function onSubmitId(data: ConfigQuadraIdForm) {
    var NewId = Number(data.id);
    if (NewId === 123) {
      setExistingId(true);
      setErros(false);
      console.log(IdTyped);
    } else {
      setExistingId(false);
      setErros(true);
      console.log("n é esse id");
    }
    IdTyped = NewId;
  }
  if (existingId) {
    return (
      <ConfigQuadrasAdmin
        id={IdTyped}
        nomeQuadra={QuadraInformation.nomeQuadra}
        enderecoQuadra={QuadraInformation.enderecoQuadra}
        CepQuadra={QuadraInformation.CepQuadra}
        UfQuadra={QuadraInformation.UfQuadra}
        LatitudeQuadra={QuadraInformation.LatitudeQuadra}
        LongitudeQuadra={QuadraInformation.LongitudeQuadra}
        DescricaoQuadra={QuadraInformation.DescricaoQuadra}
        StatusQuadra={QuadraInformation.StatusQuadra}
      />
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitId)} style={{ margin: "2% 0" }}>
      <Form.Row>
        <Col md={3}>
          <Form.Group>
            <Form.Control
              type="text"
              id="id"
              name="id"
              placeholder="Insira o ID da quadra"
              ref={register({
                required: true,
              })}
            />
            {errors.id && (errors.id as any).type === "required" && (
              <div className="error">
                <ErrorMessage>Esse campo é Obrigatório</ErrorMessage>
              </div>
            )}
          </Form.Group>
          {erros && <ErrorMessage>Esse ID não existe :(</ErrorMessage>}
        </Col>

        <Col>
          <Button
            variant="primary"
            type="submit"
            style={{ marginLeft: "10px" }}
          >
            Pesquisar
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default ConfigQuadraIdForm;
