import gql from 'graphql-tag';

export const UPDATE_USUARIO = gql`
    mutation(
        $id: String!
        $nome: String!
        $documento: String!
        $genero: USR_e_genero_type!
        $contato: USR_contato_input_type_input
        $cargo: USR_cargo_input_type_input
    ) {
        update_usuario(
            input: {
                id: $id
                nome: $nome
                documento: $documento
                genero: $genero
                contato: $contato
                cargo: $cargo
            }
        )
    } {
        id
        nome
        documento
        genero
        contato {
            email
            telefone
        }
        cargo {
            id
            descricao
        }
    }
}
`;