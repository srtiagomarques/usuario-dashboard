import React, { useState } from "react";

// GraphQL
import { Query } from "react-apollo";
import { GET_CARGOS } from "../../../services/graphql/queries";

// Bayon
import { Select } from "@bayon/commons";

// Utils
import debounce from "../../../utils/debounce"

const SelectCargos = ({ value, onchange, disabled }) => {
    const [filter, setFilter] = useState("");

    // Função responsável para inserir um atraso nos envios das queryes para o backend, para que não seja enviado a consulta a cada caracter que o usuário digitar (aguarda 350 ms a cada caracter inserido para disparar a query)
    const handleInputChange = debounce(input => {
        setFilter(input);
    }, 350);

    return (
        <Query query={GET_CARGOS} variables={{ nome: filter }}>
            {({ loading, data }) => {
                let cargoOptions = data?.cargos?.items ?? [];

                cargoOptions = [
                    value,
                    ...cargoOptions.filter(({ id }) => id !== value.id)
                ];

                return (
                    <Select
                        name="cargo"
                        label="Cargo"
                        placeholder="cargo"
                        size="small"
                        onInputChanges={handleInputChange}
                        options={cargoOptions}
                        getOptionValue={({ id }) => id}
                        getOptionLabel={({ descricao }) => descricao}
                        value={value}
                        onChange={onchange}
                        isLoading={loading}
                        disabled={disabled}
                    />
                );
            }}
        </Query>
    );
};

export default SelectCargos;