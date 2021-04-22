import React from 'react';

import { EmptyState, Loader } from '@bayon/commons';

// GraphQL
import { Query } from 'react-apollo';
import { GET_DADOS_LOTACAO_PRINCIPAL } from '../services/graphql/queries';

// Components
import Dados from '../components/Dados'
import LotacaoPrincipal from '../components/LotacaoPrincipal'

const App = () => {
  <>
    <Header
      appName="Usuário Dashboard"
      appInitials="UD"
      clientName="#VemProReact #JEP"
      avatarInitials="TM"
      avatarAlt="Tiago Marques"
    />
    <Auth
      functions={['USR_USUARIOS_ACESSAR']}
      withoutAuthComponent={
        <EmptyStateContainer>
          <EmptyState
            icon="Blocked"
            title="Calma, brother!"
            subtitle="Você não tem permissão para acessar os dados do usuário"
          />
        </EmptyStateContainer>
      }
    >
      <Query query={GET_DADOS_LOTACAO_PRINCIPAL}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loader size="medium" color="blue" label="Carregando" />
          }
          if (error) {
            const [, , message] = error.message.split(':');
            return <EmptyState icon="Fail" title="Ooops! Houve um problema!" subtitle={message} />;
          }

          const { usuario = {} } = data || {};
          const { lotacao_principal: { foro } = {} } = usuario

          return (
            <>
              <Dados dados_usuario={usuario} />
              <LotacaoPrincipal foro={foro} />
            </>
          )
        }}
      </Query>
    </Auth>
  </>
};

export default App;
