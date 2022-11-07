import * as React from 'react';
import { Pagination ,PaginationItem } from '@mui/material';
import {Link ,useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import useStyles from "./styles"

const Paginate =()=> {
  const classes =useStyles()
  return (
    <Stack spacing={2}>
      <Pagination 
      classes={{ ul: classes.ul }}
      count={5} 
      color="primary"
      page ={1}
      variant="outlined"
      renderItem={(item) => 
        (<PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />)
      }
       />
    </Stack>
  );
}
export default Paginate