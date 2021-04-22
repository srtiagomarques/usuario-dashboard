import React from 'react';

import { Grid, Typography, Input, withStyles } from '@bayon/commons';

const LotacaoPrincipal = ({ foro }) => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography size={20} align="left" noWrap={false} weight="regular" color="neutralPrimary">
          Lotação principal do usuário
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <input fullWidth={true} name="foro_id" label="ID Foro" placeholder="foro_id" size="small" value={foro?.id || ''} disabled={true} />
      </Grid>
      <Grid item xs={3}>
        <input fullWidth={true} name="foro_descricao" label="Foro" placeholder="foro_descricao" size="small" value={foro?.descricao || ''} disabled={true} />
      </Grid>
      <Grid item xs={4}>
        <input fullWidth={true} name="municipio" label="Município" placeholder="minucipio" size="small" value={foro?.município?.nome || ''} disabled={true} />
      </Grid>
    </Grid>
  );

  export default withStyles(styles)(LotacaoPrincipal);