import React, { useEffect, useState } from 'react';

import { Grid, Typography, Input, Button, useToast, Collapse, CollapseTitle, CollapseContent, Select, withStyles } from '@bayon/commons';

import { Mutation } from '@apollo/react-components';
import { UPDATE_USUARIO } from '../../services/graphql/mutations';

import SelectCargos from './components/SelectCargos';
import classes from '*.module.css';

const generoOptions = [
  { value: "FEMININO", label: "Feminino" },
  { value: "MASCULINO", label: "Masculino" }
];

const [canSubmit, setCanSubmit] = useState(false);

useEffect(() => {
  const { id, nome, documento, genero } = usuarioForm;
  setCanSubmit(!!id && !!nome && !!documento && !!genero);
}, [
  usuarioForm.id,
  usuarioForm.nome,
  usuarioForm.documento,
  usuarioForm.genero
]);

const Dados = ({ usuario }) => {

  const { enqueueToast } = useToast();
  const [usuarioForm, setUsuarioForm] = useState(usuario);

  const [openDadosPessoais, setOpenDadosPessoais] = useState(true);
  const [openDadosContato, setOpenDadosContato] = useState(false);
  const [openDadosFuncionais, setOpenDadosFuncionais] = useState(false);


  return (

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography size={20} align="left" noWrap={false} weight="regular" color="neutralPrimary">
          Dados do usuário
        </Typography>
      </Grid>

      <Mutation
        mutation={UPDATE_USUARIO}
        onCompleted={({ update_usuario }) => {

          setUsuarioForm(update_usuario);
          enqueueToast('Usuário atualizado com sucesso!', { type: 'successs' });

        }}
        onError={() => {

          setUsuarioForm(usuario);
          enqueueToast('Não foi possível atualizar o usuário!', { type: 'error' });

        }}
      >
        {(updateUsuario, { loading }) => (
          <form
            onSubmit={e => {
              e.preventDefault();
              updateUsuario({ variables: usuarioForm });
            }}
          >
            <Grid container>

              <Grid item xs={12}>
                <Collapse
                  expanded={openDadosPessoais}
                  onChange={() => setOpenDadosPessoais(open => !open)
                  }>
                  <CollapseTitle positionIcon="end">
                    Dados principais
                  </CollapseTitle>
                  <CollapseContent>
                    <Grid item spacing={3}>
                      <Grid item xs={1}>
                        <input fullWidth={true} name="id" label="ID" placeholder="id" size="small" value={usuarioForm?.id || ''} disabled={true} required={true} />
                      </Grid>
                      <Grid item xs={3}>
                        <input fullWidth={true} name="nome" label="Nome" placeholder="nome" size="small" value={usuarioForm?.nome || ''}
                          onChange={(e) => {
                            e.persist();
                            setUsuarioForm((currentUsuario) => ({
                              ...currentUsuario,
                              nome: e.target.value
                            }))
                          }}
                          disabled={loading}
                          required={!usuarioForm?.nome} errorText="Nome é um campo obrigatório" />
                      </Grid>
                      <Grid item xs={4}>
                        <input fullWidth={true} name="documento" label="Documento" placeholder="documento" size="documento" value={usuarioForm?.documento || ''}
                          onChange={(e) => {
                            e.persist();
                            setUsuarioForm((currentUsuario) => ({
                              ...currentUsuario,
                              documento: e.target.value
                            }))
                          }}
                          disabled={loading}
                          required={!usuarioForm?.documento} errorText="Documento é um campo obrigatório" />
                      </Grid>
                      <Grid item xs={4}>
                        <Select
                          name="genero"
                          label="Gênero"
                          placeholder="genero"
                          size="small"
                          options={generoOptions}
                          value={generoOptions.find(({ value }) => usuarioForm?.genero === value) || null}
                          onChange={e => {
                            setUsuarioForm(currentUsuario => ({
                              ...currentUsuario,
                              genero: e.value
                            }))
                          }}
                          disabled={loading}
                          required={!usuarioForm?.genero} errorText="Gênero é um campo obrigatório" />
                      </Grid>
                    </Grid>
                  </CollapseContent>
                </Collapse>
              </Grid>

              <Grid item xs={12}>
                <Collapse
                  expanded={openDadosContato}
                  onChange={() => setOpenDadosContato(open => !open)
                  }>
                  <CollapseTitle positionIcon="end">
                    Dados de contato
                  </CollapseTitle>
                  <CollapseContent>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <input fullWidth={true} name="telefone" label="Telefone" placeholder="telefone" size="telefone" value={usuarioForm?.contato?.telefone || ''}
                          onChange={(e) => {
                            e.persist();
                            setUsuarioForm((currentUsuario) => ({
                              ...currentUsuario,
                              contato: {
                                ...currentUsuario.contato,
                                telefone: e.target.value
                              }
                            }))
                          }}
                          disabled={loading} />
                      </Grid>
                      <Grid item xs={4}>
                        <input fullWidth={true} name="email" label="E-mail" placeholder="email" size="email" value={usuarioForm?.contato?.email || ''}
                          onChange={(e) => {
                            e.persist();
                            setUsuarioForm((currentUsuario) => ({
                              ...currentUsuario,
                              contato: {
                                ...currentUsuario.contato,
                                email: e.target.value
                              }
                            }))
                          }}
                          disabled={loading} />
                      </Grid>
                    </Grid>
                  </CollapseContent>
                </Collapse>
              </Grid>

              <Grid item xs={12}>
                <Collapse
                  expanded={openDadosFuncionais}
                  onChange={() => setOpenDadosFuncionais(open => !open)
                  }>
                  <CollapseTitle positionIcon="end">
                    Dados funcionais
                  </CollapseTitle>
                  <CollapseContent>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <SelectCargos
                          value={usuarioForm?.cargo ?? null}
                          onChange={e => {
                            setUsuarioForm(currentUsuario => ({
                              ...currentUsuario,
                              cargo: e
                            }));
                          }}
                          disabled={loading}
                        />
                      </Grid>
                    </Grid>
                  </CollapseContent>
                </Collapse>
              </Grid>

              <Auth functios={['USR_USUARIOS_ALTERNAR']}>
                <Grid item xs={12}>
                  <Button
                    className={classes.button}
                    variant="primary"
                    type="submit"
                    loading={loading}
                    disabled={loading || !canSubmit}
                  >
                    {t('SAVE')}
                </Button>
                </Grid>
              </Auth>

            </Grid>
          </form>
        )}
      </Mutation>
    </Grid >
  );
};

export default withTranslation(['common'])(withStyles(styles)(Dados));