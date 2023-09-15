import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { Box, Paper } from '@mui/material';

function AppForm(props) {
  const { children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundImage: 'url(/static/onepirate/appCurvyLines.png)',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mt: 7, mb: 12 }}>
          <Paper
            background="light"
            sx={{
              py: { xs: 4, md: 8 },
              px: { xs: 3, md: 6 },
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            }}
          >
            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

AppForm.propTypes = {
  children: PropTypes.node,
};

export default AppForm;
