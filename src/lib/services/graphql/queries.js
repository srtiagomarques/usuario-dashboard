import gql from 'graphql-tag';

export const GET_DADOS_LOTACAO_PRINCIPAL = gql`
  {
    usuario {
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
      email
      lotacao_principal {
        foro {
          id
          descricao
          municipio {
            nome
          }
        }
      }
    }
  }
`;

export const GET_CARGOS = gql`
  query($nome: String) {
    cargos(filter: { nome: $nome, page_size: 20 }) {
      items {
        id
        descricao
      }
    }
  }
`;